from anagram_checker import AnagramChecker

def main():
    # Initialize the checker (assuming your file is named 'sowpods.txt')
    checker = AnagramChecker('sowpods.txt')
    
    while True:
        print("\n--- ANAGRAM CHECKER ---")
        user_input = input("Enter a word (or type 'exit' to stop): ").strip()
        
        if user_input.lower() == 'exit':
            break

        # Validate input: No numbers or multiple words allowed
        if not user_input.isalpha() or " " in user_input:
            print("Error: Please enter a single, alphabetic word.")
            continue

        if checker.is_valid_word(user_input):
            found_anagrams = checker.get_anagrams(user_input)
            
            print(f"\nYOUR WORD: '{user_input.upper()}'")
            print("this is a valid English word.")
            
            if found_anagrams:
                # Join the list into a clean string
                print(f"Anagrams for your word: {', '.join(found_anagrams)}")
            else:
                print("No anagrams found for this word.")
        else:
            print(f"'{user_input}' is not a valid word in our dictionary.")

if __name__ == "__main__":
    main()