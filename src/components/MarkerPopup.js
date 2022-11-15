import { useEffect, useState } from 'react'
import {Marker, Popup } from 'react-leaflet'
import * as L from 'leaflet'

const MarkerPopup = ({ marker }) => {
    const LeafIcon = L.Icon.extend({
        options: {}
    })

    const PopupIcon = new LeafIcon({
        iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|033cee&chf=a,s,ee00FFFF"
    })


    const [icon, setIcon] = useState(PopupIcon)

    const changeIcon = async (feature) => {
        if (feature === "tourism") {
            PopupIcon.options.iconUrl = "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|033cee&chf=a,s,ee00FFFF"
        }
        
        if (feature === "parks") {
            PopupIcon.options.iconUrl = "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|05d628&chf=a,s,ee00FFFF"
        }

        if (feature === "restaurants") {
            PopupIcon.options.iconUrl = "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|f10505&chf=a,s,ee00FFFF"
        }

        if (feature === "entertainment") {
            PopupIcon.options.iconUrl = "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|c103df&chf=a,s,ee00FFFF"
        }

        if (feature === "museums") {
            PopupIcon.options.iconUrl = "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ec7403&chf=a,s,ee00FFFF"
        }
        
        if (feature === "housing") {
            PopupIcon.options.iconUrl = "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|9da4f7&chf=a,s,ee00FFFF"
        }

        setIcon(PopupIcon)
    }

    useEffect(() => {
        changeIcon(marker.feature)
    }, [])

    return (
        <div>
            <Marker position={[marker.coordinates[1], marker.coordinates[0]]} icon={icon}>
                <Popup>{marker.name}</Popup>
            </Marker>
        </div>
    )
}

export default MarkerPopup