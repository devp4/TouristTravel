import './App.css';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import data from './NY_LOC.json'
import * as L from "leaflet"
import { useEffect, useState } from 'react';
import MarkerPopup from './components/MarkerPopup';
import SideBar from './components/SideBar';

const App = () => {

	const [markers, setMarkers] = useState({})
	const [viewMarkers, setviewMarkers] = useState(["tourism", "parks", "entertainment", "restaurants", "museums", "housing"])
	const [nodes, setNodes] = useState([])
	const [route, setRoute] = useState({})

	useEffect(() => { 
		let tempMarkers = {}
		for (let key in data) {
			let tempData = []
			for (let val in data[key]) {
				let info = {
					name: data[key][val]["name"],
					address: data[key][val]["address"],
					coordinates: data[key][val]["coordinates"],
					node: data[key][val]["node"],
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
			console.log("less than 2")
			return
		}
		
		const response = getPath({nodes: nodes})
		response.then((response) => response.json()).then((data) => setRoute(data))
	}, [nodes])
	
	return (
		<div>
			{console.log(route)}
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
			</MapContainer>
		</div>
	);
}

export default App;
