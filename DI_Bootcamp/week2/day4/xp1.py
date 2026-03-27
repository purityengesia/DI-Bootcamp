import random
import sys

def get_words_from_file(file_path):
    """Reads a file and returns a list of words."""
    try:
        with open(file_path, 'r') as f:
            content = f.read()
            # split() handles spaces and newlines automatically
            word_list = content.split()
            return word_list
    except FileNotFoundError:
        print(f"Error: The file at {file_path} was not found.")
        return []

def get_random_sentence(length):
    """Generates a random sentence from the word list."""
    words = get_words_from_file('sowpods.txt') # Ensure this filename matches yours
    
    if not words:
        return "Could not generate sentence: Word list is empty."
    
    # Select 'length' number of random words
    selected_words = [random.choice(words) for _ in range(length)]
    
    # Join into a string and lowercase it
    sentence = " ".join(selected_words).lower()
    return f"{sentence}."

def main():
    print("--- Welcome to the Random Sentence Generator ---")
    print("This program creates a random sentence based on a dictionary file.")
    
    try:
        user_input = input("How long should the sentence be? (Enter an integer 2-20): ")
        length = int(user_input)
        
        # Validation
        if 2 <= length <= 20:
            result = get_random_sentence(length)
            print(f"\nGenerated Sentence:\n{result}")
        else:
            print("Error: Please enter a number between 2 and 20.")
            
    except ValueError:
        print("Error: That's not a valid integer. Please restart and try again.")

if __name__ == "__main__":
    main()
    
#ex2
import json

sampleJson = """{ 
   "company":{ 
      "employee":{ 
         "name":"emma",
         "payable":{ 
            "salary":7000,
            "bonus":800
         }
      }
   }
}"""

# Step 1: Load the JSON string
data = json.loads(sampleJson)

# Step 2: Access the nested “salary” key
# We drill down through the keys: company -> employee -> payable -> salary
salary_value = data["company"]["employee"]["payable"]["salary"]
print(f"Current Salary: {salary_value}")

# Step 3: Add the “birth_date” key
# We target the 'employee' level specifically
data["company"]["employee"]["birth_date"] = "1992-05-14"

# Step 4: Save the JSON to a file
file_name = "modified_employee.json"
with open(file_name, "w") as json_file:
    # indent=4 makes the file human-readable
    json.dump(data, json_file, indent=4)

print(f"Success! Modified JSON saved to {file_name}")