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

	const [dijkstraData, setdijkstraData] = useState(undefined)
	const [a_starData, seta_starData] = useState(undefined)
	const [dijkstraRoute, setdijkstraRoute] = useState(undefined)
	const [a_starRoute, seta_starRoute] = useState(undefined)

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
			setdijkstraData(undefined)
			seta_starData(undefined)
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
		setdijkstraData(undefined)
		seta_starData(undefined)
		setdijkstraRoute(undefined)
		seta_starRoute(undefined)

		map.flyTo(cities[city]["coordinates"], 13, {duration: 3})
	}

	const change = () => {
		const slider = document.getElementById("amplifier-range")
		const label = document.getElementById("amplifier-value")
		label.innerHTML = slider.value
	}

	const checkboxChange = (id) => {
		document.getElementById(id).checked = true
		
		if (id === "a-star") {
			document.getElementById(id).disabled = false
			document.getElementById("dijkstra").disabled = true
		}

		if (id === "dijkstra") {
			document.getElementById(id).disabled = false
			document.getElementById("a-star").disabled = true
		}
	}
	
	return (
		<div>
			<Modal></Modal>
			{dijkstraData && a_starData ? <Data dijkstra_data={dijkstraData} a_star_data={a_starData}></Data> : null}
			<div className='goto-div'>
				<label>
					<input id="dijkstra" type ="checkbox" defaultChecked={true} onChange={() => checkboxChange("a-star")}/>
					{"Dijkstra"}
					<input id="a-star" type ="checkbox" defaultChecked={false} disabled={true} onChange={() => checkboxChange("dijkstra")}/>
					{"A*"}
        		</label>
				<input id="amplifier-range" type="range" min={0} max={2} step={0.1} defaultValue={1} onInput={() => change()}></input>
				<p>Amplifier: <span id="amplifier-value" >{"1"}</span></p>
			</div>	
			<button className='goto' onClick={() => fly("Seattle")} type="button" data-bs-target="#exampleModal">Go To</button>
			<div class="modal fade fixed top-0" id="exampleModal"></div>
			<SideBar viewMarkers={viewMarkers} setviewMarkers={setviewMarkers}></SideBar>
			<MapContainer center={cities[city]["coordinates"]} zoom={13} minZoom={11} zoomControl={false} scrollWheelZoom={true} ref={setMap}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{viewMarkers ? viewMarkers.map((feature) =>
					markers[feature] ? markers[feature].map((marker) => 
						<MarkerPopup marker={marker} nodes={nodes} setNodes={setNodes}></MarkerPopup>): null) : null}
				{dijkstraRoute ? <GeoJSON key={geoLayer} data={dijkstraRoute["features"]}></GeoJSON> : null}
				{a_starRoute ? <GeoJSON key={geoLayer + 1} data={a_starRoute["features"]} color="red"></GeoJSON> : null}
			</MapContainer>
		</div>
	);
}
export default App;
