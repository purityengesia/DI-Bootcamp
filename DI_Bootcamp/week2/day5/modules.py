import requests
import time

def measure_load_time(url):
    """
    Measures the time it takes to get a response from a URL.
    """
    # Ensure the URL starts with http
    if not url.startswith('http'):
        url = 'https://' + url
        
    try:
        # We use a timeout to ensure the program doesn't hang 
        # and a headers dict to mimic a real browser
        headers = {'User-Agent': 'Mozilla/5.0'}
        
        # Start manual timer
        start_time = time.time()
        
        response = requests.get(url, headers=headers, timeout=10)
        
        # End manual timer
        end_time = time.time()
        
        # Calculate total duration
        total_time = end_time - start_time
        
        # Pythons requests library also has a built-in 'elapsed' attribute
        # which measures the internal time for the request to be fulfilled
        api_measured_time = response.elapsed.total_seconds()
        
        print(f"Site: {url}")
        print(f"Status Code: {response.status_code}")
        print(f"Total Load Time (Manual): {total_time:.4f} seconds")
        print(f"Server Response Time (Elapsed): {api_measured_time:.4f} seconds")
        print("-" * 30)
        
        return total_time

    except requests.exceptions.RequestException as e:
        print(f"Error connecting to {url}: {e}")
        return None

# --- Testing with multiple sites ---
sites = [
    "google.com",
    "github.com",
    "wikipedia.org"
]

print("Starting Web Speed Test...\n")
for site in sites:
    measure_load_time(site)