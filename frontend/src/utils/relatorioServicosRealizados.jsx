export const processarDadosGraficoPorMes = (servicos) => {
    // Mapeamento de meses para índices
    const mesesPortugues = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
  
    // Inicializar array com zeros para todos os meses
    const dadosPorMes = new Array(12).fill(0);
  
    // Processar cada serviço
    servicos.forEach(servico => {
      // Assumindo que 'data_servico' é uma data válida
      const data = new Date(servico.data_servico);
      const indiceMes = data.getMonth(); // 0-11
      dadosPorMes[indiceMes]++;
    });
  
    return {
      labels: mesesPortugues,
      data: dadosPorMes
    };
  };