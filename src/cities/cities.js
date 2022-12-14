import NY_LOC from "./NY_LOC.json"
import CH_LOC from "./CH_LOC.json"
import SE_LOC from "./SE_LOC.json"
import MI_LOC from "./MI_LOC.json"

const cities = {
    "New York": {
        abrev: "NY",
        locations: NY_LOC,
        coordinates: [40.754932, -73.984016]
    },
    "Chicago": {
        abrev: "CH",
        locations: CH_LOC,
        coordinates: [41.881832, -87.623177]
    },
    "Seattle": {
        abrev: "SE",
        locations: SE_LOC,
        coordinates: [47.608013, -122.335167]
    },
    "Miami": {
        abrev: "MI",
        locations: MI_LOC,  
        coordinates: [25.761681, -80.191788]
    }
}

export default cities