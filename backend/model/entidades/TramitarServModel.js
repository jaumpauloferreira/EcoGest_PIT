// TramitarServModel.js
const Database = require("../database");
const database = new Database();

class TramitarServModel {
    constructor(id, id_servico, id_secretaria, msg_motivo) {
        this.id = id;
        this.id_servico = id_servico;
        this.id_secretaria = id_secretaria;
        this.msg_motivo = msg_motivo;
    }

    async obterTodos() {
        const listaTramitacoes = await database.ExecutaComando(
            `SELECT t.*, s.nome_secretaria 
             FROM tramitarserv t
             INNER JOIN secretaria s ON t.id_secretaria = s.id
             ORDER BY t.data_tramitacao DESC`
        );
        return listaTramitacoes;
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando(
            `SELECT t.*, s.nome_secretaria 
             FROM tramitarserv t
             INNER JOIN secretaria s ON t.id_secretaria = s.id
             WHERE t.id = ?`, 
            [id]
        );
        return result[0];
    }

    async obterPorServico(id_servico) {
        const result = await database.ExecutaComando(
            `SELECT t.*, s.nome_secretaria 
             FROM tramitarserv t
             INNER JOIN secretaria s ON t.id_secretaria = s.id
             WHERE t.id_servico = ?
             ORDER BY t.data_tramitacao DESC`, 
            [id_servico]
        );
        return result;
    }

    async adicionar(dadosTramitacao) {
        await database.ExecutaComandoNonQuery(
            'INSERT INTO tramitarserv (id_servico, id_secretaria, msg_motivo) VALUES (?, ?, ?)',
            [dadosTramitacao.id_servico, dadosTramitacao.id_secretaria, dadosTramitacao.msg_motivo]
        );
    }

    async atualizar(id, dadosTramitacao) {
        await database.ExecutaComandoNonQuery(
            'UPDATE tramitarserv SET id_servico = ?, id_secretaria = ?, msg_motivo = ? WHERE id = ?',
            [dadosTramitacao.id_servico, dadosTramitacao.id_secretaria, dadosTramitacao.msg_motivo, id]
        );
    }

    async excluir(id) {
        await database.ExecutaComandoNonQuery('DELETE FROM tramitarserv WHERE id = ?', [id]);
    }
}

module.exports = TramitarServModel;
