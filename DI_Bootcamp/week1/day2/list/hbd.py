#from datetime import datetime

# 1. Ask for user input
birthday_str = input("Please enter your birthdate (DD/MM/YYYY): ")

try:
    # Convert string to a date object
    birth_date = datetime.strptime(birthday_str, "%d/%m/%Y")
    today = datetime.now()
    
    # Calculate age
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))
    
    # Get the last digit of the age for candles
    last_digit = int(str(age)[-1])
    candles = "i" * last_digit
    padding = (11 - last_digit) // 2
    candle_line = "_" * padding + candles + "_" * (11 - last_digit - padding)

    # Define the cake template
    cake = f"""
       {candle_line}
      |:H:a:p:p:y:|
    __|___________|__
   |^^^^^^^^^^^^^^^^^|
   |:B:i:r:t:h:d:a:y:|
   |                 |
   ~~~~~~~~~~~~~~~~~~~
    """

    # 2. Display the cake
    print(f"\nYou are {age} years old!")
    print(cake)

    # 3. Bonus: Leap Year Check
    year = birth_date.year
    is_leap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)
    
    if is_leap:
        print("Bonus: You were born on a leap year! Have a second cake:")
        print(cake)

except ValueError:
    print("Invalid format. Please use DD/MM/YYYY (e.g., 25/12/1995).")
    