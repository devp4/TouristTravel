import './App.css';
import { MapContainer, TileLayer, ZoomControl, GeoJSON } from 'react-leaflet'
import cities from "./cities/cities"
import { useEffect, useState } from 'react';
import MarkerPopup from './components/MarkerPopup';
import SideBar from './components/SideBar';

const App = () => {

	const [markers, setMarkers] = useState({})
	const [viewMarkers, setviewMarkers] = useState(["tourism", "parks", "entertainment", "museums", "housing", "restaurants"])
	
	const [nodes, setNodes] = useState([])
	const [route, setRoute] = useState(undefined)
	const [data, setData] = useState({})
	
	const [geoLayer, setgeoLayer] = useState(1)
	const [city, setCity] = useState("New York")
	const [map, setMap] = useState(null);

	// Called when city is changed to load Adjacency List
	async function changeCity(city) {
		const response = await fetch(`/api/city/${city}`, {
			method: "GET",
			headers: {
				"Content-Type": 'application/json'
			}
		})

		return response
	}

	useEffect(() => { 

		// Change city
		const response = changeCity(cities[city]["abrev"])
		response.then((response) => response.json()).then((data) => {
			console.log(`CITY CHANGED TO ${data["city"]}`)
		})

		// Set markers
		let tempMarkers = {}
		for (let key in cities[city]["locations"]) {
			let tempData = []
			for (let val in cities[city]["locations"][key]) {
				let info = {
					name: cities[city]["locations"][key][val]["name"],
					address: cities[city]["locations"][key][val]["address"],
					coordinates: cities[city]["locations"][key][val]["coordinates"],
					node: cities[city]["locations"][key][val]["node"],
					feature: key,
					icon: undefined
				}

				tempData.push(info)
			}

			tempMarkers[key] = tempData
		}

		setMarkers(tempMarkers)
	}, [city])

	// Called to get path between two or more nodes
	async function getPath(data) {
		const response = await fetch("/api/dijkstra", {
			method: "POST",
			headers: {
				"Content-Type": 'application/json'
			},
			body: JSON.stringify(data)
		})

		return response
	}

	useEffect(() => {
		if (nodes.length < 2) {
			setData({})
			setRoute(undefined)
			return
		}

		// When length of route is > 2, find shortest path between nodes
		const response = getPath({nodes: nodes})

		// Set response data to resepective states
		response.then((response) => response.json()).then((data) => {
			setData(data["data"])
			setgeoLayer((current) => current + 1)
			setRoute(data["GeoJSON"])
		})

	}, [nodes])
	
	// Go to different city 
	const fly=(city)=>{
		setCity(city)

		// Reset State
		setNodes([])
		setRoute(undefined)
		setData({})

		map.flyTo(cities[city]["coordinates"], 13, {duration: 3})
	}
	
	return (
		<div>
			<SideBar viewMarkers={viewMarkers} setviewMarkers={setviewMarkers}></SideBar>
			<MapContainer center={cities[city]["coordinates"]} zoom={13} minZoom={11} zoomControl={false} scrollWheelZoom={true} ref={setMap}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{viewMarkers ? viewMarkers.map((feature) =>
					markers[feature] ? markers[feature].map((marker) => 
						<MarkerPopup marker={marker} nodes={nodes} setNodes={setNodes}></MarkerPopup>): null) : null}
				{route ? <GeoJSON key={geoLayer} data={route["features"]}></GeoJSON> : null}
			</MapContainer>
		</div>
	);
}
export default App;
