#cats
class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

# Step 1: Create cat objects
cat1 = Cat("Whiskers", 3)
cat2 = Cat("Luna", 7)
cat3 = Cat("Mittens", 5)

# Step 2: Create a function to find the oldest cat
def find_oldest_cat(*cats):
    # Using max with a lambda to look at the age attribute
    return max(cats, key=lambda cat: cat.age)

# Step 3: Print the oldest cat’s details
oldest = find_oldest_cat(cat1, cat2, cat3)
print(f"The oldest cat is {oldest.name}, and is {oldest.age} years old.")

#dogs
class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height

    def bark(self):
        print(f"{self.name} goes woof!")

    def jump(self):
        x = self.height * 2
        print(f"{self.name} jumps {x} cm high!")

# Step 2 & 3: Create objects and call methods
davids_dog = Dog("Rex", 50)
sarahs_dog = Dog("Teacup", 20)

for dog in [davids_dog, sarahs_dog]:
    print(f"Dog: {dog.name}, Height: {dog.height}cm")
    dog.bark()
    dog.jump()

# Step 4: Compare Dog Sizes
if davids_dog.height > sarahs_dog.height:
    print(f"The bigger dog is {davids_dog.name}.")
elif sarahs_dog.height > davids_dog.height:
    print(f"The bigger dog is {sarahs_dog.name}.")
else:
    print("Both dogs are the same height.")
    
#song producer
class Song:
    def __init__(self, lyrics):
        self.lyrics = lyrics

    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)

stairway = Song([
    "There’s a lady who's sure", 
    "all that glitters is gold", 
    "and she’s buying a stairway to heaven"
])

stairway.sing_me_a_song()

#zoo
class Zoo:
    def __init__(self, zoo_name):
        self.name = zoo_name
        self.animals = []
        self.grouped_animals = {}

    def add_animal(self, *new_animals):
        """Bonus: accepts multiple animal names."""
        for animal in new_animals:
            if animal not in self.animals:
                self.animals.append(animal)

    def get_animals(self):
        print(f"Animals in {self.name}: {', '.join(self.animals)}")

    def sell_animal(self, animal_sold):
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
            print(f"{animal_sold} has been sold.")
        else:
            print(f"{animal_sold} is not in the zoo.")

    def sort_animals(self):
        """Sorts alphabetically and groups by first letter."""
        self.animals.sort()
        groups = {}
        for animal in self.animals:
            first_letter = animal[0].upper()
            if first_letter not in groups:
                groups[first_letter] = [animal]
            else:
                groups[first_letter].append(animal)
        
        self.grouped_animals = groups
        return groups

    def get_groups(self):
        if not self.grouped_animals:
            self.sort_animals()
        
        print("\n--- Zoo Groups ---")
        for letter, names in self.grouped_animals.items():
            print(f"{letter}: {names}")

# Testing the Zoo
brooklyn_safari = Zoo("Brooklyn Safari")
brooklyn_safari.add_animal("Giraffe", "Bear", "Baboon", "Cougar", "Cat", "Zebra", "Lion")
brooklyn_safari.get_animals()

brooklyn_safari.sell_animal("Bear")
brooklyn_safari.sort_animals()
brooklyn_safari.get_groups()

