const API_BASE_URL = 'http://localhost:3001'
class MaquinarioService {

    async obterTodos() {
        const response = await fetch(`${API_BASE_URL}/maquinario`, {

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
        const response = await fetch(`${API_BASE_URL}/maquinario/${id}`, {

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

    async adicionar(maquinarioDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/maquinario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(maquinarioDados)

            })
            if (!response.ok) {
                console.log('ocorreu um erro ao adicionar')
                throw new Error('Erro ao Cadastrar maquinário!')
            }
        } catch (error) {
            throw error;
        }
    }

    async atualizar(idMaquinario, maquinarioDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/maquinario/${idMaquinario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(maquinarioDados)

            })
            if (!response.ok) {
                console.log('ocorreu um erro ao atualizar')
                throw new Error('Erro ao Atualizar Maquinario!')
            }
        } catch (error) {
            throw error;
        }
    }

    async delete(idMaquinario) {
        try {
            const response = await fetch(`${API_BASE_URL}/maquinario/${idMaquinario}`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                console.log('ocorreu um erro ao deletar')
                throw new Error('Erro ao Deletar maquinário!')
            }
        } catch (error) {
            throw error;
        }
    }

    async filtrar(termobusca) {
        const response = await fetch(`${API_BASE_URL}/maquinario/filtrar/${termobusca}`, {

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

export default MaquinarioService