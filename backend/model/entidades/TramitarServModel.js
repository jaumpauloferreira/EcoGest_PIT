const Database = require("../database");
const database = new Database();

class TramitarServModel {
    constructor(id, id_tiposervico, id_secretaria, msg_motivo) {
        this.id = id;
        this.id_tiposervico = id_tiposervico; // Alterado de id_servico
        this.id_secretaria = id_secretaria;
        this.msg_motivo = msg_motivo;
    }

    async obterTodos() {
        const listaTramitacoes = await database.ExecutaComando(`
            SELECT 
                t.id, 
                t.id_tiposervico,
                t.id_secretaria, 
                t.msg_motivo, 
                t.data_tramitacao,
                t.status,
                r.agserv_nomeSolicitante AS nomeSolicitante,
                r.agserv_cpfSolicitante AS cpfSolicitante,
                cts.nome AS tipo_servico,
                sec.nome_secretaria
            FROM 
                tramitarserv t
            JOIN 
                realizaragserv r ON t.id_tiposervico = r.agserv_id
            JOIN 
                cadastrotiposdeservico cts ON t.id_tiposervico = cts.id
            JOIN 
                secretaria sec ON t.id_secretaria = sec.id
            ORDER BY 
                t.data_tramitacao DESC;
        `);
        return listaTramitacoes;
    }
    async obterPorId(id) {
        const result = await database.ExecutaComando(
            `SELECT t.*, s.nome_secretaria, cts.nome AS tipo_servico
             FROM tramitarserv t
             INNER JOIN secretaria s ON t.id_secretaria = s.id
             INNER JOIN cadastrotiposdeservico cts ON t.id_tiposervico = cts.id
             WHERE t.id = ?`, 
            [id]
        );
        return result[0];
    }

    async obterPorTipoServico(id_tiposervico) {
        const result = await database.ExecutaComando(
            `SELECT t.*, s.nome_secretaria, cts.nome AS tipo_servico
             FROM tramitarserv t
             INNER JOIN secretaria s ON t.id_secretaria = s.id
             INNER JOIN cadastrotiposdeservico cts ON t.id_tiposervico = cts.id
             WHERE t.id_tiposervico = ?
             ORDER BY t.data_tramitacao DESC`, 
            [id_tiposervico]
        );
        return result;
    }

    async adicionar(dadosTramitacao) {
        await database.ExecutaComandoNonQuery(
            'INSERT INTO tramitarserv (id_tiposervico, id_secretaria, msg_motivo, status) VALUES (?, ?, ?, ?)',
            [
                dadosTramitacao.id_tiposervico, 
                dadosTramitacao.id_secretaria, 
                dadosTramitacao.msg_motivo,
                dadosTramitacao.status || 'Em Análise' // Valor padrão caso não seja fornecido
            ]
        );
    }


    async atualizar(id, dadosTramitacao) {
        await database.ExecutaComandoNonQuery(
            'UPDATE tramitarserv SET id_tiposervico = ?, id_secretaria = ?, msg_motivo = ?, status = ? WHERE id = ?',
            [
                dadosTramitacao.id_tiposervico, 
                dadosTramitacao.id_secretaria, 
                dadosTramitacao.msg_motivo,
                dadosTramitacao.status || 'Em Análise', // Valor padrão caso não seja fornecido
                id
            ]
        );
    }

    async excluir(id) {
        await database.ExecutaComandoNonQuery('DELETE FROM tramitarserv WHERE id = ?', [id]);
    }

    async obterTiposServico() {
        const result = await database.ExecutaComando(
            'SELECT id, nome FROM cadastrotiposdeservico ORDER BY nome'
        );
        return result;
    }

    async obterSecretarias() {
        const result = await database.ExecutaComando(
            'SELECT id, nome_secretaria FROM secretaria ORDER BY nome_secretaria'
        );
        return result;
    }
}

module.exports = TramitarServModel;
