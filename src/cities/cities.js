import NY_LOC from "./NY_LOC.json"
import LA_LOC from "./LA_LOC.json"
import SE_LOC from "./SE_LOC.json"

const cities = {
    "New York": {
        abrev: "NY",
        locations: NY_LOC,
        coordinates: [40.754932, -73.984016]
    },
    "Los Angeles": {
        abrev: "LA",
        locations: LA_LOC,
        coordinates: [34.059761, -118.276802]
    },
    "Seattle": {
        abrev: "SE",
        locations: SE_LOC,
        coordinates: [47.608013, -122.335167]
    }
}

export default cities