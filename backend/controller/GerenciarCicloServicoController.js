// Local: backend/controller/GerenciarCicloServicoController.js

const GerenciarCicloServicoModel = require('../model/entidades/GerenciarCicloServicoModel');
const gerenciarCicloServico = new GerenciarCicloServicoModel();

class GerenciarCicloServicoController {
    async obterTodos(req, res) {
        try {
            const servicos = await gerenciarCicloServico.obterTodos();
            res.status(200).json(servicos);
        } catch (error) {
            console.error("Erro ao obter todos os serviços:", error);
            res.status(500).json({ error: 'Erro ao obter serviços' });
        }
    }

    async obterPorId(req, res) {
        try {
            const servico = await gerenciarCicloServico.obterPorId(req.params.id);
            if (servico) {
                res.status(200).json(servico);
            } else {
                res.status(404).json({ error: 'Serviço não encontrado' });
            }
        } catch (error) {
            console.error("Erro ao obter serviço por ID:", error);
            res.status(500).json({ error: 'Erro ao obter serviço' });
        }
    }

    async adicionar(req, res) {
        try {
            await gerenciarCicloServico.adicionar(req.body);
            res.status(201).json({ message: 'Serviço adicionado com sucesso' });
        } catch (error) {
            console.error("Erro ao adicionar serviço:", error);
            res.status(500).json({ error: 'Erro ao adicionar serviço' });
        }
    }

    async atualizar(req, res) {
        try {
            await gerenciarCicloServico.atualizar(req.params.id, req.body);
            res.status(200).json({ message: 'Serviço atualizado com sucesso' });
        } catch (error) {
            console.error("Erro ao atualizar serviço:", error);
            res.status(500).json({ error: 'Erro ao atualizar serviço' });
        }
    }

    async deletar(req, res) {
        try {
            await gerenciarCicloServico.deletar(req.params.id);
            res.status(200).json({ message: 'Serviço excluído com sucesso' });
        } catch (error) {
            console.error("Erro ao excluir serviço:", error);
            res.status(500).json({ error: 'Erro ao excluir serviço' });
        }
    }

    async atualizarStatus(req, res) {
        try {
            const { status } = req.body;
            await gerenciarCicloServico.atualizarStatus(req.params.id, status);
            res.status(200).json({ message: 'Status salvo com sucesso!' });
        } catch (error) {
            console.error("Erro ao atualizar status do serviço:", error);
            res.status(500).json({ error: 'Erro ao atualizar status do serviço' });
        }
    }

    async obterHistorico(req, res) {
        try {
            const historico = await gerenciarCicloServico.obterHistorico(req.params.id);
            res.status(200).json(historico);
        } catch (error) {
            console.error("Erro ao obter histórico do serviço:", error);
            res.status(500).json({ error: 'Erro ao obter histórico do serviço' });
        }
    }
}

module.exports = GerenciarCicloServicoController;

