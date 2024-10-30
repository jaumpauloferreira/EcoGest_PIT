// Local: backend/entidades/model/GerenciarCicloServicoModel.js

const Database = require("../database");
const database = new Database();

class GerenciarCicloServico {
    async obterTodos() {
        return await database.ExecutaComando(`
            SELECT agserv_id AS id, agserv_nomeSolicitante AS solicitante, 
                   agserv_contatoSolicitante AS contato, agserv_data AS data_servico, 
                   agserv_horario AS horario, t.nome AS tipo_servico, 
                   agserv_status AS status
            FROM realizaragserv r
            JOIN cadastrotiposdeservico t ON r.agserv_tipoServico_id = t.id
        `);
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando(`
            SELECT r.*, agserv_nomeSolicitante AS solicitante, 
                   agserv_contatoSolicitante AS contato, agserv_data AS data_servico, 
                   agserv_horario AS horario, t.nome AS tipo_servico, 
                   agserv_status AS status
            FROM realizaragserv r
            JOIN cadastrotiposdeservico t ON r.agserv_tipoServico_id = t.id
            WHERE r.agserv_id = ?
        `, [id]);
        return result[0];
    }

    async adicionar(dadosServico) {
        await database.ExecutaComandoNonQuery('INSERT INTO realizaragserv SET ?', dadosServico);
    }

    async atualizar(id, dadosServico) {
        await database.ExecutaComandoNonQuery('UPDATE realizaragserv SET ? WHERE agserv_id = ?', [dadosServico, id]);
    }

    async deletar(id) {
        await database.ExecutaComandoNonQuery('DELETE FROM realizaragserv WHERE agserv_id = ?', [id]);
    }

    async atualizarStatus(id, status) {
        const dataFim = status === 'Concluído' ? new Date() : null;
        await database.ExecutaComandoNonQuery('UPDATE realizaragserv SET agserv_status = ?, data_fim = ? WHERE agserv_id = ?', [status, dataFim, id]);
    }

    async obterHistorico(id) {
        return await database.ExecutaComando(`
            SELECT * FROM historico_servico 
            WHERE servico_id = ? 
            ORDER BY data_alteracao
        `, [id]);
    }
}

module.exports = GerenciarCicloServico;

