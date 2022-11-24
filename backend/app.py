from AdjacencyList import AdjacencyList
from flask import Flask, request

app = Flask(__name__)

adj_list = AdjacencyList()
adj_list.load_adjacency_list("NY")

@app.route("/api/dijkstra", methods=["POST"])
def dijkstra():
    nodes = request.get_json()["nodes"]
    print(nodes)
    route = adj_list.adjacency_list[nodes[0]][nodes[1]][2]

    geojson = {
        "type": "FeatureCollection", 
        "features": [route]
    }
    
    return {"route": geojson}
