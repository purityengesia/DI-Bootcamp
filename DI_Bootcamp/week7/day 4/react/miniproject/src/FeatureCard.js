// src/FeatureCard.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function FeatureCard({ iconClass, title, description }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm p-3 text-center">
        <div className="card-body">
          <div className="mb-3">
            {/* Font Awesome Icon */}
            <i className={`${iconClass} fa-3x text-primary`}></i>
          </div>
          <h5 className="card-title fw-bold">{title}</h5>
          <p className="card-text text-muted">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default FeatureCard;