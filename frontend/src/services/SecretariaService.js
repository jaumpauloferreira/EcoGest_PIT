const API_BASE_URL = 'http://localhost:3001'
class SecretariaService {

    async obterTodos() {
        const response = await fetch(`${API_BASE_URL}/secretaria`, {

            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            console.log('ocorreu um erro ao listar')
        } else {

            const dados = await response.json();
            return dados;
        }
    }

    async obterPorId(id) {
        const response = await fetch(`${API_BASE_URL}/secretaria/${id}`, {

            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            console.log('ocorreu um erro ao listar')
        } else {

            const dados = await response.json();
            return dados;
        }
    }

    async adicionar(secretariaDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/secretaria`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(secretariaDados)

            })
            if (!response.ok) {
                console.log('ocorreu um erro ao adicionar')
                throw new Error('Erro ao Cadastrar secretaria!')
            }
        } catch (error) {
            throw error;
        }
    }

    async atualizar(idSecretaria, secretariaDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/secretaria/${idSecretaria}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(secretariaDados)

            })
            if (!response.ok) {
                console.log('ocorreu um erro ao atualizar')
                throw new Error('Erro ao Atualizar Maquinario!')
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(idSecretaria) {
        try {
            const response = await fetch(`${API_BASE_URL}/secretaria/${idSecretaria}`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                console.log('ocorreu um erro ao deletar')
                throw new Error('Erro ao Deletar secretaria!')
            }
        } catch (error) {
            throw error;
        }
    }

    async filtrar(termobusca) {
        const response = await fetch(`${API_BASE_URL}/secretaria/filtrar/${termobusca}`, {

            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            console.log('ocorreu um erro ao listar')
        } else {

            const dados = await response.json();
            return dados;
        }
    }

}

export default SecretariaService;