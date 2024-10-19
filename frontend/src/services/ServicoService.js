const API_BASE_URL = "http://localhost:3001";
class ServicoService {
    
    async obterTodos() {
        const response = await fetch(`${API_BASE_URL}/servico`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            console.log('Erro ao obter todos os Serviços');
        }else{
            const dados = await response.json();
            return dados;
        }
    }

    async obterTipos() {
        const response = await fetch(`${API_BASE_URL}/servico`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (!response.ok) {
            throw new Error('Erro ao obter os tipos de serviço');
        }
        const dados = await response.json();
        return dados;
    }
    
    async adicionar(servicoDados) {

        try {
            const response = await fetch(`${API_BASE_URL}/servico`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(servicoDados)
            })
    
            if (!response.ok) {
                console.log('Erro ao adicionar!')
                throw new Error('Erro ao adicionar Serviço...')
            }
        } catch (error) {
            throw error;
        }
    }

    async atualizar(idServico, servicoDados) {

        try {
            const response = await fetch(`${API_BASE_URL}/servico/${idServico}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(servicoDados)
            })
    
            if (!response.ok) {
                console.log('Erro ao atualizar!')
                throw new Error('Erro ao atualizar Serviço...')
            }
        } catch (error) {
            throw error;
        }
    }

    async obterPorId(id) {
        const response = await fetch(`${API_BASE_URL}/servico/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            console.log('Ocorreu um erro ao editar o Serviço');
        }else{
            const dados = await response.json();
            return dados;
        }
    }

    async excluir(idServico) {

        try {
            const response = await fetch(`${API_BASE_URL}/servico/${idServico}`, {
                method: 'DELETE'
            })
    
            if (!response.ok) {
                console.log('Erro ao excluir!')
                throw new Error('Erro ao excluir Serviço...')
            }
        } catch (error) {
            throw error;
        }
    }

    async filtrar(termoBusca) {
        const response = await fetch(`${API_BASE_URL}/servico/filtrar/${termoBusca}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            console.log('Ocorreu um erro ao editar o Serviço');
        }else{
            const dados = await response.json();
            return dados;
        }
    }
    

}

export default ServicoService;