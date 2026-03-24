#1.
# 1. User Input
word = input("Enter a word: ")

# Initialize an empty dictionary
letter_indices = {}

# 2. Creating the Dictionary
for index, char in enumerate(word):
    # Check if the character is already a key
    if char in letter_indices:
        # Append the current index to the existing list
        letter_indices[char].append(index)
    else:
        # Create a new key with the index inside a list
        letter_indices[char] = [index]

# 3. Print the final dictionary
print(letter_indices)


#2.
# Example Data
items_purchase = {
    "Apple": "$4", 
    "Honey": "$3", 
    "Fan": "$14", 
    "Bananas": "$4", 
    "Pan": "$100", 
    "Spoon": "$2"
}
wallet_str = "$100"

# 1. Data Cleaning for the Wallet
# We remove '$' and ',' then convert to an integer
wallet = int(wallet_str.replace("$", "").replace(",", ""))

basket = []

# 2. Determining Affordable Items
# We loop through the dictionary in the order items were added (priority)
for item, price_str in items_purchase.items():
    # Clean the item price string
    price = int(price_str.replace("$", "").replace(",", ""))
    
    # Check if we can afford it
    if price <= wallet:
        basket.append(item)
        wallet -= price  # Update the wallet balance

# 3. Output Results
if not basket:
    print("Nothing")
else:
    # Sort the basket alphabetically as requested
    print(sorted(basket))
    

