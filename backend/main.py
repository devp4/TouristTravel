import AdjacencyList

x = AdjacencyList.AdjacencyList()
x.create_adjacency_list()

ast = x.dijkstra_algorithm(1061531500, 42433550, True, 0.5)
print(ast)
