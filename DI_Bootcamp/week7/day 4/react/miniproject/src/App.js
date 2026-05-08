// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Header from './Header';
import FeatureCard from './FeatureCard';
import Contact from './Contact';

function App() {
  return (
    <div className="App">
      <Header />

      {/* Hero Section */}
      <header className="bg-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold display-4">Welcome to MyBrand</h1>
          <p className="lead text-muted mb-4">
            The best solution for your business needs using React and Bootstrap.
          </p>
          <button className="btn btn-primary btn-lg">Get Started</button>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Our Features</h2>
            <div className="mx-auto bg-primary" style={{height: '3px', width: '60px'}}></div>
          </div>
          
          <div className="row">
            {/* Reusing the FeatureCard Component 3 times */}
            <FeatureCard 
              iconClass="fas fa-bolt"
              title="Fast Performance"
              description="Optimized for speed to ensure your users get the best experience."
            />
            <FeatureCard 
              iconClass="fas fa-layer-group"
              title="Fully Responsive"
              description="Looks great on mobile, tablet, and desktop screens automatically."
            />
            <FeatureCard 
              iconClass="fas fa-headset"
              title="24/7 Support"
              description="Our dedicated team is always here to help you solve any issues."
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Simple Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <small>&copy; 2023 MyBrand. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}

export default App;