#exercise1 
from ast import If


print("Hello world\nHello world\nHello world\nHello world")


#exercise2
print((99**3) * 8)

#3 Comparison Tests
print(15 < 8)            # Expected: False
print(5 < 3)             # Expected: False
print(3 == 3)            # Expected: True
print(3 == "3")          # Expected: False
print("Hello" == "hello") # Expected: False

#4 Create the variable with your computer's brand name
computer_brand = "Apple" 
# Print the sentence using the variable
print(f"I have a {computer_brand} computer.")

#Create a variable called name, and set it’s value to your name
name = "John Doe"
#Create a variable called age, and set it’s value to your age
age = 30
#Create a variable called shoe_size, and set it’s value to your shoe size
shoe_size = 10
#Create a variable called info and set it’s value to an interesting sentence about yourself. The sentence must contain all the variables created in parts 1, 2, and 3.
info = f"My name is {name}, I am {age} years old, and my shoe size is {shoe_size}."
#Print the variable info
print(info)
#Have your code print the info message again, but this time using string concatenation instead of an f-string.
info_concat = "My name is " + name + ", I am " + str(age) + " years old, and my shoe size is " + str(shoe_size) + "."
print(info_concat)

#Create two variables, a and b.
a = 5
b = 10
#Create a variable called c, and set it’s value to the sum of a and b.
c = a + b
print(c)
#Each variable’s value should be a number. Print the value of c.
#Now set the value of a to a new number, and print the value of c again.
a = 20
print(c)  # This will still print 15, because c was calculated before a was changed.
#If a is bigger than b, have your code print "Hello World"
if a > b:
    print("Hello World")
    
#Write code that asks the user for a number and determines whether this number is odd or even.

number = int(input("Enter a number: "))
if number % 2 == 0:
    print("The number is even.")
else:
    print("The number is odd.")
    
#Write code that asks the user for their name and determines whether or not you have the same name. Print out a funny message based on the outcome.

user_name = input("What is your name? ")
my_name = "John Doe"

if user_name == my_name:
    print("Wow, we have the same name! That's so cool!")
else:
    print(f"Nice to meet you, {user_name}! I'm {my_name}.")
    
#Write code that will ask the user for their height in centimeters. If they are over 145cm, print a message that says "You are tall enough to ride the rollercoaster!", but if they are under 145cm print a message that says "Sorry, you need to be taller to ride the rollercoaster."
height = int(input("What is your height in centimeters? "))
if height > 145:
    print("You are tall enough to ride the rollercoaster!")
else:
    print("Sorry, you need to be taller to ride the rollercoaster.")
    

