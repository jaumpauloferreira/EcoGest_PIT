const API_BASE_URL = "http://localhost:3001";
class TramitarServicoService {
    
    async obterTodos() {
        const response = await fetch(`${API_BASE_URL}/tramitarserv`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            console.log('Erro ao obter as tramitações');
        }else{
            const dados = await response.json();
            return dados;
        }
    }

    async obterTipos() {
        const response = await fetch(`${API_BASE_URL}/tramitarserv`, {
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
    
    async adicionar(TramitarDados) {

        try {
            const response = await fetch(`${API_BASE_URL}/tramitarserv`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(TramitarDados)
            })
    
            if (!response.ok) {
                console.log('Erro ao adicionar!')
                throw new Error('Erro ao adicionar Serviço...')
            }
        } catch (error) {
            throw error;
        }
    }

    async atualizar(idTramitar, TramitarDados) {

        try {
            const response = await fetch(`${API_BASE_URL}/tramitarserv/${idTramitar}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(TramitarDados)
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
        const response = await fetch(`${API_BASE_URL}/tramitarserv/${id}`, {
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

    async excluir(idTramitar) {

        try {
            const response = await fetch(`${API_BASE_URL}/tramitarserv/${idTramitar}`, {
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
        const response = await fetch(`${API_BASE_URL}/tramitarserv/filtrar/${termoBusca}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            console.log('Ocorreu um erro ao editar a tramitação');
        }else{
            const dados = await response.json();
            return dados;
        }
    }
}

export default TramitarServicoService;