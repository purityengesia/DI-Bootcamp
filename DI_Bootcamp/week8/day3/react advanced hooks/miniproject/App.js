import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FavoritesProvider } from './FavoritesContext';
import WeatherPage from './WeatherPage';
import FavoritesPage from './FavoritesPage';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="min-vh-100 d-flex flex-column">
          <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
              <Navbar.Brand as={Link} to="/">Weather App</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={NavLink} to="/" end>Weather Search</Nav.Link>
                  <Nav.Link as={NavLink} to="/favorites">Favorites</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<WeatherPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </main>
          
          <footer className="bg-light p-3 text-center mt-auto">
            <small>&copy; 2023 Herolo Assignment</small>
          </footer>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;