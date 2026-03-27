import json

class MenuManager:
    def __init__(self):
        """Loads the menu from the JSON file into a variable."""
        try:
            with open('restaurant_menu.json', 'r') as file:
                self.menu = json.load(file)
        except FileNotFoundError:
            self.menu = {"items": []}

    def add_item(self, name, price):
        """Adds a new dictionary to the items list."""
        new_item = {"name": name, "price": float(price)}
        self.menu["items"].append(new_item)

    def remove_item(self, name):
        """Removes an item by name and returns success status."""
        for i, item in enumerate(self.menu["items"]):
            if item["name"].lower() == name.lower():
                del self.menu["items"][i]
                return True
        return False

    def save_to_file(self):
        """Writes the current state of the menu back to the JSON file."""
        with open('restaurant_menu.json', 'w') as file:
            json.dump(self.menu, file, indent=4)
            
#menu editor

def load_manager():
    return MenuManager()

def show_restaurant_menu(manager):
    print("\n--- RESTAURANT MENU ---")
    for item in manager.menu["items"]:
        print(f"- {item['name']}: ${item['price']}")

def add_item_to_menu(manager):
    name = input("Enter item name: ")
    price = input("Enter item price: ")
    manager.add_item(name, price)
    print(f"'{name}' was added successfully.")

def remove_item_from_menu(manager):
    name = input("Enter item name to remove: ")
    if manager.remove_item(name):
        print(f"'{name}' was deleted successfully.")
    else:
        print(f"Error: '{name}' was not found in the menu.")

def show_user_menu():
    manager = load_manager()
    while True:
        print("\nManager Menu: (V)iew, (A)dd, (D)elete, (E)xit")
        choice = input("Choice: ").upper()

        if choice == 'V':
            show_restaurant_menu(manager)
        elif choice == 'A':
            add_item_to_menu(manager)
        elif choice == 'D':
            remove_item_from_menu(manager)
        elif choice == 'E':
            manager.save_to_file()
            print("Menu saved. Goodbye!")
            break
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    show_user_menu()
    
    #ex2
    import requests

def fetch_hilarious_gifs():
    api_key = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
    query = "hilarious"
    rating = "g"
    limit = 10  # Step 5: Only return the first 10 gifs
    
    url = f"https://api.giphy.com/v1/gifs/search?api_key={api_key}&q={query}&rating={rating}&limit={limit}"
    
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()['data']
        
        # Step 2: Only return gifs with height > 100
        # Note: We check 'images']['original']['height']
        filtered_gifs = [gif for gif in data if int(gif['images']['original'].get('height', 0)) > 100]
        
        print(f"Number of filtered gifs: {len(filtered_gifs)}")
        return filtered_gifs
    else:
        print("Failed to connect to Giphy.")
        return []

fetch_hilarious_gifs()


#ex3
import requests

def search_giphy():
    api_key = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
    user_query = input("Search for a GIF: ").strip()
    
    # Search Request
    search_url = f"https://api.giphy.com/v1/gifs/search?api_key={api_key}&q={user_query}&limit=5"
    response = requests.get(search_url).json()
    
    # Check if we got results
    if response['data']:
        print(f"Found {len(response['data'])} gifs for '{user_query}':")
        for gif in response['data']:
            print(gif['url'])
    else:
        # Fallback to Trending
        print(f"Could not find '{user_query}'. Showing trending gifs instead:")
        trending_url = f"https://api.giphy.com/v1/gifs/trending?api_key={api_key}&limit=5"
        trending_response = requests.get(trending_url).json()
        
        for gif in trending_response['data']:
            print(gif['url'])

if __name__ == "__main__":
    search_giphy()