#game
import random

class Game:
    def get_user_item(self):
        """Asks the user for their move and validates it."""
        while True:
            user_choice = input("Select an item (rock/paper/scissors): ").lower().strip()
            if user_choice in ["rock", "paper", "scissors"]:
                return user_choice
            print("Invalid input. Please choose rock, paper, or scissors.")

    def get_computer_item(self):
        """Randomly selects an item for the computer."""
        return random.choice(["rock", "paper", "scissors"])

    def get_game_result(self, user_item, computer_item):
        """Determines if the user won, lost, or drew."""
        if user_item == computer_item:
            return "draw"
        
        # Define winning conditions for the user
        win_conditions = {
            "rock": "scissors",
            "paper": "rock",
            "scissors": "paper"
        }
        
        if win_conditions[user_item] == computer_item:
            return "win"
        else:
            return "loss"

    def play(self):
        """Executes one round and returns the result."""
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        result = self.get_game_result(user_item, computer_item)
        
        print(f"\nYou selected: {user_item.capitalize()}.")
        print(f"Computer selected: {computer_item.capitalize()}.")
        
        if result == "win":
            print("You won!")
        elif result == "loss":
            print("You lost!")
        else:
            print("It's a draw!")
            
        return result
    
    #2.rock-paper-scissor.py
    from game import Game

def get_user_menu_choice():
    """Displays the main menu and validates selection."""
    print("\n--- Main Menu ---")
    print("(1) Play a new game")
    print("(2) Show scores")
    print("(3) Quit")
    
    while True:
        choice = input("Enter your choice (1-3): ").strip()
        if choice in ["1", "2", "3"]:
            return choice
        print("Invalid choice. Please enter 1, 2, or 3.")

def print_results(results):
    """Formats and displays the final score summary."""
    print("\n--- Game Summary ---")
    print(f"Wins:   {results['win']}")
    print(f"Losses: {results['loss']}")
    print(f"Draws:  {results['draw']}")
    print("\nThank you for playing!")

def main():
    # Initialize results dictionary
    results = {"win": 0, "loss": 0, "draw": 0}
    
    while True:
        choice = get_user_menu_choice()
        
        if choice == "1":
            # Start a new game
            new_game = Game()
            outcome = new_game.play()
            results[outcome] += 1
            
        elif choice == "2":
            # Print current scores without exiting
            print(f"\nCurrent Scoreboard: {results['win']} Wins, {results['loss']} Losses, {results['draw']} Draws")
            
        elif choice == "3":
            # Show summary and exit
            print_results(results)
            break

if __name__ == "__main__":
    main()