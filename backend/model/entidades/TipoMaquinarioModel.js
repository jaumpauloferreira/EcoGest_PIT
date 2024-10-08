const Database = require("../database");

const database = new Database()

class TipoMaquinarioModel {

    constructor(id, nome){
        this.id = id;
        this.nome = nome;
    }

    async obterTodos(){
        const listaTipoMaq = await database.ExecutaComando('select * from cadastrotiposdemaquinario order by nome asc');
        return listaTipoMaq;
    }

    async obterPorId(id){
        const result = await database.ExecutaComando('select * from cadastrotiposdemaquinario where id = ?', [id]);
        return result[0];
    }
    async adicionar(dadosTipoMaquinario){
        await database.ExecutaComandoNonQuery('insert into cadastrotiposdemaquinario set ?', dadosTipoMaquinario);
    }

    async atualizar(id, dadosTipoMaquinario){
        await database.ExecutaComandoNonQuery('update cadastrotiposdemaquinario set ? where id = ?', [dadosTipoMaquinario, id]);
    }

    async excluir(id){
        await database.ExecutaComandoNonQuery('delete from cadastrotiposdemaquinario where id = ?', [id]);
    }

    async filtrar(termoBusca){
        const tiposMaq = await database.ExecutaComando('select * from cadastrotiposdemaquinario where nome like ?', [`%${termoBusca}%`])
        return tiposMaq;
    }

}

module.exports = TipoMaquinarioModel;