// src/components/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/gallery/${searchTerm}`);
    }
  };

  const categories = [
    { name: 'Mountain', img: 'https://images.pexels.com/photos/1786554/pexels-photo-1786554.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Beaches', img: 'https://images.pexels.com/photos/1470062/pexels-photo-1470062.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Birds', img: 'https://images.pexels.com/photos/164615/pexels-photo-164615.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Food', img: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600' },
  ];

  return (
    <div className="home-container">
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for images (e.g., Cats, Cars)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
      </div>

      <h2>Explore Categories</h2>
      <div className="categories-grid">
        {categories.map((cat) => (
          <div 
            key={cat.name} 
            className="category-card"
            onClick={() => navigate(`/gallery/${cat.name}`)}
          >
            <img src={cat.img} alt={cat.name} />
            <div className="category-overlay">
              <h3>{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;