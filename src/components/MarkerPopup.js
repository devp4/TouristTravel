import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import * as L from "leaflet";

const MarkerPopup = ({ marker, nodes, setNodes }) => {
  
  const [popupRef, setpopupRef] = useState(undefined)
  
  const LeafIcon = L.Icon.extend({
    options: {},
  });

  const touristIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|033cee&chf=a,s,ee00FFFF",
    iconAnchor: [10.5, 34],
  });

  const parksIcon  = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|05d628&chf=a,s,ee00FFFF",
    iconAnchor: [10.5, 34],
  });

  const entertainmentIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|c103df&chf=a,s,ee00FFFF",
    iconAnchor: [10.5, 34],
  });

  const restaurantsIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|f10505&chf=a,s,ee00FFFF",
    iconAnchor: [10.5, 34],
  });

  const museumsIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ec7403&chf=a,s,ee00FFFF",
    iconAnchor: [10.5, 34],
  });

  const housingIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|9da4f7&chf=a,s,ee00FFFF",
    iconAnchor: [10.5, 34],
  });


  const getIcon = (feature) => {
    if (feature === "tourism") {
      return touristIcon
    }

    if (feature === "parks") {
      return parksIcon
    }

    if (feature === "restaurants") {
      return restaurantsIcon
    }

    if (feature === "entertainment") {
      return entertainmentIcon
    }

    if (feature === "museums") {
      return museumsIcon
    }

    if (feature === "housing") {
      return housingIcon
    }
  };

  const addStop = (node) => {
    popupRef._closeButton.click()
    setNodes((current) => [...current, node]);
  };

  const removeStop = (node) => {
    popupRef._closeButton.click()
    setNodes((current) => current.filter(item => item !== node))
  }

  const setMarkerIcon = (marker) => {
    marker.icon = getIcon(marker.feature)
  }

  return (
    <div>
      {!marker.icon ? setMarkerIcon(marker) : null}
      <Marker
        position={[marker.coordinates[1], marker.coordinates[0]]}
        icon={marker.icon}
      >
        <Popup ref={setpopupRef}>
          <div>
            <h3>{marker.name}</h3>
            <h4>{marker.address}</h4>
            <h4>{marker.node}</h4>
            {nodes.includes(marker.node) ? <button onClick={() => removeStop(marker.node)}>Remove Stop</button> : <button onClick={() => addStop(marker.node)}>Add Stop</button>}
          </div>
        </Popup>
      </Marker>
    </div>
  );
};

export default MarkerPopup;
