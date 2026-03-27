#geometry
import math

class Circle:
    def __init__(self, radius=1.0):
        self.radius = radius

    def perimeter(self):
        # Formula: 2 * π * r
        return 2 * math.pi * self.radius

    def area(self):
        # Formula: π * r²
        return math.pi * (self.radius ** 2)

    def definition(self):
        print("A circle is the set of all points in a plane that are at a given distance from a given point, the center.")

# Example usage:
my_circle = Circle(5)
print(f"Area: {my_circle.area():.2f}")
my_circle.definition()

#exc2.custom list
import random

class MyList:
    def __init__(self, letters):
        self.letters = letters

    def get_reversed(self):
        return self.letters[::-1]

    def get_sorted(self):
        return sorted(self.letters)

    def generate_random_numbers(self):
        # Bonus: Using list comprehension to match length
        return [random.randint(1, 100) for _ in range(len(self.letters))]

# Example usage:
chars = MyList(['d', 'a', 'c', 'b'])
print(f"Sorted: {chars.get_sorted()}")
print(f"Random List: {chars.generate_random_numbers()}")

#3menu manager
class MenuManager:
    def __init__(self):
        # Initializing the menu with the provided dishes
        self.menu = [
            {"name": "Soup", "price": 10, "spice": "B", "gluten": False},
            {"name": "Hamburger", "price": 15, "spice": "A", "gluten": True},
            {"name": "Salad", "price": 18, "spice": "A", "gluten": False},
            {"name": "French Fries", "price": 5, "spice": "C", "gluten": False},
            {"name": "Beef bourguignon", "price": 25, "spice": "B", "gluten": True}
        ]

    def add_item(self, name, price, spice, gluten):
        new_dish = {
            "name": name, 
            "price": price, 
            "spice": spice, 
            "gluten": gluten
        }
        self.menu.append(new_dish)
        print(f"{name} has been added to the menu.")

    def update_item(self, name, price, spice, gluten):
        for dish in self.menu:
            if dish["name"] == name:
                dish["price"] = price
                dish["spice"] = spice
                dish["gluten"] = gluten
                print(f"{name} has been updated.")
                return
        print(f"Error: {name} is not in the menu.")

    def remove_item(self, name):
        for i, dish in enumerate(self.menu):
            if dish["name"] == name:
                del self.menu[i]
                print(f"{name} removed. Updated menu:")
                for item in self.menu:
                    print(item)
                return
        print(f"Error: {name} is not in the menu.")

# Testing the Manager
manager = MenuManager()
manager.add_item("Pasta", 12, "A", True)
manager.update_item("Hamburger", 17, "B", True)
manager.remove_item("Salad")

