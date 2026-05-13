import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from "./ErrorBoundary"; // Import the ErrorBoundary

// Functional Components
const HomeScreen = () => <h1>home</h1>;

const ProfileScreen = () => <h1>profile</h1>;

const ShopScreen = () => {
  // This component throws an error
  throw new Error("Shop crashed!");
};

function App() {
  return (
    <BrowserRouter>
      {/* Bootstrap Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">MyApp</NavLink>
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/profile">Profile</NavLink>
            <NavLink className="nav-link" to="/shop">Shop</NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route 
          path="/" 
          element={
            <ErrorBoundary>
              <HomeScreen />
            </ErrorBoundary>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ErrorBoundary>
              <ProfileScreen />
            </ErrorBoundary>
          } 
        />
        <Route 
          path="/shop" 
          element={
            <ErrorBoundary>
              <ShopScreen />
            </ErrorBoundary>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;