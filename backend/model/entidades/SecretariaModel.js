const Database = require("../database");

const database = new Database()

class SecretariaModel {

    constructor(id, nome_secretaria){
        this.id = id;
        this.nome_secretaria = nome_secretaria;
    }

    async obterTodos(){
        const listaSecretaria = await database.ExecutaComando('select * from secretaria order by nome_secretaria asc');
        return listaSecretaria;
    }

    async obterPorId(id){
        const result = await database.ExecutaComando('select * from secretaria where id = ?', [id]);
        return result[0];
    }
    async adicionar(dadosSecretaria){
        await database.ExecutaComandoNonQuery('insert into secretaria set ?', dadosSecretaria);
    }

    async atualizar(id, dadosSecretaria){
        await database.ExecutaComandoNonQuery('update secretaria set ? where id = ?', [dadosSecretaria, id]);
    }

    async excluir(id){
        await database.ExecutaComandoNonQuery('delete from secretaria where id = ?', [id]);
    }

    async filtrar(termoBusca){
        const secretaria = await database.ExecutaComando('select * from secretaria where nome_secretaria like ?', [`%${termoBusca}%`])
        return secretaria;
    }

}

module.exports = SecretariaModel;