# Exercise 1: Simple Function
def display_message():
    print("I am learning about functions in Python.")

display_message()

# Exercise 2: Parameters
def favorite_book(title):
    print(f"One of my favorite books is {title}.")

favorite_book("Alice in Wonderland")

# Exercise 3: Default Values
def describe_city(city, country="Unknown"):
    print(f"{city} is in {country}.")

describe_city("Reykjavik", "Iceland")
describe_city("Paris") # Uses default "Unknown"