// Local: backend/entidades/model/GerenciarCicloServicoModel.js

const Database = require("../database");
const database = new Database();

class GerenciarCicloServico {
    constructor(id, status, data_inicio, data_fim, descricao, beneficiario_id, colaborador_id, tipo_servico_id) {
        this.id = id;
        this.status = status;
        this.data_inicio = data_inicio;
        this.data_fim = data_fim;
        this.descricao = descricao;
        this.beneficiario_id = beneficiario_id;  
        this.colaborador_id = colaborador_id;
        this.tipo_servico_id = tipo_servico_id;
    }

    // Obter todos os serviços
    async obterTodos() {
        const listaServicos = await database.ExecutaComando(`
            SELECT s.id, s.status, s.data_inicio, s.data_fim, s.descricao, 
                   b.nome AS solicitante, c.nome AS colaborador, t.nome AS tipo_servico
            FROM servico s
            JOIN beneficiario b ON s.beneficiario_id = b.id
            JOIN colaboradores c ON s.colaborador_id = c.id
            JOIN cadastrotiposdeservico t ON s.tipo_servico_id = t.id
        `);
        return listaServicos;
    }

    // Obter serviço por ID
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

    // Adicionar um novo serviço
    async adicionar(dadosServico) {
        await database.ExecutaComandoNonQuery('INSERT INTO servico SET ?', dadosServico);
    }

    // Atualizar um serviço
    async atualizar(id, dadosServico) {
        await database.ExecutaComandoNonQuery('UPDATE servico SET ? WHERE id = ?', [dadosServico, id]);
    }

    // Deletar um serviço
    async deletar(id) {
        await database.ExecutaComandoNonQuery('DELETE FROM servico WHERE id = ?', [id]);
    }

    // Atualizar status de um serviço e registrar data de finalização se concluído
    async atualizarStatus(id, status) {
        const dataFim = status === 'Concluído' ? new Date() : null;
        await database.ExecutaComandoNonQuery('UPDATE servico SET status = ?, data_fim = ? WHERE id = ?', [status, dataFim, id]);
    }

    // Obter histórico de alterações de status de um serviço
    async obterHistorico(id) {
        const historico = await database.ExecutaComando(`
            SELECT * FROM historico_servico 
            WHERE servico_id = ? 
            ORDER BY data_alteracao
        `, [id]);
        return historico;
    }
}

module.exports = GerenciarCicloServico;
