# 1.Create a set called my_fav_numbers and populate it with your favorite numbers.
my_fav_numbers = {7, 13, 21}

# Add two new numbers to the set.
my_fav_numbers.add(5)
my_fav_numbers.add(17)

#Remove the last number you added to the set
my_fav_numbers.remove(17)
#Print the set to see the final result.
print(my_fav_numbers)

#Create another set called friend_fav_numbers and populate it with your friend’s favorite numbers.
friend_fav_numbers = {3, 7, 9}
print(friend_fav_numbers)  

#Concatenate my_fav_numbers and friend_fav_numbers to create a new set called our_fav_numbers.
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)
print(our_fav_numbers)

#2.Given a tuple of integers, try to add more integers to the tuple.
my_tuple = (1, 2, 3)
# my_tuple.add(4)  # This will raise an AttributeError since tuples are immutable
print(my_tuple)
#To add more integers to a tuple, you can create a new tuple that combines the original tuple with the new integers.
new_tuple = my_tuple + (4, 5)
print(new_tuple)

#3.You have a list: basket = ["Banana", "Apples", "Oranges", "Blueberries"] 
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
#Remove "Banana" from the list.
basket.remove("Banana")
print(basket)
#Remove "Blueberries" from the list.
basket.remove("Blueberries")
print(basket)
#Add "Kiwi" to the end of the list.
basket.append("Kiwi")
print(basket)
#Add "Apples" to the beginning of the list.
basket.insert(0, "Apples")
print(basket)
#Count how many times "Apples" appears in the list.
apple_count = basket.count("Apples")
print(f"Number of times 'Apples' appears in the list: {apple_count}")
#Clear the basket.
basket.clear()
print(basket)

#4.Recap: What is a float? What’s the difference between a float and an integer?    
# A float is a number that has a decimal point, while an integer is a whole number without a decimal point. For example, 3.14 is a float, while 3 is an integer. Floats can represent fractional values, while integers can only represent whole numbers.
#Create a list containing the following sequence of mixed types: floats and integers:
1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5.
mixed_list = [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
print(mixed_list)
#Avoid hard-coding each number manually.
mixed_list = [i * 0.5 for i in range(3, 11)]  # This will create the list [1.5, 2, 2.5, ..., 5]
print(mixed_list)
#Think: Can you generate this sequence using a loop or another method?
 #Yes, the list comprehension above uses a loop to generate the sequence of mixed types.
 
 #5.Write a for loop to print all numbers from 1 to 20, inclusive.
for i in range(1, 21):
    print(i)
    #Write another for loop that prints every number from 1 to 20 where the index is even.
for i in range(1, 21):
    if i % 2 == 0:
        print(i)
        
#6.Use an input to ask the user to enter their name, and then print a greeting message that includes their name.
user_name = input("Please enter your name: ")
print(f"Hello, {user_name}!")
#Using a while True loop, check if the user gave a proper name (not digits and at least 3 letters long)
while True:
    if user_name.isalpha() and len(user_name) >= 3:
        print("Thank you for providing a valid name.")
        break
    else:
        user_name = input("Please enter a valid name (at least 3 letters and no digits): ")

#7.Ask the user to input their favorite fruits (they can input several fruits, separated by spaces).  
favorite_fruits = input("Please enter your favorite fruits (separated by spaces): ").split()
#Store the fruits in a list and print the list.
print(f"Your favorite fruits are: {favorite_fruits}")
#Ask the user to input the name of any fruit and check if that fruit is in the list of their favorite fruits. Print an appropriate message based on whether the fruit is in the list or not.
fruit_to_check = input("Enter the name of a fruit to check if it's in your favorites: ")
if fruit_to_check in favorite_fruits:
    print(f"{fruit_to_check} is one of your favorite fruits!Ejoy it!")
else:
    print(f"{fruit_to_check} you choose a new fruit.Ihope you enjoy it!")
    
#8.Write a loop that asks the user to enter pizza toppings one by one until they type "done". Store the toppings in a list and print the final list of toppings.
toppings = []
while True:
    topping = input("Enter a pizza topping (or 'done' to finish): ")
    if topping == "done":
        break
    toppings.append(topping)
print(f"Your pizza will have the following toppings: {toppings}")
#Stop the loop when the user types 'quit'.
while True:
    topping = input("Enter a pizza topping (or 'quit' to finish): ")
    if topping == "quit":
        break
    toppings.append(topping)
print(f"Your pizza will have the following toppings: {toppings}")
#For each topping entered, print:
"Adding [topping] to your pizza."   
toppings = []
while True:
    topping = input("Enter a pizza topping (or 'done' to finish): ")
    if topping == "done":
        break
    toppings.append(topping)
    print(f"Adding {topping} to your pizza.")
    #After exiting the loop, print all the toppings and the total cost of the pizza.
#The base price is $10, and each topping adds $2.50.
base_price = 10
topping_price = 2.50
total_cost = base_price + (len(toppings) * topping_price)
print(f"Your pizza will have the following toppings: {toppings}")
print(f"The total cost of your pizza is: ${total_cost:.2f}")

#9.Atotal_cost = 0

print("Enter the ages of the family members (type 'done' when finished):")

while True:
    user_input = input("Age: ")
    
    if user_input.lower() == 'done':
        break
    
    # Convert input to integer
    age = int(user_input)
    
    # Apply pricing rules
    if age < 3:
        cost = 0
    elif 3 <= age <= 12:
        cost = 10
    else:
        cost = 15
        
    total_cost += cost

print(f"Total ticket cost: ${total_cost}")
# List to store all ages provided
all_ages = []

print("Enter the ages of the teenagers (type 'done' to see final list):")

while True:
    entry = input("Enter age: ")
    if entry.lower() == 'done':
        break
    all_ages.append(int(entry))

# The Filter: Keep only those between 16 and 21 (inclusive)
allowed_attendees = [age for age in all_ages if 16 <= age <= 21]

print(f"\nOriginal group ages: {all_ages}")
print(f"Final list of allowed attendees: {allowed_attendees}")