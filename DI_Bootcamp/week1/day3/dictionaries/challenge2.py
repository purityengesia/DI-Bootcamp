def caesar_cipher():
    print("--- Caesar Cipher Tool ---")
    choice = input("Do you want to (E)ncrypt or (D)ecrypt? ").strip().upper()
    message = input("Enter your message: ")
    
    # Ensure the shift is a valid number
    try:
        shift = int(input("Enter the shift number: "))
    except ValueError:
        print("Invalid shift. Please enter a number.")
        return

    # If decrypting, we just move the shift in the opposite direction
    if choice == 'D':
        shift = -shift

    result = ""

    for char in message:
        # Check if character is a letter
        if char.isalpha():
            # Determine if it's uppercase (65) or lowercase (97) in ASCII
            start = ord('A') if char.isupper() else ord('a')
            
            # 1. Convert char to 0-25 range (char_code - start)
            # 2. Apply shift
            # 3. Use modulo % 26 to wrap around (Z -> A)
            # 4. Convert back to original ASCII range
            new_pos = (ord(char) - start + shift) % 26
            result += chr(new_pos + start)
        else:
            # If it's a space or punctuation, keep it as is
            result += char

    print(f"\nYour {'encrypted' if choice == 'E' else 'decrypted'} message is:")
    print(f"-> {result}")

# Run the program
caesar_cipher()