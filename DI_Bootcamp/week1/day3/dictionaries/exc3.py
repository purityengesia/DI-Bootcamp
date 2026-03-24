birthdays = {
    "Alice": "1995/05/12",
    "Bob": "1988/11/21",
    "Charlie": "2001/03/03",
    "Dana": "1992/08/15"
}

#  Print all names in the dictionary
print("We have birthday information for:")
for name in birthdays:
    print(f"- {name}")

# 2. Ask for user input
search_name = input("\nEnter a person's name to see their birthday: ").strip()

#  Check if the name exists and handle errors
if search_name in birthdays:
    print(f"{search_name}'s birthday is {birthdays[search_name]}.")
else:
    print(f"Sorry, we don’t have the birthday information for {search_name}.")
    
#3.birthday lookup
birthdays = {
    "Alice": "1995/05/12",
    "Bob": "1988/11/21",
    "Charlie": "2001/03/03",
    "Dana": "1992/08/15"
}

# Ask the user to ADD a new birthday
print("--- Add a New Birthday ---")
new_name = input("Enter the person's name: ").strip().capitalize()
new_date = input(f"Enter the birthday for {new_name} (YYYY/MM/DD): ").strip()

# Add the new data into the dictionary
birthdays[new_name] = new_date
print(f"Success! {new_name} has been added.\n")

#  Print all names (including the one just added)
print("We have birthday information for:")
for name in birthdays:
    print(f"- {name}")

#  Look up a birthday
search_name = input("\nWhose birthday are you looking for? ").strip().capitalize()

if search_name in birthdays:
    print(f"{search_name}'s birthday is {birthdays[search_name]}.")
else:
    print(f"Sorry, we don’t have the birthday information for {search_name}.")
    
#4.fruit shop
items = {
    "banana": 4,
    "apple": 2,
    "orange": 1.5,
    "pear": 3
}

for fruit, price in items.items():
    print(f"A {fruit} costs ${price}.")
    
    inventory = {
    "banana": {"price": 4 , "stock": 10},
    "apple": {"price": 2, "stock": 5},
    "orange": {"price": 1.5 , "stock": 24},
    "pear": {"price": 3 , "stock": 1}
}

total_value = 0

for fruit, data in inventory.items():
    # Access the inner dictionary values
    item_total = data["price"] * data["stock"]
    print(f"Total value of {fruit} stock: ${item_total:.2f}")
    
    # Add to the grand total
    total_value += item_total

print("-" * 30)
print(f"Total cost to buy everything: ${total_value:.2f}")

    