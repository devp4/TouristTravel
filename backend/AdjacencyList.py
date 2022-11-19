import osmnx as ox
import json
import os.path
import sys
import heapq


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

        ny_graph = ox.graph_from_place(
            "New York, New York State", network_type="drive")

        for node, _ in list(ny_graph.nodes(data=True)):
            self.adjacency_list[node] = {}

        for edge in list(ny_graph.edges(data=True)):
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

    def print_path(self, distances, currentVertex, parents):
        if currentVertex == -1:
            return

        self.print_path(distances, parents[currentVertex], parents)
        if parents[currentVertex] != -1:
            km = self.adjacency_list[parents[currentVertex]
                                     ][currentVertex][1] / 1000
            miles = km * 0.6213711922
            print("Distance: " + str(round(km, 2)) +
                  "km/" + str(round(miles, 2)) + "mi")
            print(str(currentVertex) + ":", end=' ')
            print(
                self.adjacency_list[parents[currentVertex]][currentVertex][0])
        else:
            print(str(currentVertex))

    def dijkstra_algorithm(self, start, end):

        # spt = [False] * len(self.adjacency_list)
        # distance = [sys.maxsize] * len(self.adjacency_list)
        spt = {start: False}
        parents = {start: -1}

        distance = {start: 0}
        pq = []
        heapq.heappush(pq, (distance[start], start))
        while pq:
            heapq.heapify(pq)
            extractedPair = heapq.heappop(pq)

            if end == extractedPair[1]:
                break

            extractedVertex = extractedPair[1]

            if extractedVertex not in spt:
                spt[extractedVertex] = False

            if not spt[extractedVertex]:
                spt[extractedVertex] = True

                edges = self.adjacency_list[extractedVertex]
                for key, value in edges.items():

                    destination = key

                    if destination not in spt:
                        spt[destination] = False

                    if not spt[destination]:

                        if extractedVertex not in distance:
                            distance[extractedVertex] = sys.maxsize

                        if destination not in distance:
                            distance[destination] = sys.maxsize

                        newKey = distance[extractedVertex] + value[1]
                        currentKey = distance[destination]

                        if currentKey > newKey:
                            p = (newKey, destination)
                            heapq.heappush(pq, p)
                            distance[destination] = newKey
                            parents[destination] = extractedVertex

        print("Dijkstra Algorithm:")
        # print("Source Vertex: " + str(start) +
        # " to vertex " + str(end) + " distance: " + str(distance[end]))
        km = distance[end] / 1000
        miles = km * 0.6213711922
        print("Source Vertex: " + str(start) +
              " | End Vertex: " + str(end) + " | Distance: " + str(round(km, 2)) + "km/" + str(round(miles, 2))+"mi")
        self.print_path(distance, end, parents)
        # for key, value in distance.items():
        # if key == end:
        # print("Source Vertex: " + str(start) +
        # " to vertex " + str(key) + " distance: " + str(value))
        # self.print_path(distance, key, parents)

    def second_algorithm(self):
        print("PERFORM SECOND ALGORITHM HERE (TBD)")


al = AdjacencyList()
al.load_adjacency_list("NY")  # Load the NY Adjacency List
