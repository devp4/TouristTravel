import './App.css';
import { MapContainer, TileLayer, ZoomControl, GeoJSON } from 'react-leaflet'
import locations from './NY_LOC.json'
import * as L from "leaflet"
import { useEffect, useRef, useState } from 'react';
import MarkerPopup from './components/MarkerPopup';
import SideBar from './components/SideBar';

const App = () => {

	const [markers, setMarkers] = useState({})
	const [viewMarkers, setviewMarkers] = useState(["tourism", "parks", "entertainment", "restaurants", "museums", "housing"])
	const [nodes, setNodes] = useState([])
	const [route, setRoute] = useState(undefined)
	const [data, setData] = useState({})
	const [geoLayer, setgeoLayer] = useState(1)

	useEffect(() => { 
		let tempMarkers = {}
		for (let key in locations) {
			let tempData = []
			for (let val in locations[key]) {
				let info = {
					name: locations[key][val]["name"],
					address: locations[key][val]["address"],
					coordinates: locations[key][val]["coordinates"],
					node: locations[key][val]["node"],
					feature: key
				}

				tempData.push(info)
			}

			tempMarkers[key] = tempData
		}
		setMarkers(tempMarkers)
	}, [])

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
		// When length of route is > 2, find shortest path between nodes
		if (nodes.length < 2) {
			return
		}
		
		const response = getPath({nodes: nodes})
		response.then((response) => response.json()).then((data) => {
			setData(data["data"])
			setgeoLayer((current) => current + 1)
			setRoute(data["GeoJSON"])
		})
	}, [nodes])
	
	return (
		<div>
			{console.log(data)}
			<SideBar />
			<MapContainer center={[40.754932, -73.984016]} zoom={13} minZoom={11} zoomControl={false} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<ZoomControl position="topright"></ZoomControl>
				{viewMarkers ? viewMarkers.map((feature) => 
					markers[feature] ? markers[feature].map((marker) => 
						<MarkerPopup marker={marker} setNodes={setNodes}></MarkerPopup>): null) : null}
				{route ? <GeoJSON key={geoLayer} data={route["features"]}></GeoJSON> : null}
			</MapContainer>
		</div>
	);
}

export default App;
