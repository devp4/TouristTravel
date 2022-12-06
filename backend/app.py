from AdjacencyList import AdjacencyList
from flask import Flask, request

app = Flask(__name__)

adj_list = AdjacencyList()

@app.route("/api/dijkstra", methods=["POST"])
def dijkstra():
    body = request.get_json()
    nodes = list(map(int, body["nodes"]))
    amp = body["amplifier"]

    amplifier = float(amp) if amp else 0

    dijksta_data = adj_list.dijkstra_algorithm(nodes[0], nodes[1], 0, 0)
    a_star_data = adj_list.dijkstra_algorithm(nodes[0], nodes[1], 1, amplifier)
    
    if len(nodes) > 2:
        for i in range(1, len(nodes)-1): 
            pair = nodes[i:i+2]
            dij_res = adj_list.dijkstra_algorithm(pair[0], pair[1], 0, 0)
            a_star_res = adj_list.dijkstra_algorithm(pair[0], pair[1], 1, amplifier)

            # Dijkstra Data
            dijksta_data["path"].extend(dij_res["path"][1:])
            dijksta_data["exec_time"] += dij_res["exec_time"]
            dijksta_data["nodes_visited"] += dij_res["nodes_visited"]
            dijksta_data["distance"][0] += dij_res["distance"][0]
            dijksta_data["distance"][1] += dij_res["distance"][1]

            # A-Star Data
            a_star_data["path"].extend(a_star_res["path"][1:])
            a_star_data["exec_time"] += a_star_res["exec_time"]
            a_star_data["nodes_visited"] += a_star_res["nodes_visited"]
            a_star_data["distance"][0] += a_star_res["distance"][0]
            a_star_data["distance"][1] += a_star_res["distance"][1]

    dijkstra_geojson = adj_list.getGeoJSON(dijksta_data["path"])
    a_star_geojson = adj_list.getGeoJSON(a_star_data["path"])

    return {"dijkstra_data": dijksta_data, "dijkstra_GeoJSON": dijkstra_geojson, "a-star_data": a_star_data, "a-star_GeoJSON": a_star_geojson}


@app.route("/api/city/<city>", methods=["GET"])
def change_city(city):
    adj_list.load_adjacency_list(city)
    adj_list.set_graph(city)

    return {"city": city}
