# 1. Insert at index
my_list = [10, 20, 30]
my_list.insert(1, 15) # Inserts 15 at index 1

# 2. Count spaces
text = "Hello World From Python"
spaces = text.count(" ")

# 3. Case counter
def case_counter(s):
    upper = sum(1 for char in s if char.isupper())
    lower = sum(1 for char in s if char.islower())
    return f"Upper: {upper}, Lower: {lower}"

# 4. Sum without sum()
def my_sum(arr):
    total = 0
    for num in arr:
        total += num
    return total

# 5. Max without max()
def find_max(arr):
    highest = arr[0]
    for num in arr:
        if num > highest:
            highest = num
    return highest

# 6. Factorial (Recursion)
def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)

# 7. Count element without .count()
def list_count(arr, target):
    return sum(1 for item in arr if item == target)

# 8. L2 Norm
def norm(arr):
    # Square root of the sum of squares
    return (sum(x**2 for x in arr))**0.5

# 9. Monotonic Check
def is_mono(arr):
    return (arr == sorted(arr) or arr == sorted(arr, reverse=True))

# 10. Longest Word
def longest_word(words):
    print(max(words, key=len))

# 11. Type Separator
def separate_types(mixed_list):
    ints = [x for x in mixed_list if isinstance(x, int)]
    strs = [x for x in mixed_list if isinstance(x, str)]
    return ints, strs

# 12. Palindrome
def is_palindrome(s):
    clean_s = s.lower()
    return clean_s == clean_s[::-1]

# 13. Words longer than k
def sum_over_k(sentence, k):
    words = sentence.split()
    return sum(1 for word in words if len(word) > k)

# 14. Dictionary Average
def dict_avg(d):
    return sum(d.values()) / len(d)

# 15. Common Divisors
def common_div(a, b):
    limit = min(a, b)
    return [i for i in range(2, limit + 1) if a % i == 0 and b % i == 0]

# 16. Prime Test
def is_prime(n):
    if n < 2: return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0: return False
    return True

# 17. Even index AND Even value
def weird_print(arr):
    return [val for idx, val in enumerate(arr) if idx % 2 == 0 and val % 2 == 0]

# 18. Undefined Keyword Arguments (**kwargs)
def type_count(**kwargs):
    counts = {}
    for val in kwargs.values():
        t_name = type(val).__name__
        counts[t_name] = counts.get(t_name, 0) + 1
    return ", ".join([f"{k}: {v}" for k, v in counts.items()])

# 19. Custom Split
def my_split(s, delimiter=" "):
    result = []
    temp = ""
    for char in s:
        if char == delimiter:
            result.append(temp)
            temp = ""
        else:
            temp += char
    result.append(temp)
    return result

# 20. Password Masker
def mask_password(s):
    return "*" * len(s)