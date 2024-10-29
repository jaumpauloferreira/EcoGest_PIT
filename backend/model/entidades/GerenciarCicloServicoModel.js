// Local: backend/entidades/model/GerenciarCicloServicoModel.js

const Database = require("../database");
const database = new Database();

class GerenciarCicloServico {
    async obterTodos() {
        return await database.ExecutaComando(`
            SELECT s.id, s.status, s.data_inicio, s.data_fim, s.descricao, 
                   b.nome AS solicitante, c.nome AS colaborador, t.nome AS tipo_servico
            FROM servico s
            JOIN beneficiario b ON s.beneficiario_id = b.id
            JOIN colaboradores c ON s.colaborador_id = c.id
            JOIN cadastrotiposdeservico t ON s.tipo_servico_id = t.id
        `);
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando(`
            SELECT s.*, b.nome AS solicitante, c.nome AS colaborador, t.nome AS tipo_servico
            FROM servico s
            JOIN beneficiario b ON s.beneficiario_id = b.id
            JOIN colaboradores c ON s.colaborador_id = c.id
            JOIN cadastrotiposdeservico t ON s.tipo_servico_id = t.id
            WHERE s.id = ?
        `, [id]);
        return result[0];
    }

    async adicionar(dadosServico) {
        await database.ExecutaComandoNonQuery('INSERT INTO servico SET ?', dadosServico);
    }

    async atualizar(id, dadosServico) {
        await database.ExecutaComandoNonQuery('UPDATE servico SET ? WHERE id = ?', [dadosServico, id]);
    }

    async deletar(id) {
        await database.ExecutaComandoNonQuery('DELETE FROM servico WHERE id = ?', [id]);
    }

    async atualizarStatus(id, status) {
        const dataFim = status === 'Concluído' ? new Date() : null;
        await database.ExecutaComandoNonQuery('UPDATE servico SET status = ?, data_fim = ? WHERE id = ?', [status, dataFim, id]);
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

