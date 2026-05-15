// src/components/Gallery.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Gallery = () => {
  const { query } = useParams(); // Gets the category or search term from URL
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // REPLACE THIS WITH YOUR ACTUAL PEXELS API KEY
  const API_KEY = 'YOUR_PEXELS_API_KEY_HERE';

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        // Request 30 images per page
        const response = await axios.get(
          `https://api.pexels.com/v1/search?query=${query}&per_page=30&page=${page}`,
          {
            headers: { Authorization: API_KEY }
          }
        );
        setImages(response.data.photos);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
      setLoading(false);
    };

    fetchImages();
  }, [query, page]); // Re-fetch when query or page changes

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h2>Results for: "{query}"</h2>
      </div>

      {loading ? (
        <p className="loading-text">Loading beautiful images...</p>
      ) : (
        <>
          <div className="image-grid">
            {images.map((img) => (
              <div key={img.id} className="image-card">
                <img src={img.src.large} alt={img.alt} />
                <div className="image-overlay">
                  <p>Photographer: {img.photographer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bonus: Pagination Controls */}
          <div className="pagination">
            <button 
              disabled={page === 1} 
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className="page-btn"
            >
              Previous Page
            </button>
            <span className="page-indicator">Page {page}</span>
            <button 
              onClick={() => setPage((prev) => prev + 1)}
              className="page-btn"
            >
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Gallery;