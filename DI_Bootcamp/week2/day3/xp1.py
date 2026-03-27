#currency
class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount

    def __str__(self):
        # Handles pluralization simply for the example
        label = self.currency + ('s' if self.amount != 1 else '')
        return f"{self.amount} {label}"

    def __repr__(self):
        return self.__str__()

    def __int__(self):
        return self.amount

    def __add__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            return self.amount + other.amount
        return self.amount + other

    def __iadd__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            self.amount += other.amount
        else:
            self.amount += other
        return self # In-place addition must return self
    
#2 import
#func.py
def sum_and_print(a, b):
    print(f"The sum is: {a + b}")
#exercise_one.py
from func import sum_and_print

sum_and_print(10, 15)

#string module
import string
import random

def generate_random_string(length=5):
    letters = string.ascii_letters # Contains both 'abcdef...' and 'ABCDEF...'
    result = ''.join(random.choice(letters) for _ in range(length))
    print(f"Generated String: {result}")

generate_random_string()

#4 current date
from datetime import date

def display_current_date():
    today = date.today()
    print(f"Today's date is: {today}")

display_current_date()

#ex5
from datetime import datetime

def time_until_new_year():
    now = datetime.now()
    next_year = now.year + 1
    new_year_day = datetime(next_year, 1, 1)
    
    time_left = new_year_day - now
    
    print(f"The time left until Jan 1st is: {time_left}")

time_until_new_year()

#birthday and minute
from datetime import datetime

def minutes_lived(birthdate_str):
    # Expected format: YYYY-MM-DD
    birthdate = datetime.strptime(birthdate_str, "%Y-%m-%d")
    now = datetime.now()
    
    duration = now - birthdate
    # Calculate total minutes
    total_minutes = int(duration.total_seconds() / 60)
    
    print(f"You have lived for approximately {total_minutes:,} minutes.")

# Example call:
minutes_lived("1995-05-20")

#exercise 7 fake module
from faker import Faker

fake = Faker()
users = []

def add_users(num_of_users):
    for _ in range(num_of_users):
        user_data = {
            "name": fake.name(),
            "address": fake.address(),
            "language_code": fake.language_code()
        }
        users.append(user_data)

add_users(5)

# Displaying the list nicely
for user in users:
    print(user)
    

    