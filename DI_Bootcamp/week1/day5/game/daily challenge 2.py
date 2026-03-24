import random

# Initializing the data
list_of_numbers = [random.randint(0, 10000) for _ in range(20000)]
target_number = 3728

def find_pairs(numbers, target):
    seen = set()
    pairs = set() # Using a set for pairs to avoid duplicate outputs

    for num in numbers:
        complement = target - num
        
        # If the number needed to reach the target is in our 'seen' set, we found a pair
        if complement in seen:
            # Sort the pair so (1000, 2728) and (2728, 1000) are treated as the same
            pair = tuple(sorted((num, complement)))
            pairs.add(pair)
        
        # Add the current number to the 'seen' set
        seen.add(num)
    
    return pairs

# Execute and print results
found_pairs = find_pairs(list_of_numbers, target_number)

print(f"Found {len(found_pairs)} unique pairs that sum to {target_number}:")
for p in list(found_pairs)[:10]: # Showing the first 10 results
    print(f"{p[0]} + {p[1]} = {target_number}")