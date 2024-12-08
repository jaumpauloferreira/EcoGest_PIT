import React, { useState, useEffect } from 'react';
import ChartBarA from './ChartBarA.jsx';
import { processarDadosGraficoPorAtiv } from '../../../utils/relatorioAtividadeSustentavel';

const DashboardA = () => {
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/criarativsust/');
        const servicos = await response.json();

        const dadosProcessados = processarDadosGraficoPorAtiv(servicos);
        setChartData(dadosProcessados);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ChartBarA
        labels={chartData.labels}
        data={chartData.data}
        label="Atividades Sustentáveis"
      />
    </div>
  );
};

export default DashboardA;