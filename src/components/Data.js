

const Data = ({ dijkstra_data, a_star_data }) => {
    return (
        <div className="data-div">
            <h2>{"Dijkstra"}</h2>
            <h4>{`Total Distance: ${parseFloat(dijkstra_data["distance"][0]).toFixed(2)} km | ${parseFloat(dijkstra_data["distance"][1]).toFixed(2)} mi`}</h4>
            <h4>{`Total Nodes Visited: ${dijkstra_data["nodes_visited"]}`}</h4>
            <h4>{`Execution Time: ${parseFloat(dijkstra_data["exec_time"]).toFixed(1)} ms`}</h4>
            <br></br>
            <h2>{"A* Search"}</h2>
            <h4>{`Total Distance: ${parseFloat(a_star_data["distance"][0]).toFixed(2)} km | ${parseFloat(a_star_data["distance"][1]).toFixed(2)} mi`}</h4>
            <h4>{`Total Nodes Visited: ${a_star_data["nodes_visited"]}`}</h4>
            <h4>{`Execution Time: ${parseFloat(a_star_data["exec_time"]).toFixed(1)} ms`}</h4>
        </div>
    )
}

export default Data
