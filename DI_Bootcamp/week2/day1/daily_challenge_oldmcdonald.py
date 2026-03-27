#farm class
class Farm:
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}

    def add_animal(self, animal_type=None, count=1, **kwargs):
        # Handle standard arguments
        if animal_type:
            if animal_type in self.animals:
                self.animals[animal_type] += count
            else:
                self.animals[animal_type] = count
        
        # Step 8: Handle **kwargs for multiple animals
        for animal, quantity in kwargs.items():
            if animal in self.animals:
                self.animals[animal] += quantity
            else:
                self.animals[animal] = quantity

    def get_info(self):
        info = f"{self.name}'s farm\n\n"
        for animal, count in self.animals.items():
            info += f"{animal} : {count}\n"
        info += "\n    E-I-E-I-O!"
        return info

    # Step 6: Sorted list of types
    def get_animal_types(self):
        return sorted(self.animals.keys())

    # Step 7: Short summary with pluralization logic
    def get_short_info(self):
        types = self.get_animal_types()
        plural_animals = []
        
        for animal in types:
            # Basic pluralization: add 's' if count > 1
            if self.animals[animal] > 1:
                plural_animals.append(f"{animal}s")
            else:
                plural_animals.append(animal)
        
        # Formatting the list into a sentence: "cows, goats and sheeps"
        if len(plural_animals) > 1:
            list_str = ", ".join(plural_animals[:-1]) + f" and {plural_animals[-1]}"
        else:
            list_str = plural_animals[0]
            
        return f"{self.name}'s farm has {list_str}."

# --- Test the Code ---
macdonald = Farm("McDonald")

# Testing the standard add_animal
macdonald.add_animal('cow', 5)
macdonald.add_animal('sheep')
macdonald.add_animal('sheep')

# Testing the **kwargs upgrade
macdonald.add_animal(goat=12, pig=3)

print(macdonald.get_info())
print("-" * 20)
print(macdonald.get_short_info())

