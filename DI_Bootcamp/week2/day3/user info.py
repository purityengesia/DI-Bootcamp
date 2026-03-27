# Initialize an empty list to store the user data
user_data = []

print("Please enter the details (Name, Age, Score) 5 times:")

# 1. Collect inputs 5 times
for i in range(5):
    user_input = input(f"{i+1}. Enter Name, Age, Score (separated by commas): ")
    # Split the string and strip whitespace, then convert to a tuple
    name, age, score = [item.strip() for item in user_input.split(',')]
    user_data.append((name, age, score))

# 2. Sort the list using a lambda function
# The priority is Name (index 0) > Age (index 1) > Score (index 2)
user_data.sort(key=lambda x: (x[0], int(x[1]), int(x[2])))

# 3. Print the final result
print("\nSorted List:")
print(user_data)