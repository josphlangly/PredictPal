import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
  const [sales, setSales] = useState([]);
  const [predictedSales, setPredictedSales] = useState([]);

  useEffect(() => {
    // Fetch sales data from the backend
    fetch('https://predictpal.onrender.com')
      .then((response) => response.json())
      .then((data) => {
        setSales(data);
        calculateForecast(data); // Call the function to calculate the forecast
      });
  }, []);

  // Function to calculate the moving average forecast
  const calculateForecast = (data) => {
    const forecastDays = 3; // We will forecast for the next 3 days
    let totalSales = 0;

    // Get the last 3 days of sales data
    const lastThreeDays = data.slice(-3); // Slicing the last 3 sales entries
    lastThreeDays.forEach((day) => {
      totalSales += day.sales; // Summing the sales of the last 3 days
    });

    const avgSales = totalSales / lastThreeDays.length; // Calculating the moving average

    // Create predicted sales for the next forecastDays
    const futureSales = [];
    for (let i = 1; i <= forecastDays; i++) {
      futureSales.push({
        date: `2024-09-0${data.length + i}`, // Dummy future dates (you can adjust this)
        sales: avgSales,
      });
    }

    setPredictedSales(futureSales); // Set the predicted sales state
  };

  return (
    <div className="App">
      <h1>Sales Data & Forecast</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={[...sales, ...predictedSales]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;
