const TramitarServModel = require("../model/entidades/TramitarServModel");
const tramitarServModel = new TramitarServModel();
const Database = require("../model/database"); 
const database = new Database(); 

class TramitarServController {
    async obterTodos(req, res) {
        try {
            const tramitacoes = await tramitarServModel.obterTodos();
            return res.status(200).json(tramitacoes);
        } catch (error) {
            console.error('Erro ao obter tramitações:', error);
            return res.status(500).json({ message: 'Erro ao obter tramitações' });
        }
    }

    obterPorId = async (req, res) => {
        try {
            const id = req.params.id;
            const tramitacao = await tramitarServModel.obterPorId(id);
            return res.status(200).json(tramitacao);
        } catch (error) {
            console.log('Erro ao obter tramitação', error);
            return res.status(500).json({ message: 'Erro ao obter tramitação' });
        }
    }

    obterPorServico = async (req, res) => {
        try {
            const id_servico = req.params.id_servico;
            const tramitacoes = await tramitarServModel.obterPorServico(id_servico);
            return res.status(200).json(tramitacoes);
        } catch (error) {
            console.log('Erro ao obter tramitações do serviço', error);
            return res.status(500).json({ message: 'Erro ao obter tramitações do serviço' });
        }
    }

    adicionar = async (req, res) => {
        const { id_servico, id_secretaria, msg_motivo } = req.body;
    
        try {
            // Verificar se o serviço existe
            const servico = await database.ExecutaComando(
                'SELECT agserv_id FROM realizaragserv WHERE agserv_id = ?', 
                [id_servico]
            );
    
            if (!servico || servico.length === 0) {
                return res.status(400).json({ message: `Serviço com ID ${id_servico} não encontrado` });
            }
    
            // Verificar se a secretaria existe
            const secretaria = await database.ExecutaComando(
                'SELECT id FROM secretaria WHERE id = ?', 
                [id_secretaria]
            );
    
            if (!secretaria || secretaria.length === 0) {
                return res.status(400).json({ message: `Secretaria com ID ${id_secretaria} não encontrada` });
            }
    
            // Alteração na ordem para fins de praticidade
            const tramitacao = new TramitarServModel(0, id_servico, id_secretaria, msg_motivo);
            await tramitarServModel.adicionar(tramitacao);
    
            return res.status(200).json({ message: 'Tramitação registrada com sucesso' });
        } catch (error) {
            console.error('Erro ao adicionar tramitação:', error);
            return res.status(500).json({ 
                message: 'Erro ao registrar tramitação', 
                error: error.message 
            });
        }
    };
    
    

    atualizar = async (req, res) => {
        const id = req.params.id;
        const { id_servico, id_secretaria, msg_motivo } = req.body;
        const tramitacao = new TramitarServModel(id, id_servico, id_secretaria, msg_motivo);

        try {
            await tramitarServModel.atualizar(id, tramitacao);
            return res.status(200).json({ message: 'Tramitação atualizada com sucesso' });
        } catch (error) {
            console.log('Erro ao atualizar tramitação', error);
            return res.status(500).json({ message: 'Erro ao atualizar tramitação' });
        }
    }

    excluir = async (req, res) => {
        const id = req.params.id;
        try {
            await tramitarServModel.excluir(id);
            return res.status(200).json({ message: 'Tramitação excluída com sucesso' });
        } catch (error) {
            console.log('Erro ao excluir tramitação', error);
            return res.status(500).json({ message: 'Erro ao excluir tramitação' });
        }
    }
}
module.exports = TramitarServController;