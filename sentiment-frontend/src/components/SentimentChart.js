// src/components/SentimentChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentChart = ({ chartData }) => {
  return (
    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
      <Pie data={chartData} />
    </div>
  );
};

export default SentimentChart;
