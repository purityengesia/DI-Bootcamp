# Step 1: Representing the Game Board
def create_board():
    return [[" " for _ in range(3)] for _ in range(3)]

# Step 2: Displaying the Game Board
def display_board(board):
    print("\n")
    for i, row in enumerate(board):
        print(" " + " | ".join(row))
        if i < 2:
            print("---+" * 2 + "---")
    print("\n")

# Step 3: Getting Player Input
def player_input(player, board):
    while True:
        try:
            move = input(f"Player {player}, enter row and col (0-2) separated by space: ").split()
            row, col = int(move[0]), int(move[1])
            
            if board[row][col] == " ":
                return row, col
            else:
                print("That square is already taken! Try again.")
        except (ValueError, IndexError):
            print("Invalid input. Enter two numbers between 0 and 2 (e.g., '0 1').")

# Step 4: Checking for a Winner
def check_win(board, player):
    # Check rows and columns
    for i in range(3):
        if all(board[i][j] == player for j in range(3)): return True # Horizontal
        if all(board[j][i] == player for j in range(3)): return True # Vertical
    
    # Check diagonals
    if all(board[i][i] == player for i in range(3)): return True
    if all(board[i][2-i] == player for i in range(3)): return True
    
    return False

# Step 5: Checking for a Tie
def check_tie(board):
    return all(cell != " " for row in board for cell in row)

# Step 6: The Main Game Loop
def play():
    board = create_board()
    current_player = "X"
    
    print("Welcome to Tic Tac Toe!")
    
    while True:
        display_board(board)
        row, col = player_input(current_player, board)
        board[row][col] = current_player
        
        if check_win(board, current_player):
            display_board(board)
            print(f"Congratulations! Player {current_player} wins!")
            break
            
        if check_tie(board):
            display_board(board)
            print("It's a tie!")
            break
            
        # Switch players
        current_player = "O" if current_player == "X" else "X"

if __name__ == "__main__":
    play()