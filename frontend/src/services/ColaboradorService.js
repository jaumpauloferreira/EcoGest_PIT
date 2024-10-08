const API_BASE_URL = 'http://localhost:3001';

class ColaboradorService {
    async obterTodos() {
        try {
            const response = await fetch(`${API_BASE_URL}/colaborador`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                console.error('Ocorreu um erro ao listar colaboradores');
                throw new Error('Erro ao listar colaboradores');
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.error('Erro ao obter todos os colaboradores:', error);
            throw error;
        }
    }

    async obterPorId(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/colaborador/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                console.error('Ocorreu um erro ao obter o colaborador por ID');
                throw new Error('Erro ao obter o colaborador por ID');
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.error('Erro ao obter colaborador por ID:', error);
            throw error;
        }
    }
    async adicionar(colaboradorDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/colaborador`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(colaboradorDados)
            });
            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.error === 'CPF já cadastrado. Tente outro CPF.') {
                    // Mensagem de erro para CPF já cadastrado
                    throw new Error('CPF já cadastrado. Tente outro CPF.');
                }
                console.error('Ocorreu um erro ao adicionar colaborador');
                throw new Error('Erro ao cadastrar colaborador');
            }
        } catch (error) {
            console.error('Erro ao adicionar colaborador:', error);
            throw error;
        }
    }
    
    async atualizar(idColaborador, colaboradorDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/colaborador/${idColaborador}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(colaboradorDados)
            });
            if (!response.ok) {
                console.error('Ocorreu um erro ao atualizar colaborador');
                throw new Error('Erro ao atualizar colaborador');
            }
        } catch (error) {
            console.error('Erro ao atualizar colaborador:', error);
            throw error;
        }
    }

    async delete(idColaborador) {
        try {
            const response = await fetch(`${API_BASE_URL}/colaborador/${idColaborador}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                console.error('Ocorreu um erro ao deletar colaborador');
                throw new Error('Erro ao deletar colaborador');
            }
        } catch (error) {
            console.error('Erro ao deletar colaborador:', error);
            throw error;
        }
    }

    async filtrar(termoBusca) {
        try {
            const response = await fetch(`${API_BASE_URL}/colaborador/filtrar/${termoBusca}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                console.error('Ocorreu um erro ao filtrar colaboradores');
                throw new Error('Erro ao filtrar colaboradores');
            }
            const dados = await response.json();
            return dados;
        } catch (error) {
            console.error('Erro ao filtrar colaboradores:', error);
            throw error;
        }
    }

    async verificarCpfUnico(cpf) {
        try {
            const response = await fetch(`${API_BASE_URL}/colaborador/verificarCpfUnico/${cpf}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                console.error('Ocorreu um erro ao verificar CPF único');
                throw new Error('Erro ao verificar CPF único');
            }
            const { cpfUnico } = await response.json();
            return cpfUnico;
        } catch (error) {
            console.error('Erro ao verificar CPF único:', error);
            throw error;
        }
    }
}



export default ColaboradorService;
