const API_BASE_URL = "http://localhost:3001";

class TipoMaquinarioService {
    async obterTodos() {
        const response = await fetch(`${API_BASE_URL}/tipomaquinario`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.log('Erro ao obter todos os Tipos de Maquinário');
        } else {
            const dados = await response.json();
            return dados;
        }
    }

    async adicionar(tipoMaquinarioDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/tipomaquinario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tipoMaquinarioDados)
            });

            if (!response.ok) {
                console.log('Erro ao adicionar!');
                throw new Error('Erro ao adicionar Tipo de Maquinário...');
            }
        } catch (error) {
            throw error;
        }
    }

    async atualizar(idTipoMaquinario, tipoMaquinarioDados) {
        try {
            const response = await fetch(`${API_BASE_URL}/tipomaquinario/${idTipoMaquinario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tipoMaquinarioDados)
            });

            if (!response.ok) {
                console.log('Erro ao atualizar!');
                throw new Error('Erro ao atualizar Tipos de Maquinário...');
            }
        } catch (error) {
            throw error;
        }
    }

    async obterPorId(id) {
        const response = await fetch(`${API_BASE_URL}/tipomaquinario/${id}`, {
    headers: {
        'Content-Type': 'application/json'
    }
});

if (!response.ok) {
    console.log('Ocorreu um erro ao obter o Tipo de Maquinário');
} else {
    const dados = await response.json();
    return dados;
}
}

async excluir(idTipoMaquinario) {
    try {
        const response = await fetch(`${API_BASE_URL}/tipomaquinario/${idTipoMaquinario}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            console.log('Erro ao excluir!');
            throw new Error('Erro ao excluir Tipo de Maquinário...');
        }
    } catch (error) {
        throw error;
    }
}

async filtrar(termoBusca) {
    const response = await fetch(`${API_BASE_URL}/tipomaquinario/filtrar/${termoBusca}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        console.log('Ocorreu um erro ao filtrar os Tipos de Maquinário');
        return []; // Retornar um array vazio em caso de erro
    } else {
        const dados = await response.json();
        return dados;
    }
}
}

export default TipoMaquinarioService;