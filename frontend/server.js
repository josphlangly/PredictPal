const express = require('express');
const cors = require('cors'); // Move this up here
const app = express();
const port = 3001;

// Enable CORS before defining routes
app.use(cors());

// Sample sales data
const salesData = [
  { date: '2024-09-01', sales: 120 },
  { date: '2024-09-02', sales: 80 },
  { date: '2024-09-03', sales: 140 },
  { date: '2024-09-04', sales: 90 },
];

// API route to get sales data
app.get('/api/sales', (req, res) => {
  res.json(salesData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
