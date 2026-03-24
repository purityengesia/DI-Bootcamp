#cars
# The original string
cars_str = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"

# 1. Convert to list (splitting by comma and space)
manufacturers = cars_str.split(", ")

# 2. Count manufacturers
print(f"There are {len(manufacturers)} manufacturers in the list.")

# 3. Print in descending order (Z-A)
manufacturers.sort(reverse=True)
print(f"Sorted Z-A: {manufacturers}")

# 4. Filter for letters 'o' and 'i'
with_o = [name for name in manufacturers if 'o' in name.lower()]
without_i = [name for name in manufacturers if 'i' not in name.lower()]

print(f"Manufacturers with 'o': {len(with_o)}")
print(f"Manufacturers without 'i': {len(without_i)}")

bonus_list = ["Honda", "Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"]

# Remove duplicates using set(), then convert back to list
unique_cars = list(set(bonus_list))

# Print as a comma-separated string
# .join() combines list items into one string with a separator
output_str = ", ".join(unique_cars)

print(f"Unique companies: {output_str}")
print(f"There are now {len(unique_cars)} companies in the list.")

# Sort A-Z
unique_cars.sort()

# Reverse the letters of each name using list comprehension
reversed_names = [name[::-1] for name in unique_cars]

print(f"Reversed names (A-Z order): {reversed_names}")