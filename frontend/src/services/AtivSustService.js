const API_BASE_URL = "http://localhost:3001";

class AtivSustService {
    // Obter todas as atividades
    async obterTodos() {
        try {
            const response = await fetch(`${API_BASE_URL}/criarativsust`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao obter todas as atividades');
            }

            const dados = await response.json();
            return dados;
        } catch (error) {
            console.error('Erro ao obter todas as atividades:', error);
            throw error;
        }
    }

    // Obter tipos de atividades
    async obterTipos() {
        try {
          const response = await fetch('http://localhost:3001/cadtipoativsust');
          if (!response.ok) {
            throw new Error('Erro ao buscar tipos de atividades');
          }
          return await response.json();
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
      

    // Adicionar uma nova atividade
    async adicionar(atividadeDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/criarativsust`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(atividadeDados)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro ao adicionar atividade:', errorData);
                throw new Error(`Erro ao adicionar atividade: ${errorData.message}`);
            }
    
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.error('Erro ao adicionar atividade:', error);
            throw error;
        }
    }

    // Atualizar uma atividade existente e limpar o formulário
    async atualizar(idAtividade, atividadeDados, limparFormulario) {
        try {
            const response = await fetch(`${API_BASE_URL}/criarativsust/${idAtividade}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(atividadeDados),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro ao atualizar atividade:', errorData);
                throw new Error(`Erro ao atualizar atividade: ${errorData.message}`);
            }
    
            const dadosAtualizados = await response.json();
    
            if (limparFormulario) {
                limparFormulario();  // Limpa o formulário após a atualização
            }
    
            return dadosAtualizados;
        } catch (error) {
            console.error('Erro ao atualizar atividade:', error);
            throw error;
        }
    }
    

    // Obter uma atividade por ID
    async obterPorId(tipo_id) {
        try {
            const response = await fetch(`${API_BASE_URL}/criarativsust/${tipo_id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao obter a atividade');
            }

            const dados = await response.json();
            return dados;
        } catch (error) {
            console.error('Erro ao obter a atividade:', error);
            throw error;
        }
    }

    // Excluir uma atividade
    async excluir(idAtividade) {
        try {
            const response = await fetch(`${API_BASE_URL}/criarativsust/${idAtividade}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro ao excluir atividade:', errorData);
                throw new Error(`Erro ao excluir atividade: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Erro ao excluir atividade:', error);
            throw error;
        }
    }

    // Filtrar atividades por termo de busca
    async filtrar(termoBusca) {
        try {
            const response = await fetch(`${API_BASE_URL}/criarativsust/filtrar/${termoBusca}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao filtrar atividades');
            }

            const dados = await response.json();
            return dados;
        } catch (error) {
            console.error('Erro ao filtrar atividades:', error);
            throw error;
        }
    }
}

export default AtivSustService;
