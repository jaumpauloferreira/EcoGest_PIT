import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartBarA = ({ labels, data, label }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: data,
        backgroundColor: 'rgba(8, 116, 53, 0.6)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Quantidade de Atividades Sustentáveis',
      },
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true, 
          stepSize: 1,        
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ChartBarA;