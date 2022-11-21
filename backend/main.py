import AdjacencyList

list = AdjacencyList.AdjacencyList()
list.create_adjacency_list()


dj = list.dijkstra_algorithm(4202402640, 42472954, False, 0)
print(dj)

ast = list.dijkstra_algorithm(4202402640, 42472954, True, 1)
print(ast)
