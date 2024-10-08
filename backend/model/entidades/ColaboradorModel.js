const Database = require("../database");

const database = new Database();
class ColaboradorModel {
    constructor(id, nome, cpf, contato, endereco, bairro, numero, dataNascimento, cargo, nivelEscolaridade, email) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.contato = contato;
        this.endereco = endereco;
        this.bairro = bairro;
        this.numero = numero;
        this.dataNascimento = dataNascimento;
        this.cargo = cargo;
        this.nivelEscolaridade = nivelEscolaridade;
        this.email = email;
    }

    async obterTodos() {
        const listaColaboradores = await database.ExecutaComando('select * from colaboradores order by nome asc');
        return listaColaboradores;
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando('select * from colaboradores where id = ?', [id]);
        return result[0];
    }

    async adicionar(dadosColaborador) {
        await database.ExecutaComandoNonQuery('insert into colaboradores set ?', dadosColaborador);
    }

    async atualizar(id, dadosColaborador) {
        await database.ExecutaComandoNonQuery('update colaboradores set ? where id = ?', [
            dadosColaborador,
            id
        ]);
    }

    async delete(id) {
        await database.ExecutaComandoNonQuery('delete from colaboradores where id = ?', [id]);
    }

    async filtrar(termobusca) {
        const colaboradores = await database.ExecutaComando(
            "select * from colaboradores where nome like ? or cpf like ? or contato like ? or endereco like ? or bairro like ? or numero like ? or dataNascimento like ? or cargo like ? or nivelEscolaridade like ? or email like ?",
            [`%${termobusca}%`, `%${termobusca}%`, `%${termobusca}%`, `%${termobusca}%`, `%${termobusca}%`, `%${termobusca}%`, `%${termobusca}%`, `%${termobusca}%`, `%${termobusca}%`, `%${termobusca}%`]
        );
        return colaboradores;
    }

    async verificarExistenciaCPF(cpf) {
        const result = await database.ExecutaComando('select * from colaboradores where cpf = ?', [cpf]);
        return result.length > 0;
    }
}

module.exports = ColaboradorModel;
