#weather-logic.py
from pyowm import OWM
from datetime import datetime
import pytz

# Replace 'your-api-key' with your actual OpenWeatherMap API key
owm = OWM('your-api-key')
mgr = owm.weather_manager()

def get_weather_data(city_name):
    observation = mgr.weather_at_place(city_name)
    w = observation.weather
    
    # Get ID
    city_id = observation.location.id
    
    # Sunset/Sunrise (converted to local time)
    sunrise_unix = w.sunrise_time()
    sunset_unix = w.sunset_time()
    
    return {
        "temp": w.temperature('celsius'),
        "wind": w.wind(),
        "humidity": w.humidity,
        "sunrise": datetime.fromtimestamp(sunrise_unix).strftime('%H:%M'),
        "sunset": datetime.fromtimestamp(sunset_unix).strftime('%H:%M'),
        "id": city_id
    }
    
#2weather_gui.py
import matplotlib.pyplot as plt
from pyowm import OWM
from datetime import datetime

# Setup OWM
owm = OWM('your-api-key')
mgr = owm.weather_manager()

def init_plot():
    """Step 1: Initialize labels and title."""
    plt.ylabel('Humidity (%)', fontsize=12)
    plt.title('3-Day Humidity Forecast', fontsize=14)
    plt.ylim(0, 100) # Humidity is 0-100%

def write_humidity_on_bar_chart(bars):
    """Step 3: Display the % value on top of each bar."""
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2., height + 1,
                 f'{int(height)}%', ha='center', va='bottom')

def plot_humidity(city_name):
    """Step 2: Determine details of the bar chart."""
    forecast = mgr.forecast_at_place(city_name, '3h').forecast
    
    # Extracting data (limited to 8 intervals to represent roughly 24-48 hours)
    dates = []
    humidities = []
    
    for weather in forecast.get_weathers()[:8]: 
        # Format time to HH:MM
        time_str = datetime.fromtimestamp(weather.reference_time()).strftime('%H:%M')
        dates.append(time_str)
        humidities.append(weather.humidity)

    init_plot()
    
    # Create bars
    bars = plt.bar(dates, humidities, color='skyblue', edgecolor='navy')
    
    # Style and Annotate
    write_humidity_on_bar_chart(bars)
    plt.xticks(rotation=45)
    plt.tight_layout()
    
    plt.show()

if __name__ == "__main__":
    city = input("Enter city for humidity forecast: ")
    plot_humidity(city)