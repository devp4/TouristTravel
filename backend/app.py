from AdjacencyList import AdjacencyList
from flask import Flask, request

app = Flask(__name__)

adj_list = AdjacencyList()

@app.route("/api/dijkstra", methods=["POST"])
def dijkstra():
    body = request.get_json()
    nodes = list(map(int, body["nodes"]))
    algorithm = body["algorithm"]
    amp = body["amplifier"]

    a_star = True if algorithm == "a-star" else False
    amplifier = float(amp) if amp else 0

    data = adj_list.dijkstra_algorithm(nodes[0], nodes[1], a_star, amplifier)

    if len(nodes) > 2:
        for i in range(1, len(nodes)-1): 
            pair = nodes[i:i+2]
            res = adj_list.dijkstra_algorithm(pair[0], pair[1], a_star, amplifier)

            data["path"].extend(res["path"][1:])
            data["exec_time"] += res["exec_time"]
            data["nodes_visited"] += res["nodes_visited"]
            data["distance"][0] += res["distance"][0]
            data["distance"][1] += res["distance"][1]

    geojson = adj_list.getGeoJSON(data["path"])
    return {"data": data, "GeoJSON": geojson}


@app.route("/api/city/<city>", methods=["GET"])
def change_city(city):
    adj_list.load_adjacency_list(city)
    adj_list.set_graph(city)

    return {"city": city}
