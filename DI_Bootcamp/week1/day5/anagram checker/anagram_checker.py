class AnagramChecker:
    def __init__(self, file_path):
        # Step 1: Load words into a set for fast lookup
        with open(file_path, 'r') as f:
            self.word_list = {word.strip().lower() for word in f}

    def is_valid_word(self, word):
        # Step 2: Case-insensitive check
        return word.lower() in self.word_list

    def is_anagram(self, word1, word2):
        # Step 3: Sort both words and compare the lists of letters
        # "listen" -> ['e', 'i', 'l', 'n', 's', 't']
        # "silent" -> ['e', 'i', 'l', 'n', 's', 't']
        w1 = word1.lower()
        w2 = word2.lower()
        return sorted(w1) == sorted(w2) and w1 != w2

    def get_anagrams(self, word):
        # Step 4: Find all anagrams in the master list
        word = word.lower()
        return [w for w in self.word_list if self.is_anagram(word, w)]