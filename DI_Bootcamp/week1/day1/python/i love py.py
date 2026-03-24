# 1.ilove python
print("Hello world" * 4 + "I love python" * 4)

# 2. Ask the user for a month
month = int(input("Enter a month number (1-12): "))

#  Display the season based on the month
if 3 <= month <= 5:
    print("The season is Spring.")
elif 6 <= month <= 8:
    print("The season is Summer.")
elif 9 <= month <= 11:
    print("The season is Autumn.")
elif month == 12 or month == 1 or month == 2:
    print("The season is Winter.")
else:
    print("Invalid month! Please enter a number between 1 and 12.")