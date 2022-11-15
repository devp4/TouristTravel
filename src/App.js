import './App.css';
import { MapContainer, TileLayer } from 'react-leaflet'
import data from './NY_LOC.json'
import * as L from "leaflet"
import { useEffect, useState } from 'react';
import MarkerPopup from './components/MarkerPopup';

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
			<MapContainer center={[40.754932, -73.984016]} zoom={13} minZoom={11} scrollWheelZoom={true}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{markers ? markers.map((marker) => <MarkerPopup marker={marker}></MarkerPopup>) : null}
		</MapContainer>
		</div>
	);
}

export default App;
