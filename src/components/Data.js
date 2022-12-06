

const Data = ({ dijkstra_data, a_star_data }) => {
    return (
        <div>
            <h2>Data</h2>
            <table className='table'>
                <tbody>
                    <tr className='row'>
                        <th className='header-col'></th>
                        <th className='header-row'>Dijkstra</th>
                        <th className='header-row'>A*</th>
                    </tr>
                    <tr className='row'>
                        <th className='header-col'>Distance Traveled</th>
                        <td className='row-text'>{`${dijkstra_data["distance"][0]} KM`}<br></br>{`${dijkstra_data["distance"][1]} M`}</td>
                        <td className='row-text'>{`${a_star_data["distance"][0]} KM`}<br></br>{`${a_star_data["distance"][1]} M`}</td>
                    </tr>
                    <tr className='row'>
                        <th className='header-col'>Nodes Visited</th>
                        <td className='row-text'>{dijkstra_data["nodes_visited"]}</td>
                        <td className='row-text'>{a_star_data["nodes_visited"]}</td>
                    </tr>
                    <tr className='row'>
                        <th className='header-col'>Execution Time (ms)</th>
                        <td className='row-text'>{dijkstra_data["exec_time"]}</td>
                        <td className='row-text'>{a_star_data["exec_time"]}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Data
