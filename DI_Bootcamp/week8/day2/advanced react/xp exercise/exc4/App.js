import React, { useState } from 'react';

function App() {
  const [responseMessage, setResponseMessage] = useState("");

  const postData = async () => {
    const url = "YOUR_UNIQUE_WEBHOOK_URL"; // Paste your Webhook URL here
    
    const payload = {
      key1: 'myusername',
      email: 'mymail@gmail.com',
      name: 'Isaac',
      lastname: 'Doe',
      age: 27
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log("Response from server:", data);
      setResponseMessage("Check console for response!");
      
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h1>Post Data Exercise</h1>
      <button onClick={postData} className="btn btn-success btn-lg">
        Send Data
      </button>
      <p className="mt-3 text-muted">{responseMessage}</p>
    </div>
  );
}

export default App;