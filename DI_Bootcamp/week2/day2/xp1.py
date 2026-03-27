#pets
class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'

# Step 1: Create the Siamese Class
class Siamese(Cat):
    pass 

# Step 2: Create a list of cat instances
all_cats = [
    Bengal("Tiger", 3),
    Chartreux("Felix", 5),
    Siamese("Misty", 2)
]

# Step 3 & 4: Instantiate Pets and Walk
sara_pets = Pets(all_cats)
sara_pets.walk()

#ex2.dogs
class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return self.weight / self.age * 10

    def fight(self, other_dog):
        my_score = self.run_speed() * self.weight
        other_score = other_dog.run_speed() * other_dog.weight
        
        if my_score > other_score:
            return f"{self.name} won the fight!"
        elif other_score > my_score:
            return f"{other_dog.name} won the fight!"
        else:
            return "It's a draw!"

# Step 2 & 3: Instances and Testing
dog1 = Dog("Rex", 5, 20)
dog2 = Dog("Bolt", 3, 15)
dog3 = Dog("Tank", 8, 40)

print(dog1.bark())
print(f"{dog2.name} speed: {dog2.run_speed()}")
print(dog3.fight(dog1))

#ex3.dog domesticated
import random
# from dog_file import Dog (Assuming Dog class is available)

class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *args):
        # args is a tuple of dog instances or names
        names = [self.name] + [dog.name if isinstance(dog, Dog) else dog for dog in args]
        print(f"{', '.join(names)} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = ["does a barrel roll", "stands on his back legs", "shakes your hand", "plays dead"]
            print(f"{self.name} {random.choice(tricks)}")
        else:
            print(f"{self.name} is not trained yet!")

# Testing
my_pet = PetDog("Buddy", 4, 12)
my_pet.train()
my_pet.play("Max", "Rex")
my_pet.do_a_trick()

#ex4.family and person classes
class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self.age = age
        self.last_name = ""

    def is_18(self):
        return self.age >= 18

class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []

    def born(self, first_name, age):
        new_person = Person(first_name, age)
        new_person.last_name = self.last_name
        self.members.append(new_person)
        print(f"Congratulations! {first_name} {self.last_name} was born into the family.")

    def check_majority(self, first_name):
        for member in self.members:
            if member.first_name == first_name:
                if member.is_18():
                    print(f"You are over 18, your parents Jane and John accept that you will go out with your friends")
                else:
                    print(f"Sorry {first_name}, you are not allowed to go out with your friends.")
                return
        print("Member not found.")

    def family_presentation(self):
        print(f"\nFamily: {self.last_name}")
        for member in self.members:
            print(f"- {member.first_name}, {member.age} years old")

# Testing the Family Logic
smith_family = Family("Smith")
smith_family.born("John", 45)
smith_family.born("Jane", 42)
smith_family.born("Alice", 19)
smith_family.born("Charlie", 10)

smith_family.family_presentation()
smith_family.check_majority("Alice")
smith_family.check_majority("Charlie")

