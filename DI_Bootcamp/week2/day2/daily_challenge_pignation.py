#pagination class
import math

class Pagination:
    def __init__(self, items=None, page_size=10):
        self.items = items if items is not None else []
        self.page_size = int(page_size)
        self.current_idx = 0  # Internal 0-based indexing
        self.total_pages = math.ceil(len(self.items) / self.page_size)

    def get_visible_items(self):
        """Returns the slice of items for the current page."""
        start = self.current_idx * self.page_size
        end = start + self.page_size
        return self.items[start:end]

    def go_to_page(self, page_num):
        """Goes to page_num (1-based index)."""
        # Validate range
        if page_num < 1 or page_num > self.total_pages:
            raise ValueError(f"Page {page_num} is out of range. Total pages: {self.total_pages}")
        
        self.current_idx = page_num - 1
        return self

    def first_page(self):
        self.current_idx = 0
        return self

    def last_page(self):
        self.current_idx = self.total_pages - 1
        return self

    def next_page(self):
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self

    def previous_page(self):
        if self.current_idx > 0:
            self.current_idx -= 1
        return self

    def __str__(self):
        """Bonus: Displays items on current page, each on a new line."""
        visible = self.get_visible_items()
        return "\n".join(str(item) for item in visible)
    # Testing the Pagination class
    alphabetList = list("abcdefghijklmnopqrstuvwxyz")
p = Pagination(alphabetList, 4)

# Test basic visibility
print(f"Initial (Page 1): {p.get_visible_items()}") 
# Output: ['a', 'b', 'c', 'd']

# Test next page
p.next_page()
print(f"After next_page (Page 2): {p.get_visible_items()}") 
# Output: ['e', 'f', 'g', 'h']

# Test last page
p.last_page()
print(f"Last page: {p.get_visible_items()}") 
# Output: ['y', 'z']

# Test Method Chaining (The Bonus!)
# We go to the first page, then click 'next' three times
chained_result = p.first_page().next_page().next_page().next_page().get_visible_items()
print(f"Chained result: {chained_result}") 
# Output: ['m', 'n', 'o', 'p']

# Test ValueError
try:
    p.go_to_page(10) # Alphabet has 26 letters, size 4 = 7 pages. 10 is too high.
except ValueError as e:
    print(f"Caught expected error: {e}")
    