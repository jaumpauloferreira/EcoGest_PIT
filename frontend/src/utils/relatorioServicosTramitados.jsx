export const processarDadosGraficoPorSec = (servicos) => {
    const dadosPorSecretaria = {};
  
    servicos.forEach((servico) => {
      const secretaria = servico.nome_secretaria;
      if (secretaria) {
        dadosPorSecretaria[secretaria] = (dadosPorSecretaria[secretaria] || 0) + 1;
      }
    });
  
    const labels = Object.keys(dadosPorSecretaria);
    const data = Object.values(dadosPorSecretaria);
  
    return { labels, data };
  };
  