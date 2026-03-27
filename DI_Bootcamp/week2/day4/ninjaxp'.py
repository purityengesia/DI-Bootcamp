#valentines menu manager
import re
import json

def display_heart():
    """Algorithm to display a heart made of stars."""
    for row in range(6):
        for col in range(7):
            if (row == 0 and col % 3 != 0) or \
               (row == 1 and col % 3 == 0) or \
               (row - col == 2) or \
               (row + col == 8):
                print("*", end="")
            else:
                print(" ", end="")
        print()

def validate_valentine_item(name, price):
    # Rule: Starts with V, Title Case (except connection words), at least two 'e', no numbers.
    # We use a simple regex for the 'V' and no numbers, then logic for the rest.
    if not re.match(r"^[V][a-zA-Z\s\-]*$", name): return False
    if name.count('e') < 2: return False
    
    # Rule: Price must be XX,14
    if not re.match(r"^\d{2},14$", price): return False
    
    return True

def add_valentine_item():
    name = input("Enter Valentine Item Name (e.g., Vegetable Soup of Valentines-day): ")
    price = input("Enter Price (Format XX,14): ")
    
    if validate_valentine_item(name, price):
        display_heart()
        # Logic to append to "valentine_items" list in your JSON
        print(f"'{name}' added to the Valentine's Specials!")
    else:
        print("Invalid entry. Does not meet Valentine's standards.")

#ex2
import random
import json

class Character:
    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.stats = {
            "Strength": self.roll_dice(),
            "Dexterity": self.roll_dice(),
            "Constitution": self.roll_dice(),
            "Intelligence": self.roll_dice(),
            "Wisdom": self.roll_dice(),
            "Charisma": self.roll_dice()
        }

    def roll_dice(self):
        """Rolls four 6-sided dice and sums the highest three."""
        rolls = [random.randint(1, 6) for _ in range(4)]
        rolls.remove(min(rolls))
        return sum(rolls)

    def to_dict(self):
        return {"name": self.name, "age": self.age, "stats": self.stats}

class Game:
    def __init__(self):
        self.players = []

    def start(self):
        num_players = int(input("How many players? "))
        for i in range(num_players):
            print(f"\nPlayer {i+1}:")
            name = input("Character Name: ")
            age = input("Character Age: ")
            self.players.append(Character(name, age))
        
        self.export_json()
        self.export_txt()

    def export_json(self):
        data = [p.to_dict() for p in self.players]
        with open('characters.json', 'w') as f:
            json.dump(data, f, indent=4)
        print("Exported to characters.json")

    def export_txt(self):
        with open('characters.txt', 'w') as f:
            for p in self.players:
                f.write(f"NAME: {p.name} | AGE: {p.age}\n")
                for stat, val in p.stats.items():
                    f.write(f"- {stat}: {val}\n")
                f.write("-" * 20 + "\n")
        print("Exported to characters.txt")

if __name__ == "__main__":
    new_game = Game()
    new_game.start()
    
