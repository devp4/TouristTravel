from AdjacencyList import AdjacencyList
from flask import Flask, request

app = Flask(__name__)

adj_list = AdjacencyList()
adj_list.load_adjacency_list("NY")

@app.route("/api/dijkstra", methods=["POST"])
def dijkstra():
    nodes = request.get_json()["nodes"]
    data = adj_list.dijkstra_algorithm(nodes[0], nodes[1], False, 0)
    geojson = adj_list.getGeoJSON(data["path"])
    return {"GeoJSON": geojson}
