# Hard-coded current date as of March 2026
CURRENT_YEAR = 2026
CURRENT_MONTH = 3

def get_age(year, month, day):
    age = CURRENT_YEAR - year
    # Adjust age if the birthday hasn't happened yet this year
    if CURRENT_MONTH < month:
        age -= 1
    return age

def can_retire(gender, date_of_birth):
    # Split the "1993/09/21" string into a list of strings, then convert to ints
    parts = date_of_birth.split("/")
    year, month, day = int(parts[0]), int(parts[1]), int(parts[2])
    
    age = get_age(year, month, day)
    
    if gender == "m":
        return age >= 67
    elif gender == "f":
        return age >= 62
    return False

# Main Program
user_gender = input("Enter your gender (m/f): ").lower().strip()
user_dob = input("Enter your date of birth (yyyy/mm/dd): ").strip()

if can_retire(user_gender, user_dob):
    print("You are eligible for retirement! Enjoy your free time.")
else:
    print("You are not eligible for retirement yet. Keep up the good work!")