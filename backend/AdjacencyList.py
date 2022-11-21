import osmnx as ox
import json
import os.path
import sys
import heapq
import math
from timeit import default_timer as timer


class AdjacencyList:

    def __init__(self) -> None:
        self.adjacency_list = {}

    def create_adjacency_list(self):
        '''
        Creates Adjacency List from an OSM Graph 

        type: dictionary

        node_id: {
            adjacent_node: (street name, length)
        }

        Ex: 
            "3573083362": {
                "98446168": [
                    "South Boulevard Street",
                    5.614
                ],
                "3573083360": [
                    "West Gaines Street",
                    115.778
                ],
                "98572856": [
                    "South Boulevard Street",
                    121.328
                ]
            }        

            Node 3573083362 connects to nodes 98446168, 3573083360, and 98572856. The length of the street represents the weight.

        '''

        self.ny_graph = ox.graph_from_place(
            "New York, New York State", network_type="drive")

        for node, _ in list(self.ny_graph.nodes(data=True)):
            self.adjacency_list[node] = {}

        for edge in list(self.ny_graph.edges(data=True)):
            node = edge[0]
            adj_node = edge[1]
            street_name = edge[2].get("name", "Unknown")
            length = edge[2].get("length", 0)

            self.adjacency_list[node][adj_node] = (street_name, length)

        with open("NY_AL.json", "w") as file:
            json.dump(self.adjacency_list, file, indent=4)

    def load_adjacency_list(self, city="none"):
        '''
        If the adjacency list is already created and stored in a JSON file, call this method
        This will reduce time by loading the adjacency list from the JSON file instead of recreating it

        Parameters: 
            city: string - load adjacency list for city given (for now, NY and LA)
        '''
        # f"{city}
        if not os.path.exists(f"{city}_AL.json"):
            raise Exception(
                f"The adjacency list for {city} does not exist")

        with open(f"{city}_AL.json", "r") as file:
            self.adjacency_list = json.load(file)

    def print_dijkstra_path(self, currentVertex, parents, path):

        if currentVertex == -1:
            return path

        self.print_dijkstra_path(parents[currentVertex], parents, path)
        path.append(currentVertex)
        if parents[currentVertex] != -1:
            print(str(currentVertex) + ":", end=' ')
            print(
                self.adjacency_list[parents[currentVertex]][currentVertex][0])

        else:
            print(str(currentVertex))

    # args: start is starting node, end is destination node,
    #       a_star: True for A* and False for Dijkstra,
    #       amplifier (A* only): default is 1, increasing results in less accuracy and less nodes visited w/ lower execution time,
    #       storePath: external list filled with the nodes visited in the shortest path from start to end
    #
    # returns tuple (execution time in seconds, # of nodes visited, total distance in km, total distance in miles)
    def dijkstra_algorithm(self, start, end, a_star, amplifier, storePath):
        storePath.clear()
        end_time = 0
        start_time = timer()
        visited = {start: False}
        parents = {start: -1}

        distance = {start: 0}
        pq = []
        heapq.heappush(pq, (distance[start], start))
        while pq:

            extractedPair = heapq.heappop(pq)

            if end == extractedPair[1]:
                end_time = timer()
                break

            extractedVertex = extractedPair[1]

            if extractedVertex not in visited:
                visited[extractedVertex] = False

            if not visited[extractedVertex]:
                visited[extractedVertex] = True

                edges = self.adjacency_list[extractedVertex]
                for key, value in edges.items():

                    destination = key

                    if destination not in visited:
                        visited[destination] = False

                    if not visited[destination]:

                        if extractedVertex not in distance:
                            distance[extractedVertex] = sys.maxsize

                        if destination not in distance:
                            distance[destination] = sys.maxsize

                        newKey = distance[extractedVertex] + value[1]
                        currentKey = distance[destination]

                        if currentKey > newKey:
                            distance[destination] = newKey

                            if a_star:
                                x = self.ny_graph.nodes[end]['x'] - \
                                    self.ny_graph.nodes[destination]['x']
                                y = self.ny_graph.nodes[end]['y'] - \
                                    self.ny_graph.nodes[destination]['y']
                                heuristic = math.sqrt(
                                    math.pow(x, 2) + math.pow(y, 2)) * math.pow(10, amplifier * 5)
                                newKey = newKey + heuristic

                            p = (newKey, destination)
                            heapq.heappush(pq, p)
                            parents[destination] = extractedVertex

        alg = "Dijkstra"
        if a_star:
            alg = "A* Search"
        print(alg + " Algorithm:")
        print("Execution Time: %ss" % round(end_time - start_time, 4))
        print("Nodes visited: " + str(len(distance)))

        km = distance[end] / 1000
        miles = km * 0.6213711922

        print("Source Vertex: " + str(start) +
              " | End Vertex: " + str(end) + " | Distance: " + str(round(km, 2)) + "km/" + str(round(miles, 2))+"mi")

        self.print_dijkstra_path(end, parents, storePath)
        return (round(end_time - start_time, 4), len(distance), round(km, 2), round(miles, 2))


al = AdjacencyList()
al.load_adjacency_list("NY")  # Load the NY Adjacency List
