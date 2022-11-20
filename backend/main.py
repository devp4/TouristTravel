import AdjacencyList
# import heapq

list = AdjacencyList.AdjacencyList()
list.create_adjacency_list()


# print(list.adjacency_list)

list.dijkstra_algorithm(10197353721, 9194848477, False, 0)
list.dijkstra_algorithm(10197353721, 9194848477, True, 1)

# li = []

# heapq.heappush(li, (1, 2))
# heapq.heappush(li, (4, 2))
# heapq.heappush(li, (3, 4))
# heapq.heappush(li, (10, 2))
# heapq.heappush(li, (2, 2))

# print(li)
