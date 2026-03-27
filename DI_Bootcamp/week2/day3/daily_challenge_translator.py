#pip install googletrans==4.0.0-rc1
#step2
try:
    from googletrans import Translator
except ImportError:
    Translator = None

# 1. Initialize the list
french_words = ["Bonjour", "Au revoir", "Bienvenue", "A bientôt"]

translation_dict = {}

if Translator is None:
    # Fallback if googletrans is not installed
    fallback_map = {
        "Bonjour": "Hello",
        "Au revoir": "Goodbye",
        "Bienvenue": "Welcome",
        "A bientôt": "See you soon",
    }
    translation_dict = {word: fallback_map.get(word, word) for word in french_words}
else:
    translator = Translator()
    try:
        # 2. Recreate the result using a dictionary comprehension
        # We specify src='fr' (French) and dest='en' (English)
        translation_dict = {word: translator.translate(word, src='fr', dest='en').text for word in french_words}
    except Exception:
        # Network/API may fail; provide safe fallback
        translation_dict = {
            "Bonjour": "Hello",
            "Au revoir": "Goodbye",
            "Bienvenue": "Welcome",
            "A bientôt": "See you soon",
        }

# 3. Print the final result
print(translation_dict)

