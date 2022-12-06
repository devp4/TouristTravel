import './App.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import cities from "./cities/cities"
import { useEffect, useState } from 'react';
import MarkerPopup from './components/MarkerPopup';
import SideBar from './components/SideBar';
import Data from './components/Data';
import Modal from './components/Modal';

const App = () => {

	const [markers, setMarkers] = useState({})
	const [viewMarkers, setviewMarkers] = useState(["tourism", "parks", "entertainment", "museums", "housing", "restaurants"])
	
	const [nodes, setNodes] = useState([])

	const [dijkstraData, setdijkstraData] = useState({"distance": [0, 0], "nodes_visited": 0, "exec_time": 0})
	const [a_starData, seta_starData] = useState({"distance": [0, 0], "nodes_visited": 0, "exec_time": 0})
	const [dijkstraRoute, setdijkstraRoute] = useState(undefined)
	const [a_starRoute, seta_starRoute] = useState(undefined)
	const [showDijkstra, setshowDijkstra] = useState(true)
	const [showA_star, setshowA_star] = useState(true)

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
			setdijkstraData({"distance": [0, 0], "nodes_visited": 0, "exec_time": 0})
			seta_starData({"distance": [0, 0], "nodes_visited": 0, "exec_time": 0})
			setdijkstraRoute(undefined)
			seta_starRoute(undefined)
			return
		}

		// When length of route is > 2, find shortest path between nodes
		
		// Get options
		let amplifier = document.getElementById("amplifier-range").value
		
		const response = getPath({nodes: nodes, amplifier: amplifier})

		// Set response data to resepective states
		response.then((response) => response.json()).then((data) => {
			setdijkstraData(data["dijkstra_data"])
			seta_starData(data["a-star_data"])
			setgeoLayer((current) => current + 2)
			setdijkstraRoute(data["dijkstra_GeoJSON"])
			seta_starRoute(data["a-star_GeoJSON"])
		})

	}, [nodes])
	
	// Go to different city 
	const fly=(city)=>{
		setCity(city)

		// Reset State
		setNodes([])
		setdijkstraData({"distance": [0, 0], "nodes_visited": 0, "exec_time": 0})
		seta_starData({"distance": [0, 0], "nodes_visited": 0, "exec_time": 0})
		setdijkstraRoute(undefined)
		seta_starRoute(undefined)

		map.flyTo(cities[city]["coordinates"], 13, {duration: 3})
	}

	const change = () => {
		const slider = document.getElementById("amplifier-range")
		const label = document.getElementById("amplifier-value")
		label.innerHTML = slider.value
	}
	
	return (
		<div>
			<div className="container">
				<h2>Options</h2>
				<p className="amplifier-value">A* Amplifier: <span id="amplifier-value" >{"1"}</span><br></br><input className="amplifier-range" id="amplifier-range" type="range" min={0} max={2} step={0.1} defaultValue={1} onInput={() => change()}></input></p>
				<label className='show-route'>
					<input id="dijkstra" type="checkbox" defaultChecked={showDijkstra} onChange={() => setshowDijkstra(!showDijkstra)}/>
					{"Dijkstra"}
					<input id="a-star" type="checkbox" defaultChecked={showA_star} onChange={() => setshowA_star(!showA_star)}/>
					{"A*"}
				</label>
				<Data dijkstra_data={dijkstraData} a_star_data={a_starData}></Data>
				<SideBar viewMarkers={viewMarkers} setviewMarkers={setviewMarkers}></SideBar>
			</div>
			<button className='goto' onClick={() => fly("Seattle")} type="button" data-bs-target="#exampleModal">Go To</button>
			<MapContainer center={cities[city]["coordinates"]} zoom={13} minZoom={11} zoomControl={false} scrollWheelZoom={true} ref={setMap}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{viewMarkers ? viewMarkers.map((feature) =>
					markers[feature] ? markers[feature].map((marker) => 
						<MarkerPopup marker={marker} nodes={nodes} setNodes={setNodes}></MarkerPopup>): null) : null}
				{dijkstraRoute && showDijkstra ? <GeoJSON key={geoLayer} data={dijkstraRoute["features"]}></GeoJSON> : null}
				{a_starRoute && showA_star ? <GeoJSON key={geoLayer + 1} data={a_starRoute["features"]} color="red"></GeoJSON> : null}
			</MapContainer>
		</div>
	);
}
export default App;
