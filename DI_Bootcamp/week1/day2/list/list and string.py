#1.Ask the user for two inputs:A number (integer).A length (integer).
number = int(input("Enter a number (integer): "))
length = int(input("Enter a length (integer): "))

#Create a program that generates a list of multiples of the given number.
multiples = [number * i for i in range(1, length + 1)]
print(multiples)

# The list should stop when it reaches the length specified by the user.

#2. Ask the user for a string.
user_string = input("Enter a string: ")
#  Write a program that processes the string to remove consecutive duplicate letters.
processed_string = ""
for char in user_string:
    if not processed_string or char != processed_string[-1]:
        processed_string += char
print(processed_string)
# 3. Print the modified string
print(f"Modified string: {processed_string}")