#text class
import collections

class Text:
    def __init__(self, text):
        self.text = text

    def word_frequency(self, word):
        """Counts occurrences of a specific word."""
        words = self.text.lower().split()
        count = words.count(word.lower())
        return count if count > 0 else f"Word '{word}' not found."

    def most_common_word(self):
        """Returns the word that appears most often."""
        words = self.text.lower().split()
        if not words:
            return None
        # Using Counter is the most efficient way to track frequencies
        counts = collections.Counter(words)
        return counts.most_common(1)[0][0]

    def unique_words(self):
        """Returns a list of all unique words using a set."""
        words = self.text.lower().split()
        return list(set(words))

    @classmethod
    def from_file(cls, file_path):
        """Factory method to create a Text instance from a file."""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            return cls(content)
        except FileNotFoundError:
            print(f"Error: {file_path} not found.")
            return cls("")
        
        
    #text modification
    import string
import re

class TextModification(Text):
    def remove_punctuation(self):
        """Removes all standard punctuation (e.g., !, ., ?)."""
        # Create a translation table that maps every punctuation character to None
        translator = str.maketrans('', '', string.punctuation)
        self.text = self.text.translate(translator)
        return self.text

    def remove_stop_words(self):
        """Filters out common English 'stop words'."""
        stop_words = {
            "a", "an", "the", "and", "or", "but", "if", "then", "else", 
            "is", "are", "was", "were", "be", "been", "being", "in", 
            "on", "at", "to", "for", "with", "of", "by"
        }
        words = self.text.split()
        filtered_words = [w for w in words if w.lower() not in stop_words]
        self.text = " ".join(filtered_words)
        return self.text

    def remove_special_characters(self):
        """Removes anything that isn't a letter, number, or space."""
        # [^a-zA-Z0-9\s] means: match anything NOT a-z, A-Z, 0-9, or whitespace
        self.text = re.sub(r'[^a-zA-Z0-9\s]', '', self.text)
        return self.text
    #ow it works
    # 1. Create a modified text object
my_text = TextModification("Hello! This is a simple, yet special, example text.")

# 2. Clean the text
my_text.remove_punctuation()
my_text.remove_stop_words()

# 3. Analyze the cleaned version
print(f"Cleaned Text: {my_text.text}")
print(f"Most common word: {my_text.most_common_word()}")

    