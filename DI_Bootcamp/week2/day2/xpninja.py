#implementation
import os
import time
import copy

class GameOfLife:
    def __init__(self, rows, cols, initial_state=None):
        self.rows = rows
        self.cols = cols
        # Initialize grid with zeros (dead)
        self.grid = [[0 for _ in range(cols)] for _ in range(rows)]
        
        if initial_state:
            for r, c in initial_state:
                if 0 <= r < rows and 0 <= c < cols:
                    self.grid[r][c] = 1

    def display(self):
        """Prints the grid to the console."""
        os.system('cls' if os.name == 'nt' else 'clear')
        for row in self.grid:
            # Using '█' for alive and '.' for dead
            print(" ".join(['█' if cell else '.' for cell in row]))
        print("\nPress Ctrl+C to stop.")

    def get_neighbors(self, r, c):
        """Counts alive neighbors in the 8 surrounding cells."""
        count = 0
        for i in range(-1, 2):
            for j in range(-1, 2):
                if i == 0 and j == 0:
                    continue
                
                neighbor_r, neighbor_c = r + i, c + j
                
                # Check borders
                if 0 <= neighbor_r < self.rows and 0 <= neighbor_c < self.cols:
                    count += self.grid[neighbor_r][neighbor_c]
        return count

    def next_generation(self):
        """Applies the 4 rules to create the next state."""
        new_grid = copy.deepcopy(self.grid)
        
        for r in range(self.rows):
            for c in range(self.cols):
                neighbors = self.get_neighbors(r, c)
                is_alive = self.grid[r][c]

                # Rule 1 & 3: Death by under/overpopulation
                if is_alive and (neighbors < 2 or neighbors > 3):
                    new_grid[r][c] = 0
                # Rule 4: Reproduction
                elif not is_alive and neighbors == 3:
                    new_grid[r][c] = 1
                # Rule 2: Lives on (implicitly handled by deepcopy)
                    
        self.grid = new_grid

    def run(self, generations=50, sleep_time=0.5):
        try:
            for _ in range(generations):
                self.display()
                self.next_generation()
                time.sleep(sleep_time)
        except KeyboardInterrupt:
            print("\nGame Stopped.")

# --- Initial States ---
# A "Glider" moves across the screen
glider = [(1, 2), (2, 3), (3, 1), (3, 2), (3, 3)]

# A "Blinker" oscillates
blinker = [(2, 1), (2, 2), (2, 3)]

# Start the game
game = GameOfLife(rows=15, cols=20, initial_state=glider)
# game.run()


