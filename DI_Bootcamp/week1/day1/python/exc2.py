import random

# 1. Ask for User Input
user_input = input("Please enter a string that is exactly 10 characters long: ")

# 2. Check the Length of the String
length = len(user_input)

if length < 10:
    print("String not long enough.")
elif length > 10:
    print("String too long.")
else:
    print("Perfect string")


# 3. Print the First and Last Characters
 # Index 0 is the first, index -1 is the last
    print(f"First character: {user_input[0]}")
    print(f"Last character: {user_input[-1]}")


 # 4. Build the String Character by Character
    print("\nConstructing string:")
    incremental_string = ""
    for char in user_input:
        incremental_string += char
        print(incremental_string)


# 5. Bonus: Jumble the String
 # Strings are immutable, so we convert to a list to shuffle
    char_list = list(user_input)
    random.shuffle(char_list)
    jumbled_string = "".join(char_list)
    
    print(f"\nJumbled version: {jumbled_string}")