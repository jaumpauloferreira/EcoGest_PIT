const Database = require("../database")
const database = new Database()

class MaquinarioModel {
    constructor(id, modelo, placa, ano) {
        this.id = id;
        this.modelo = modelo;
        this.placa = placa;
        this.ano = ano;
    }
    async obterTodos() {
        const listaMaquinarios = await database.ExecutaComando('select * from maquinario order by modelo asc');
        return listaMaquinarios;
    }
    async obterPorId(id){
        const result =await database.ExecutaComando('select * from maquinario where id=? ', [id])
        return result[0]
    }
    async adicionar(dadosMaquinario) {
        await database.ExecutaComandoNonQuery('insert into maquinario set ?', dadosMaquinario)
    }
    async atualizar (id,dadosMaquinario){
        await database.ExecutaComandoNonQuery('update maquinario set ? where id = ?', [
            dadosMaquinario,
            id
        ])
    }
    async delete (id){
        await database.ExecutaComandoNonQuery('delete from maquinario where id=?',[id])
    }
    async filtrar(termobusca) {
        const maquinarios = await database.ExecutaComando(
            "select * from maquinario where modelo like ? or placa like ? or ano like ?",
            [`%${termobusca}%`, `%${termobusca}%`, `%${termobusca}%`]
        );
        return maquinarios;
    }
}

module.exports = MaquinarioModel;