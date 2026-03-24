#1.Write code that concatenates two lists together without using the + sign
from random import random


list1 = [1, 2, 3]
list2 = [4, 5, 6]
list1.extend(list2)
print(list1)

#2.Create a loop that goes from 1500 to 2500 and prints all multiples of 5 and 7.
for i in range(1500, 2501):
    if i % 5 == 0 and i % 7 == 0:
        print(i)

#3Using this variable

names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
#Ask a user for their name, if their name is in the names list print out the index of the first occurence of the name.
user_name = input("Enter your name: ")
if user_name in names:
    print(names.index(user_name))
#If their name is not in the names list, print out a message saying that their name is not in the list.
else:
    print("Your name is not in the list.")  
    
#4.Ask the user for 3 numbers and print the greatest number.
num1 = float(input("Enter the first number: "))
num2 = float(input("Enter the second number: "))
num3 = float(input("Enter the third number: "))

greatest = max(num1, num2, num3)
print("The greatest number is:", greatest)  

#5.Create a string of all the letters in the alphabet
alphabet = "abcdefghijklmnopqrstuvwxyz"
print(alphabet)
#Loop over each letter and print a message that contains the letter and whether its a vowel or a consonant.
vowels = "aeiou"
for letter in alphabet:
    if letter in vowels:
        print(f"{letter} is a vowel.")
    else:
        print(f"{letter} is a consonant.")

#6.Ask a user for 7 words, store them in a list named words.
words = []
for i in range(7):
    word = input("Enter a word: ")
    words.append(word)
    #Ask the user for a single character, store it in a variable called letter
letter = input("Enter a single character: ")
#Loop through the list of words and print out any word that contains the letter.
for word in words:  
    if letter in word:
        print(f"{word} contains the letter {letter}.")
        found = True
        
#If the letter doesn’t exist in one of the words, print a friendly message with the word and the letter.
if not found:
    print(f"The letter {letter} is not in any of the words.")
    
#7.Create a list of numbers from one to one million and then use min() and max() to make sure your list actually starts at one and ends at one million. Use the sum() function to see how quickly Python can add a million numbers.
numbers = list(range(1, 1000001))
print(f"Min: {min(numbers)}, Max: {max(numbers)}")
print(f"Sum: {sum(numbers)}")   

#8Write a program which accepts a sequence of comma-separated numbers. Generate a list and a tuple which contain every number.
user_input = input("Enter a sequence of comma-separated numbers: ")
numbers_list = user_input.split(',')
numbers_tuple = tuple(numbers_list)
print(f"List: {numbers_list}")
print(f"Tuple: {numbers_tuple}")

#9.Ask the user to input a number from 1 to 9 (including). If the user inputs a valid number, print a multiplication table for that number. If the user inputs an invalid number, print an error message.
number = int(input("Enter a number from 1 to 9: "))
if 1 <= number <= 9:
    for i in range(1, 11):
        print(f"{number} x {i} = {number * i}")
else:
    print("Invalid number. Please enter a number from 1 to 9.")
#Get a random number between 1 and 9. Hint: random module.
random_number = random.randint(1, 9)
print(f"Random number generated: {random_number}")
#If the user guesses the correct number print a message that says Winner! If the user guesses the wrong number, print a message that says Better luck next time.
if number == random_number:
    print("Winner!")
    #If the user guesses the wrong number print a message that says better luck next time
else:    print("Better luck next time.")
#Bonus: use a loop that allows the user to keep guessing until they want to quit.
while True:
    user_guess = int(input("Guess a number from 1 to 9 (or enter 0 to quit): "))
    if user_guess == 0:
        print("Thanks for playing!")
        break
    elif user_guess == random_number:
        print("Winner!")
    else:
        print("Better luck next time.")
    #Bonus 2: on exiting the loop tally up and display total games won and lost.    
    

