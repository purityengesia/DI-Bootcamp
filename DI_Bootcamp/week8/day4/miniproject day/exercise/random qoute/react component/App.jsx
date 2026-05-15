import { useState } from 'react';
import './App.css';

// Sample data (You can replace this with the data from your downloaded file)
const quotesData = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
  { text: "Whether you think you can or you think you can’t, you’re right.", author: "Henry Ford" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas A. Edison" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" }
];

function App() {
  // State for the current quote object
  const [quote, setQuote] = useState(quotesData[0]);
  
  // State for the colors
  const [bgColor, setBgColor] = useState('#f0f0f0');
  const [textColor, setTextColor] = useState('#333333');
  const [btnColor, setBtnColor] = useState('#007bff');

  // Helper function to generate a random Hex color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleNewQuote = () => {
    // 1. Generate a random index
    let randomIndex = Math.floor(Math.random() * quotesData.length);
    let newQuote = quotesData[randomIndex];

    // 2. Make sure we don't display the same quote twice in a row
    while (newQuote.text === quote.text) {
      randomIndex = Math.floor(Math.random() * quotesData.length);
      newQuote = quotesData[randomIndex];
    }

    // 3. Generate new random colors
    const newBgColor = getRandomColor();
    const newTextColor = getRandomColor();
    const newBtnColor = getRandomColor();

    // 4. Update State
    setQuote(newQuote);
    setBgColor(newBgColor);
    setTextColor(newTextColor);
    setBtnColor(newBtnColor);
  };

  return (
    // Apply the background color to the container
    <div className="app-container" style={{ backgroundColor: bgColor }}>
      <div className="quote-box">
        {/* Apply the text color to the header */}
        <h1 className="quote-text" style={{ color: textColor }}>
          "{quote.text}"
        </h1>
        <p className="quote-author">- {quote.author}</p>
        
        {/* Apply the button color */}
        <button 
          className="new-quote-btn" 
          style={{ backgroundColor: btnColor }} 
          onClick={handleNewQuote}
        >
          New Quote
        </button>
      </div>
    </div>
  );
}

export default App;