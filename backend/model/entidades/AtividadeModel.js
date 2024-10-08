const Database = require("../database");

const database = new Database()

class AtividadeModel {

    constructor(id, nome){
        this.id = id;
        this.nome = nome;
    }

    async obterTodos(){
        const listaAtividades = await database.ExecutaComando('select * from cadtipoativsust order by nome asc');
        return listaAtividades;
    }

    async obterPorId(id){
        const result = await database.ExecutaComando('select * from cadtipoativsust where id = ?', [id]);
        return result[0];
    }

    async adicionar(dadosAtividade){
        await database.ExecutaComandoNonQuery('insert into cadtipoativsust set ?', dadosAtividade);
    }

    async atualizar(id, dadosAtividade){
        await database.ExecutaComandoNonQuery('update cadtipoativsust set ? where id = ?', [dadosAtividade, id]);
    }

    async excluir(id){
        await database.ExecutaComandoNonQuery('delete from cadtipoativsust where id = ?', [id]);
    }

    async filtrar(termoBusca){
        const atividades = await database.ExecutaComando('select * from cadtipoativsust where nome like ?', [`%${termoBusca}%`])
        return atividades;
    }

}

module.exports = AtividadeModel;