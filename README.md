# vector-clock

Pairs of replicas, **a, b**, can be compared by inspecting their clocks and determined to be either:
 - identical (**a=b**);
 - concurrent (**a||b**);
 - ordered (**a<b** or **b < a**).
