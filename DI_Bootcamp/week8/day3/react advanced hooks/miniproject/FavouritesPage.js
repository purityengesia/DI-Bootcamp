import React, { useContext } from 'react';
import { Container, ListGroup, Button, Badge } from 'react-bootstrap';
import { FavoritesContext } from './FavoritesContext';
import { Trash } from 'react-bootstrap-icons';

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <Container className="mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Favorite Cities</h2>
      
      {favorites.length === 0 ? (
        <p className="text-center text-muted">No favorite cities saved yet.</p>
      ) : (
        <ListGroup>
          {favorites.map((city, index) => (
            <ListGroup.Item 
              key={index} 
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{city.name}</strong> <Badge bg="secondary">{city.country}</Badge>
                <br />
                <small className="text-muted">{Math.round(city.temp)}°C - {city.description}</small>
              </div>
              
              <Button 
                variant="outline-danger" 
                size="sm"
                onClick={() => removeFavorite(city.name)}
              >
                <Trash size={16} />
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default FavoritesPage;