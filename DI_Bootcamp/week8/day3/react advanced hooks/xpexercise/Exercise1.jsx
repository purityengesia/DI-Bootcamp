import { createContext, useState, useContext } from 'react';

// 1. Create the Context
const ThemeContext = createContext();

// 2. Create a custom hook for easy access (optional but recommended)
const useTheme = () => useContext(ThemeContext);

// 3. Create Components that use the Context

// The Navbar contains the toggle button
const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav style={{ 
      padding: '1rem', 
      background: theme === 'light' ? '#ddd' : '#333',
      color: theme === 'light' ? '#000' : '#fff',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h3>My App</h3>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </nav>
  );
};

// The Content area reflects the theme background
const Content = () => {
  const { theme } = useTheme();

  return (
    <main style={{
      padding: '2rem',
      background: theme === 'light' ? '#fff' : '#222',
      color: theme === 'light' ? '#000' : '#fff',
      minHeight: '80vh',
      textAlign: 'center'
    }}>
      <h1>Hello, World!</h1>
      <p>Current theme is: <strong>{theme}</strong></p>
    </main>
  );
};

// 4. Main App Component (The Provider)
const Exercise1 = () => {
  const [theme, setTheme] = useState('light');

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    // Provide the theme value and toggle function to all children
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app">
        <Navbar />
        <Content />
      </div>
    </ThemeContext.Provider>
  );
};

export default Exercise1;
