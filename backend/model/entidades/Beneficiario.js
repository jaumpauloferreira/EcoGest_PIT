const Database = require("../database");
const database = new Database();

class Beneficiario {
    constructor(id, nome, cpf, contato, email, endereco, bairro, numero, datanascimento) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.contato = contato;
        this.email = email;
        this.endereco = endereco;
        this.bairro = bairro;
        this.numero = numero;
        this.datanascimento = datanascimento;
    }

    async obterTodos(){
        const listaBeneficiarios = await database.ExecutaComando('select * from beneficiario');
        return listaBeneficiarios;
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando('select * from beneficiario where id = ?', [id]);
        return result[0];
    }

    async adicionar(dadosBeneficiario) {
        await database.ExecutaComandoNonQuery('insert into beneficiario set ?', dadosBeneficiario);
    }

    async atualizar(id, dadosBeneficiario) {
        await database.ExecutaComandoNonQuery('update beneficiario set ? where id = ?', [dadosBeneficiario, id]);
    }

    async deletar(id) {
        await database.ExecutaComandoNonQuery('delete from beneficiario where id = ?', [id]);
    }

    async filtrar(termoBusca) {
        const beneficiarios = await database.ExecutaComando(
            "select * from beneficiario where nome like ? or cpf like ?",
            [`%${termoBusca}%`, `%${termoBusca}%`]
        );
        return beneficiarios;
    }

    async verificarExistenciaCPF(cpf) {
        const result = await database.ExecutaComando('select count(*) as count from beneficiario where cpf = ?', [cpf]);
        return result[0].count > 0;
    }
}

module.exports = Beneficiario;
