

const Data = ({ dijkstra_data, a_star_data }) => {
    return (
        <div id="data" className="data">
            <img src={require('../assets/dataicon.png')} class="data-icon" alt=""></img>
            <h2>Data</h2>
            <table className='table'>
                <tbody>
                    <tr className='row'>
                        <th className='header-col'></th>
                        <th className='header-row'>Dijkstra</th>
                        <th className='header-row'>A* Search</th>
                    </tr>
                    <tr className='row'>
                        <th className='header-col'>Distance Traveled</th>
                        <td className='row-text'>{`${parseFloat(dijkstra_data["distance"][0]).toFixed(2)} km`}<br></br>{`${parseFloat(dijkstra_data["distance"][1]).toFixed(2)} mi`}</td>
                        <td className='row-text'>{`${parseFloat(a_star_data["distance"][0]).toFixed(2)} km`}<br></br>{`${parseFloat(a_star_data["distance"][1]).toFixed(2)} mi`}</td>
                    </tr>
                    <tr className='row'>
                        <th className='header-col'>Nodes Visited</th>
                        <td className='row-text'>{dijkstra_data["nodes_visited"]}</td>
                        <td className='row-text'>{a_star_data["nodes_visited"]}</td>
                    </tr>
                    <tr className='row'>
                        <th className='header-col'>Execution Time</th>
                        <td className='row-text'>{`${parseFloat(dijkstra_data["exec_time"]).toFixed(1)} ms`}</td>
                        <td className='row-text'>{`${parseFloat(a_star_data["exec_time"]).toFixed(1)} ms`}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Data
