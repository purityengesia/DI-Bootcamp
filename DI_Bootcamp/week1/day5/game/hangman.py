import random

wordslist = ['correction', 'childish', 'beach', 'python', 'assertive', 'interference', 'complete', 'share', 'credit card', 'rush', 'south']
word = random.choice(wordslist)

### YOUR CODE STARTS FROM HERE ###

# Initialize the display with stars (keeping spaces if the word has them)
display = []
for char in word:
    if char == " ":
        display.append(" ")
    else:
        display.append("*")

guessed_letters = []
lives = 6

print("Welcome to Hangman!")

while lives > 0 and "*" in display:
    print(f"\nWord: {''.join(display)}")
    print(f"Lives left: {lives}")
    print(f"Guessed so far: {', '.join(guessed_letters)}")
    
    guess = input("Guess a letter: ").lower().strip()

    # 1. Validation: Check if it's a single letter and not guessed before
    if len(guess) != 1 or not guess.isalpha():
        print("Please enter a single valid letter.")
        continue
    
    if guess in guessed_letters:
        print(f"You already guessed '{guess}'. Try a different one!")
        continue

    guessed_letters.append(guess)

    # 2. Check if the guess is in the word
    if guess in word:
        print(f"Good job! '{guess}' is in the word.")
        # Update all positions where the letter appears
        for index, letter in enumerate(word):
            if letter == guess:
                display[index] = guess
    else:
        lives -= 1
        print(f"Sorry, '{guess}' is not there. A body part is added to the gallows.")

# 3. End Game Result
if "*" not in display:
    print(f"\nCongratulations! You guessed the word: {word}")
else:
    print("\nGAME OVER")
    print(f"The gallows are full. The word was: {word}")