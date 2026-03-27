#holidays
from datetime import datetime
import holidays

def upcoming_holiday(country='US'):
    now = datetime.now()
    year = now.year
    # Get holidays for this year and next (in case the next holiday is in Jan)
    geo_holidays = holidays.CountryHoliday(country, years=[year, year + 1])
    
    # Sort holidays by date and find the first one that is after 'now'
    future_holidays = sorted([(date, name) for date, name in geo_holidays.items() if date > now.date()])
    
    next_date, next_name = future_holidays[0]
    next_date_dt = datetime.combine(next_date, datetime.min.time())
    time_left = next_date_dt - now
    
    print(f"Today's date is: {now.strftime('%Y-%m-%d')}")
    print(f"The next holiday is {next_name} in {time_left.days} days and {time_left.seconds // 3600} hours.")

upcoming_holiday()

#ex2 how old are you in jupiter
def calculate_planetary_age(seconds):
    earth_year_seconds = 31557600
    orbital_periods = {
        "Earth": 1.0,
        "Mercury": 0.2408467,
        "Venus": 0.61519726,
        "Mars": 1.8808158,
        "Jupiter": 11.862615,
        "Saturn": 29.447498,
        "Uranus": 84.016846,
        "Neptune": 164.79132
    }
    
    print(f"Age in seconds: {seconds:,}")
    for planet, period in orbital_periods.items():
        age = seconds / (earth_year_seconds * period)
        print(f"On {planet}: {age:.2f} years old")

calculate_planetary_age(1000000000)

#ex3
import re

def return_numbers(text):
    # findall returns a list of all matches
    numbers = re.findall(r'\d', text)
    return "".join(numbers)

print(return_numbers('k5k3q2g5z6x9bn')) # Output: 532569

#ex4
import re

def validate_name():
    while True:
        full_name = input("Please enter your full name (First Last): ")
        # Pattern: Upper followed by letters, space, Upper followed by letters
        pattern = r"^[A-Z][a-z]+\s[A-Z][a-z]+$"
        
        if re.match(pattern, full_name):
            print("Name is valid!")
            break
        else:
            print("Invalid format. Ensure only letters, one space, and Title Case (e.g., 'John Doe').")

# validate_name()

#ex5.password generator
import random
import string
import re

def generate_password(length):
    if not (6 <= length <= 30):
        return None
    
    # Define character sets
    lower = string.ascii_lowercase
    upper = string.ascii_uppercase
    digits = string.digits
    special = "!@#$%^&*()_+-="
    all_chars = lower + upper + digits + special
    
    # Ensure at least one of each
    password = [
        random.choice(lower),
        random.choice(upper),
        random.choice(digits),
        random.choice(special)
    ]
    
    # Fill the rest of the length
    password += [random.choice(all_chars) for _ in range(length - 4)]
    
    # Shuffle to hide the fact that the first 4 were forced
    random.shuffle(password)
    return "".join(password)

def test_password(password, length):
    if len(password) != length: return False
    if not re.search(r"[a-z]", password): return False
    if not re.search(r"[A-Z]", password): return False
    if not re.search(r"\d", password): return False
    if not re.search(r"[!@#$%^&*()_+-=]", password): return False
    return True

# Main Flow
def run_password_tool():
    while True:
        try:
            user_length = int(input("Enter password length (6-30): "))
            if 6 <= user_length <= 30:
                break
            print("Length must be between 6 and 30.")
        except ValueError:
            print("Please enter a valid number.")

    new_pw = generate_password(user_length)
    print(f"Your secure password is: {new_pw}")
    print("Keep this password in a safe place!")

# Run the 100-time test
def run_bulk_test():
    for _ in range(100):
        length = random.randint(6, 30)
        pw = generate_password(length)
        if not test_password(pw, length):
            print(f"Test failed for: {pw}")
            return
    print("All 100 tests passed successfully!")

run_bulk_test()

