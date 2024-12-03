import React, { useState, useEffect } from 'react';
import ChartBarT from './ChartBarT';
import { processarDadosGraficoPorSec } from '../../../utils/relatorioServicosTramitados';

const DashboardT = () => {
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/tramitarserv/');
        const servicos = await response.json();

        // Processar os dados para o gráfico
        const dadosProcessados = processarDadosGraficoPorSec(servicos);
        setChartData(dadosProcessados);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ChartBarT
        labels={chartData.labels}
        data={chartData.data}
        label="Serviços Tramitados"
      />
    </div>
  );
};

export default DashboardT;
