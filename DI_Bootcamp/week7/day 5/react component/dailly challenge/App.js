import React, { useState } from 'react';
import './App.css'; // Assuming you place CSS in a separate file

function App() {
  // Step 1: Create state with the array of objects
  const [languages, setLanguages] = useState([
    { name: "Php", votes: 0 },
    { name: "Python", votes: 0 },
    { name: "JavaSript", votes: 0 },
    { name: "Java", votes: 0 }
  ]);

  // Step 2: Function to increase votes
  // We use the index to identify which language was clicked
  const vote = (index) => {
    // Create a copy of the array to ensure immutability
    const updatedLanguages = languages.map((lang, i) => {
      // If the current index matches the clicked index, increment votes
      if (i === index) {
        return { ...lang, votes: lang.votes + 1 };
      }
      // Otherwise, return the language object unchanged
      return lang;
    });

    // Update the state with the new array
    setLanguages(updatedLanguages);
  };

  return (
    <div className="app-container">
      <h1>Vote for your favorite language!</h1>
      
      <div className="languages-list">
        {languages.map((lang, index) => (
          <div key={index} className="language-card">
            <div className="info">
              <span className="lang-name">{lang.name}</span>
              <span className="vote-count">{lang.votes} votes</span>
            </div>
            
            {/* Step 2 (continued): Attach the click handler */}
            <button onClick={() => vote(index)} className="vote-btn">
              Vote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;