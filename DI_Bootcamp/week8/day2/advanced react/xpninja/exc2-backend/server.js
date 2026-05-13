const express = require('express');
const app = express();
const port = 3002; // Using 3002 to avoid conflict with React (3000) and Ex 1 (3001)

// Data variable
const customers = [
  {"id":1,"firstName":"John","lastName":"Doe"},
  {"id":2,"firstName":"Jane","lastName":"Doe"},
  {"id":3,"firstName":"Ziv","lastName":"Chen"},
  {"id":4,"firstName":"Isaac","lastName":"Groisman"},
  {"id":5,"firstName":"Avner","lastName":"Maman"},
  {"id":6,"firstName":"Megan","lastName":"Dreyfuss"}
];

// GET Route
app.get('/api/customers/', (req, res) => {
  res.json(customers);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});