#Class: A blueprint or template for creating objects. It defines the attributes (data) and methods (behaviors) that the objects created from it will have.

#Instance: A specific object created from a class. If "Car" is the class, your specific Toyota Corolla in the driveway is an instance.

#Encapsulation: The practice of bundling data and methods into a single unit (a class) and restricting direct access to some components. It keeps the "innards" of an object safe from outside interference.

#Abstraction: Hiding complex implementation details and showing only the necessary features of an object. You know how to use a steering wheel without needing to understand exactly how the rack-and-pinion gear works.

#Inheritance: A mechanism where a new class (child) derives attributes and methods from an existing class (parent), allowing for code reuse.

#Multiple Inheritance: A feature where a class can inherit attributes and methods from more than one parent class.

#Polymorphism: The ability of different classes to be treated as instances of the same general class through the same interface. For example, a draw() method might work differently for a Circle class than for a Square class.

#Method Resolution Order (MRO): The order in which Python looks for a method or attribute in a hierarchy of classes, especially important in multiple inheritance to avoid ambiguity.

#2deck of cards
import random

class Card:
    def __init__(self, suit, value):
        self.suit = suit
        self.value = value

    def __repr__(self):
        """Returns a string representation of the card."""
        return f"{self.value} of {self.suit}"

class Deck:
    def __init__(self):
        self.reset_deck()

    def reset_deck(self):
        """Initializes a full deck of 52 cards."""
        suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
        values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
        self.cards = [Card(s, v) for s in suits for v in values]

    def shuffle(self):
        """Ensures the deck is full and then shuffles it."""
        if len(self.cards) < 52:
            print("Refilling deck before shuffle...")
            self.reset_deck()
        random.shuffle(self.cards)
        print("Deck shuffled successfully.")

    def deal(self):
        """Removes and returns a single card from the deck."""
        if len(self.cards) == 0:
            return "No cards left in the deck!"
        return self.cards.pop()

# --- Testing the code ---
my_deck = Deck()
my_deck.shuffle()

# Deal a few cards
print(f"Dealt: {my_deck.deal()}")
print(f"Dealt: {my_deck.deal()}")
print(f"Cards remaining: {len(my_deck.cards)}")