import AdjacencyList

list = AdjacencyList.AdjacencyList()
list.create_adjacency_list()


li = []
list.dijkstra_algorithm(4202402640, 42472954, False, 0, li)

print(li)

list.dijkstra_algorithm(4202402640, 42472954, True, 1, li)

print(li)
