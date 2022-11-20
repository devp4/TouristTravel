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
	
	useEffect(() => { 
		let tempMarkers = {}
		for (let key in data) {
			let tempData = []
			for (let val in data[key]) {
				let info = {
					name: data[key][val]["name"],
					coordinates: data[key][val]["coordinates"],
					feature: key
				}
				tempData.push(info)
			}

			tempMarkers[key] = tempData
		}
		setMarkers(tempMarkers)
	}, [])
	
	return (
		<div>
			<SideBar />
			<MapContainer center={[40.754932, -73.984016]} zoom={13} minZoom={11} zoomControl={false} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<ZoomControl position="topright"></ZoomControl>
				{viewMarkers ? viewMarkers.map((feature) => 
					markers[feature] ? markers[feature].map((marker) => 
						<MarkerPopup marker={marker}></MarkerPopup>): null) : null}
			</MapContainer>
		</div>
	);
}

export default App;
