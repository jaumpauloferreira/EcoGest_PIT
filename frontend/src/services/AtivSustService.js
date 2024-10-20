const API_BASE_URL = "http://localhost:3001";

class AtivSustService {
    // Obter todas as atividades sustentáveis
    async obterTodos() {
        const response = await fetch(`${API_BASE_URL}/criarativsust`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao obter todas as atividades sustentáveis');
        }
        const dados = await response.json();
        return dados;
    }

    // Adicionar uma nova atividade sustentável
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
                const errorResponse = await response.json();
                throw new Error(`Erro ao adicionar a atividade sustentável: ${errorResponse.message || 'Erro desconhecido'}`);
            }

            return await response.json(); // Retorna a resposta do backend em caso de sucesso
        } catch (error) {
            console.error(error);
            throw error; // Propaga o erro para ser tratado pelo chamador
        }
    }

    // Atualizar uma atividade sustentável existente
    async atualizar(idAtividade, atividadeDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/criarativsust/${idAtividade}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(atividadeDados)
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(`Erro ao atualizar a atividade sustentável: ${errorResponse.message || 'Erro desconhecido'}`);
            }
        } catch (error) {
            throw error;
        }
    }

    // Obter uma atividade sustentável por ID
    async obterPorId(id) {
        const response = await fetch(`${API_BASE_URL}/criarativsust/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao obter a atividade sustentável por ID');
        }
        const dados = await response.json();
        return dados;
    }

    // Excluir uma atividade sustentável
    async excluir(idAtividade) {
        try {
            const response = await fetch(`${API_BASE_URL}/criarativsust/${idAtividade}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir a atividade sustentável');
            }
        } catch (error) {
            throw error;
        }
    }

    // Filtrar atividades sustentáveis por termo de busca
    async filtrar(termoBusca) {
        const response = await fetch(`${API_BASE_URL}/criarativsust/filtrar/${termoBusca}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao filtrar as atividades sustentáveis');
        }
        const dados = await response.json();
        return dados;
    }

    // Obter tipos de atividades
    async obterTipos() {
        const response = await fetch(`${API_BASE_URL}/cadtipoativsust`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao obter tipos de atividades sustentáveis');
        }
        const dados = await response.json();
        return dados;
    }
}

export default AtivSustService;
