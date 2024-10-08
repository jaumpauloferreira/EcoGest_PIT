const Database = require("../database");

const database = new Database()

class ServicoModel {

    constructor(id, nome){
        this.id = id;
        this.nome = nome;
    }

    async obterTodos(){
        const listaServicos = await database.ExecutaComando('select * from cadastrotiposdeservico order by nome asc');
        return listaServicos;
    }

    async obterPorId(id){
        const result = await database.ExecutaComando('select * from cadastrotiposdeservico where id = ?', [id]);
        return result[0];
    }

    async adicionar(dadosServico){
        await database.ExecutaComandoNonQuery('insert into cadastrotiposdeservico set ?', dadosServico);
    }

    async atualizar(id, dadosServico){
        await database.ExecutaComandoNonQuery('update cadastrotiposdeservico set ? where id = ?', [dadosServico, id]);
    }

    async excluir(id){
        await database.ExecutaComandoNonQuery('delete from cadastrotiposdeservico where id = ?', [id]);
    }

    async filtrar(termoBusca){
        const servico = await database.ExecutaComando('select * from cadastrotiposdeservico where nome like ?', [`%${termoBusca}%`])
        return servico;
    }

}

module.exports = ServicoModel;