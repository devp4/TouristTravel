import osmnx as ox
import json
import os.path

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

        ny_graph = ox.graph_from_place("New York, New York State", network_type="drive")

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

        if not os.path.exists(f"{city}_AL.json"):
            raise Exception(f"The adjacency list for city {city} does not exist")

        with open(f"{city}_AL.json", "r") as file: 
            self.adjacency_list = json.load(file)


    def dijkstra_algorithm(self): 
        print("PERFORM DIJKSTRA ALGORITHM HERE")

    def second_algorithm(self): 
        print("PERFORM SECOND ALGORITHM HERE (TBD)")

al = AdjacencyList()
al.load_adjacency_list("NY") #Load the NY Adjacency List
