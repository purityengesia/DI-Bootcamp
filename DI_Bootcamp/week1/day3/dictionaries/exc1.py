#1.converting list to dictionary
keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]

# Using zip() to pair elements and dict() to create the dictionary
result = dict(zip(keys, values))

print(result)
# Output: {'Ten': 10, 'Twenty': 20, 'Thirty': 30}

#2.family dictionary
family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}
total_cost = 0

print("--- Movie Ticket Receipt ---")

# Loop through the dictionary items
for name, age in family.items():
    if age < 3:
        price = 0
    elif 3 <= age <= 12:
        price = 10
    else:
        price = 15
    
    # Capitalize the name for a cleaner look
    print(f"{name.capitalize()}: ${price}")
    total_cost += price

print("-" * 25)
print(f"Total Family Cost: ${total_cost}")

#
user_family = {}
grand_total = 0

print("Enter family details (type 'quit' for the name to finish):")

while True:
    name = input("Enter name: ").strip()
    if name.lower() == 'quit':
        break
    
    age_input = input(f"Enter age for {name}: ")
    # Simple check to ensure age is a number
    if age_input.isdigit():
        user_family[name] = int(age_input)
    else:
        print("Invalid age. Please enter a number.")

# Final calculation loop
print("\n--- Final Calculations ---")
for name, age in user_family.items():
    if age < 3:
        p = 0
    elif 3 <= age <= 12:
        p = 10
    else:
        p = 15
    print(f"{name}: ${p}")
    grand_total += p

print(f"Grand Total: ${grand_total}")

#3.dictionary containing zara's brand
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue",
        "Spain": "red",
        "US": ["pink", "green"]
    }
}

# 1. Change number_stores
brand["number_stores"] = 2

# 2. Describe Zara’s clients
# Using .join() makes the list look like a natural sentence
clients = ", ".join(brand["type_of_clothes"])
print(f"Zara's clients include people looking for {clients} clothing.")

# 3. Add country_creation
brand["country_creation"] = "Spain"

# 4. Check for competitors and add "Desigual"
if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")

# 5. Delete creation_date using .pop()
brand.pop("creation_date")

# 6. Print the last item in international_competitors
print(f"Last competitor added: {brand['international_competitors'][-1]}")

# 7. Print major colors in the US
# We access the nested dictionary first, then the specific key
print(f"Major colors in the US: {brand['major_color']['US']}")

# 8. Print the number of keys
print(f"Total number of keys: {len(brand)}")

# 9. Print all keys
print(f"All keys in the brand dictionary: {list(brand.keys())}")

more_on_zara = {
    "creation_date": 1975,
    "number_stores": 10000
}

# Merge more_on_zara into the original brand dictionary
brand.update(more_on_zara)

# Print the final result to see the changes
print("\n--- Merged Brand Dictionary ---")
print(brand)


#4.disney character
users = ["Mickey", "Minnie", "Donald", "Ariel", "Pluto"]

# 1. Map Characters to Indices
# Output: {"Mickey": 0, "Minnie": 1, ...}
disney_users_A = {user: i for i, user in enumerate(users)}
print(disney_users_A)

# 2. Map Indices to Characters
# Output: {0: "Mickey", 1: "Minnie", ...}
disney_users_B = {i: user for i, user in enumerate(users)}
print(disney_users_B)

# 3. Alphabetical Sort then Map to Indices
# Output: {"Ariel": 0, "Donald": 1, ...}
users_sorted = sorted(users)
disney_users_C = {user: i for i, user in enumerate(users_sorted)}
print(disney_users_C)