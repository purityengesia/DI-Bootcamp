const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware to allow Cross-Origin requests and parse JSON
app.use(cors());
app.use(express.json());

// PART I: GET Request
app.get('/api/hello', (req, res) => {
  res.send('Hello From Express');
});

// PART II: POST Request
app.post('/api/world', (req, res) => {
  console.log(req.body); // Instruction: Console log the request body
  
  // Retrieve the input value from the body (assuming the client sends { "post": "value" })
  const inputValue = req.body.post;

  res.send(`I received your POST request. This is what you sent me: ${inputValue}`);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));