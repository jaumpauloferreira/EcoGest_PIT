import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartBarComponent = ({ 
  labels = ['Jan','Fev','Mar','Abr','Mai','Jun'], 
  data = [50,19,3,5,2,3],
  label = 'Serviços da Secretaria de Meio Ambiente'
}) => {
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
        position: 'top'
      },
      title: {
        display: true,
        text: 'Distribuição de Serviços por Mês'
      }
    }
  };

  return <Bar data={chartData} options={options} />;
}

export default ChartBarComponent;