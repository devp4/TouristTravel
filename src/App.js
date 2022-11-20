import './App.css';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import data from './NY_LOC.json'
import * as L from "leaflet"
import { useEffect, useState } from 'react';
import SideBar from './components/SideBar';
import MarkerPopup from './components/MarkerPopup';
import "leaflet/dist/leaflet.css"


const App = () => {

	const [markers, setMarkers] = useState([])
	useEffect(() => { 
		let tempMarkers = []
		for (let key in data) {
			for (let val in data[key]) {
				let tempData = {
					name: data[key][val]["name"],
					coordinates: data[key][val]["coordinates"],
					feature: key
				}
				tempMarkers.push(tempData)
			}
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
			<ZoomControl position="topright">

			</ZoomControl>
			{markers ? markers.map((marker) => <MarkerPopup marker={marker}></MarkerPopup>) : null}
			</MapContainer>
		</div>
	);
}

export default App;
