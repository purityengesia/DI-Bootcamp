rows = 3
for i in range(rows):
    # Spaces decrease as we go down (2, 1, 0)
    # Stars follow the formula (2 * i + 1) -> (1, 3, 5)
    print(" " * (rows - i - 1) + "*" * (2 * i + 1))
    
    rows = 5
for i in range(1, rows + 1):
    # Spaces: 4, 3, 2, 1, 0
    # Stars: 1, 2, 3, 4, 5
    print(" " * (rows - i) + "*" * i)
    
 #combined mirror triangle
    rows = 5
# Top Part (Left Aligned)
for i in range(1, rows + 1):
    print("*" * i)

# Bottom Part (Right Aligned & Decreasing)
for i in range(rows, 0, -1):
    # Spaces increase (0, 1, 2, 3, 4)
    # Stars decrease (5, 4, 3, 2, 1)
    print(" " * (rows - i) + "*" * i)

#2 code analysis    
my_list = [2, 24, 12, 354, 233] # Initial list

# Outer loop: Iterates through the list indices from 0 to 3
for i in range(len(my_list) - 1):
    minimum = i # Assume the current index 'i' holds the smallest value
    
    # Inner loop: Checks every element AFTER index 'i'
    for j in range(i + 1, len(my_list)):
        
        # Comparison: Is the current element 'j' smaller than our current 'minimum'?
        if(my_list[j] < my_list[minimum]):
            minimum = j # Update 'minimum' to the new index found
            
            # Swapping: If we found a new minimum, swap it with the element at index 'i'
            if(minimum != i):
                my_list[i], my_list[minimum] = my_list[minimum], my_list[i]

print(my_list) # Final Output: [2, 12, 24, 233, 354]