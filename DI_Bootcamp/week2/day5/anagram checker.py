class AnagramChecker:
    def __init__(self, file_path='sowpods.txt'):
        """Loads the word list and stores it as a set for O(1) lookup speed."""
        try:
            with open(file_path, 'r') as f:
                # Store in a set for faster validation checks
                self.word_list = {line.strip().lower() for line in f}
        except FileNotFoundError:
            print(f"Error: The file {file_path} was not found.")
            self.word_list = set()

    def is_valid_word(self, word):
        """Checks if the word exists in the dictionary."""
        return word.lower() in self.word_list

    def is_anagram(self, word1, word2):
        """Checks if two words contain the exact same letters."""
        w1, w2 = word1.lower(), word2.lower()
        # Anagrams must have the same sorted characters but NOT be the same word
        return sorted(w1) == sorted(w2) and w1 != w2

    def get_anagrams(self, word):
        """Filters the word list for all valid anagrams."""
        word = word.lower()
        return [w for w in self.word_list if self.is_anagram(word, w)]
    
    #anagram.py
    from anagram_checker import AnagramChecker

def get_user_word():
    """Handles input and validation logic."""
    user_input = input("\nType a word (or 'EXIT' to quit): ").strip()
    
    if user_input.upper() == 'EXIT':
        return 'EXIT'
    
    # Validation: Only one word
    if len(user_input.split()) > 1:
        print("Error: Please enter only a single word.")
        return None
    
    # Validation: Only alphabetic characters
    if not user_input.isalpha():
        print("Error: Only alphabetic characters are allowed (no numbers/symbols).")
        return None
        
    return user_input

def main():
    checker = AnagramChecker() # Ensure your text file is in the same folder
    
    while True:
        print("\n--- ANAGRAM CHECKER ---")
        word = get_user_word()
        
        if word == 'EXIT':
            print("Goodbye!")
            break
        
        if word:
            if checker.is_valid_word(word):
                anagrams = checker.get_anagrams(word)
                
                # Formatted Output
                print(f'\nYOUR WORD: "{word.upper()}"')
                print("this is a valid English word.")
                
                if anagrams:
                    print(f"Anagrams for your word: {', '.join(anagrams)}.")
                else:
                    print("No anagrams found for this word.")
            else:
                print(f'\nYOUR WORD: "{word.upper()}"')
                print("Sorry, this is not a valid English word.")

if __name__ == "__main__":
    main()
    
