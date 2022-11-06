class AdjacencyList: 

    def __init__(self) -> None:
        self.adjacency_list = {}

    def create_adjacency_list(self): 
        print("CREATE ADJACENCY LIST HERE")

    def load_adjacency_list(self): 
        print("LOAD ADJACENCY LIST HERE")

    def dijkstra_algorithm(self): 
        print("PERFORM DIJKSTRA ALGORITHM HERE")

    def second_algorithm(self): 
        print("PERFORM SECOND ALGORITHM HERE (TBD)")

import osmnx as ox
import networkx as nx
import plotly.graph_objects as go
import numpy as np


G = ox.graph_from_place("Tallahassee, Florida", network_type='drive')
nodes, edges = ox.graph_to_gdfs(G)
# count = 0
# node_map = {}
# for node, data in G.nodes(data=True): 
#     node_map[node] = count
#     count += 1

# import json 
# with open("map.json", "w") as file: 
#     json.dump(node_map, file, indent=4)

print(G.edges(data=True)[11034869])