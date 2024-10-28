// Local: frontend/services/GerenciarCicloServService.js

const API_URL = 'http://localhost:3001/api/agendamentos';

const GerenciarCicloServService = {
  // Obter todos os serviços
  obterTodos: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Erro ao obter serviços');
      return await response.json();
    } catch (error) {
      console.error("Erro ao obter serviços:", error.message);
      throw error;
    }
  },

  // Obter detalhes de um serviço específico
  obterPorId: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error(`Erro ao obter serviço com ID ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Erro ao obter serviço com ID ${id}:`, error.message);
      throw error;
    }
  },

  // Atualizar status do serviço
  atualizarStatus: async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error(`Erro ao atualizar status do serviço com ID ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Erro ao atualizar status do serviço com ID ${id}:`, error.message);
      throw error;
    }
  },

  // Excluir um serviço
  excluirServico: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(`Erro ao excluir serviço com ID ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Erro ao excluir serviço com ID ${id}:`, error.message);
      throw error;
    }
  },

  // Obter histórico de status de um serviço
  obterHistorico: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/historico`);
      if (!response.ok) throw new Error(`Erro ao obter histórico do serviço com ID ${id}`);
      return await response.json();
    } catch (error) {
      console.error(`Erro ao obter histórico do serviço com ID ${id}:`, error.message);
      throw error;
    }
  },
};

export default GerenciarCicloServService;
