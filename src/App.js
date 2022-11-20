import './App.css';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import data from './NY_LOC.json'
import * as L from "leaflet"
import { useEffect, useState } from 'react';
import MarkerPopup from './components/MarkerPopup';
import SideBar from './components/SideBar';

const App = () => {

	const [markers, setMarkers] = useState({})
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

	// {markers ? markers.map((marker) => <MarkerPopup marker={marker}></MarkerPopup>) : null} (add back later)

	return (
		<div>
			{console.log(markers)}
			<SideBar />
			<MapContainer center={[40.754932, -73.984016]} zoom={13} minZoom={11} zoomControl={false} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<ZoomControl position="topright"></ZoomControl>
		</MapContainer>
		</div>
	);
}

export default App;
