import AdjacencyList

list = AdjacencyList.AdjacencyList()
list.create_adjacency_list()

dj = list.dijkstra_algorithm(39076461, 597414803, False, 0)
print(dj)

ast = list.dijkstra_algorithm(39076461, 597414803, True, 1)
print(ast)
