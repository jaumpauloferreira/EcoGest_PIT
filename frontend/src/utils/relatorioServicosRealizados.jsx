export const processarDadosGraficoPorMes = (servicos) => {
  const mesesPortugues = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

  const dadosPorMes = new Array(12).fill(0);

  servicos.forEach(servico => {
    const data = new Date(servico.data_servico);
    const indiceMes = data.getMonth(); // 0-11
    dadosPorMes[indiceMes]++;
  });

  return {
    labels: mesesPortugues,
    data: dadosPorMes
  };
};