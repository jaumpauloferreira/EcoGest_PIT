const Database = require("../database");
const database = new Database();

class TramitarServModel {
    constructor(id, id_servico, id_secretaria, msg_motivo) {
        this.id = id;
        this.id_servico = id_servico;
        this.id_secretaria = id_secretaria;
        this.msg_motivo = msg_motivo;
    }

    // obterTodos precisa mesclar os dados das tabelas para funcinar
    // corrigido: dados de id_servico estavam sendo puxados do endpoint /servico
    // agora estão sendo puxados de agserv_servico_id
    async obterTodos() {
        const listaTramitacoes = await database.ExecutaComando(`
           SELECT 
    t.id, 
    t.id_servico, 
    t.id_secretaria, 
    t.msg_motivo, 
    t.data_tramitacao,
    r.agserv_nomeSolicitante AS nomeSolicitante,
    r.agserv_cpfSolicitante AS cpfSolicitante,
    s.nome_servico AS tipo_servico, 
    sec.nome_secretaria
FROM 
    tramitarserv t
JOIN 
    realizaragserv r ON t.id_servico = r.agserv_id
JOIN 
    servico s ON r.agserv_servico_id = s.id
JOIN 
    secretaria sec ON t.id_secretaria = sec.id
ORDER BY 
    t.data_tramitacao DESC;
        `);
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
