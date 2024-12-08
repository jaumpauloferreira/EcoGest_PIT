export const processarDadosGraficoPorAtiv = (dados) => {
    const atividadesContagem = {};
  
    dados.forEach((atividade) => {
      const tipo = atividade.tipo_atividade;
      atividadesContagem[tipo] = (atividadesContagem[tipo] || 0) + 1;
    });
  
    const labels = Object.keys(atividadesContagem);
    const data = Object.values(atividadesContagem);
  
    return { labels, data };
  };