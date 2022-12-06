

const Data = ({ dijkstra_data, a_star_data }) => {
    return (
        <div className="data-div">
            <h2>{"Dijkstra"}</h2>
            <h4>{`${dijkstra_data["distance"][0]} KM | ${dijkstra_data["distance"][1]} M`}</h4>
            <h4>{dijkstra_data["nodes_visited"]}</h4>
            <h4>{dijkstra_data["exec_time"]}</h4>
            <br></br>
            <h2>{"A*"}</h2>
            <h4>{`${a_star_data["distance"][0]} KM | ${a_star_data["distance"][1]} M`}</h4>
            <h4>{a_star_data["nodes_visited"]}</h4>
            <h4>{a_star_data["exec_time"]}</h4>
        </div>
    )
}

export default Data