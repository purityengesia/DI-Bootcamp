#Write a Python program that takes a single string of words as input, where the words are separated by commas (e.g., ‘apple,banana,cherry’). The program should output these words sorted in alphabetical order, with the sorted words also separated by commas.
input_string = input("Enter words separated by commas: ")
words = input_string.split(',')
sorted_words = sorted(words)
output_string = ','.join(sorted_words)
print(output_string)

#Write a function that takes a sentence as input and returns the longest word in the sentence. If there are multiple longest words, return the first one encountered. Characters like apostrophes, commas, and periods should be considered part of the word.

def longest_word(sentence):
    words = sentence.split()
    longest = ""
    for word in words:
        if len(word) > len(longest):
            longest = word
    return longest
sentence = input("Enter a sentence: ")
print("The longest word is:", longest_word(sentence))
    