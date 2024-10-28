// Local: backend/controller/GerenciarCicloServicoController.js

const GerenciarCicloServicoModel = require('../model/entidades/GerenciarCicloServicoModel');
const gerenciarCicloServico = new GerenciarCicloServicoModel();

class GerenciarCicloServicoController {
    // Obter todos os serviços
    async obterTodos(req, res) {
        try {
            const servicos = await gerenciarCicloServico.obterTodos();
            res.status(200).json(servicos);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter serviços' });
        }
    }

    // Obter serviço por ID
    async obterPorId(req, res) {
        try {
            const servico = await gerenciarCicloServico.obterPorId(req.params.id);
            if (servico) {
                res.status(200).json(servico);
            } else {
                res.status(404).json({ error: 'Serviço não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter serviço' });
        }
    }

    // Adicionar um novo serviço
    async adicionar(req, res) {
        try {
            await gerenciarCicloServico.adicionar(req.body);
            res.status(201).json({ message: 'Serviço adicionado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar serviço' });
        }
    }

    // Atualizar um serviço
    async atualizar(req, res) {
        try {
            await gerenciarCicloServico.atualizar(req.params.id, req.body);
            res.status(200).json({ message: 'Serviço atualizado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar serviço' });
        }
    }

    // Deletar um serviço
    async deletar(req, res) {
        try {
            await gerenciarCicloServico.deletar(req.params.id);
            res.status(200).json({ message: 'Serviço excluído com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir serviço' });
        }
    }

    // Atualizar status do serviço
    async atualizarStatus(req, res) {
        try {
            await gerenciarCicloServico.atualizarStatus(req.params.id, req.body.status);
            res.status(200).json({ message: 'Status do serviço atualizado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar status do serviço' });
        }
    }

    // Obter histórico de um serviço
    async obterHistorico(req, res) {
        try {
            const historico = await gerenciarCicloServico.obterHistorico(req.params.id);
            res.status(200).json(historico);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter histórico do serviço' });
        }
    }
}

module.exports = GerenciarCicloServicoController;
