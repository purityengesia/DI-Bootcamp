import React, { useState } from 'react';
import { Form, Button, Card, Container, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { WiDaySunny, WiRain, WiCloudy, WiSnow } from 'react-icons/wi';
import { FavoritesContext } from './FavoritesContext';
import { useContext } from 'react';

// Replace with your actual OpenWeatherMap API Key
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; 

const WeatherPage = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addFavorite, favorites } = useContext(FavoritesContext);

  const fetchWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToFavorites = () => {
    if (weather) {
      addFavorite({
        name: weather.name,
        temp: weather.main.temp,
        description: weather.weather[0].description,
        country: weather.sys.country
      });
      alert(`${weather.name} added to favorites!`);
    }
  };

  const isFavorite = weather ? favorites.some(f => f.name === weather.name) : false;

  // Helper to choose icon based on weather condition
  const getWeatherIcon = (condition) => {
    if (condition.includes('clear')) return <WiDaySunny size={64} color="#f39c12" />;
    if (condition.includes('rain')) return <WiRain size={64} color="#3498db" />;
    if (condition.includes('cloud')) return <WiCloudy size={64} color="#95a5a6" />;
    if (condition.includes('snow')) return <WiSnow size={64} color="#ecf0f1" />;
    return <WiDaySunny size={64} color="#f39c12" />;
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">Check Weather</h2>
      
      <Form onSubmit={fetchWeather} className="d-flex gap-2 mb-4">
        <Form.Control
          type="text"
          placeholder="Enter city name (e.g., London)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Search'}
        </Button>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      {weather && (
        <Card className="text-center p-4 shadow-sm">
          <Card.Body>
            <Card.Title>
              {weather.name}, {weather.sys.country}
            </Card.Title>
            <div className="my-3">{getWeatherIcon(weather.weather[0].main)}</div>
            <Card.Text as="h2">{Math.round(weather.main.temp)}°C</Card.Text>
            <Card.Text className="text-capitalize text-muted">
              {weather.weather[0].description}
            </Card.Text>
            
            <Button 
              variant={isFavorite ? "secondary" : "outline-danger"} 
              onClick={handleSaveToFavorites}
              disabled={isFavorite}
            >
              {isFavorite ? 'Saved to Favorites' : '♥ Add to Favorites'}
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default WeatherPage;