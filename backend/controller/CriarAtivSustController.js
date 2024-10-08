const CriarAtivSustModel = require("../model/entidades/CriarAtivSustModel");
const AtividadeModel = require("../model/entidades/AtividadeModel");

class CriarAtivSustController {
    async obterTodos(req, res) {
        try {
            const criarAtivSustModel = new CriarAtivSustModel();
            const atividadesSust = await criarAtivSustModel.obterTodos();
            return res.status(200).json(atividadesSust);
        } catch (error) {
            console.error('Erro ao obter todas as atividades sustentáveis:', error);
            return res.status(500).json({ message: 'Erro ao obter todas as atividades sustentáveis.' });
        }
    }

    async obterPorId(req, res) {
        const id = req.params.id;
        try {
            const criarAtivSustModel = new CriarAtivSustModel();
            const atividadeSust = await criarAtivSustModel.obterPorId(id);
            if (atividadeSust) {
                return res.status(200).json(atividadeSust);
            } else {
                return res.status(404).json({ message: 'Atividade sustentável não encontrada.' });
            }
        } catch (error) {
            console.error('Erro ao obter atividade sustentável por ID:', error);
            return res.status(500).json({ message: 'Erro ao obter atividade sustentável.' });
        }
    }

    async adicionar(req, res) {
        const { 
            criar_nome, 
            criar_cpf, 
            criar_contato, 
            criar_endereco, 
            criar_bairro, 
            criar_numero, 
            id, // Tipo de Atividade
            criar_data, 
            criar_horarioInicial, 
            criar_horarioFinal, 
            criar_descricao 
        } = req.body;

        // Verificação de campos obrigatórios
        if (!criar_nome || !criar_cpf || !criar_contato || !criar_endereco || !criar_bairro || !criar_numero || !id || !criar_data || !criar_horarioInicial || !criar_horarioFinal || !criar_descricao) {
            return res.status(400).json({ message: 'Por favor, informe todos os dados da Atividade Sustentável.' });
        }

        try {
            const tipoAtividade = new AtividadeModel();
            const tipoAtividadeData = await tipoAtividade.obterPorId(id);

            if (!tipoAtividadeData) {
                return res.status(400).json({ message: 'Tipo de Atividade Sustentável inválido.' });
            }

            // Criação da nova atividade
            const atividadeSust = new CriarAtivSustModel(
                0, // ID será gerado automaticamente
                criar_nome,
                criar_cpf,
                criar_contato,
                criar_endereco,
                criar_bairro,
                criar_numero,
                id,
                criar_data,
                criar_horarioInicial,
                criar_horarioFinal,
                criar_descricao
            );

            await atividadeSust.adicionar();

            return res.status(200).json({ message: 'Atividade sustentável cadastrada com sucesso.' });
        } catch (error) {
            console.error('Erro ao adicionar atividade sustentável:', error);
            return res.status(500).json({ message: 'Erro ao cadastrar atividade sustentável.' });
        }
    }

    async atualizar(req, res) {
        const id = req.params.id;
        const {
            criar_nome,
            criar_cpf,
            criar_contato,
            criar_endereco,
            criar_bairro,
            criar_numero,
            tipoAtividade,
            criar_data,
            criar_horarioInicial,
            criar_horarioFinal,
            criar_descricao
        } = req.body;
    
        // Log para verificar os dados recebidos
        console.log('Dados recebidos para atualização:', req.body);
    
        if (!criar_nome || !criar_cpf || !criar_contato || !criar_endereco || !criar_bairro || !criar_numero || !tipoAtividade || !criar_data || !criar_horarioInicial || !criar_horarioFinal || !criar_descricao) {
            return res.status(400).json({ message: 'Por favor, informe todos os dados da Atividade Sustentável.' });
        }
    
        try {
            const atividadeSust = new CriarAtivSustModel(
                id,
                criar_nome,
                criar_cpf,
                criar_contato,
                criar_endereco,
                criar_bairro,
                criar_numero,
                tipoAtividade,
                criar_data,
                criar_horarioInicial,
                criar_horarioFinal,
                criar_descricao
            );
    
            await atividadeSust.atualizar();
            return res.status(200).json({ message: 'Atividade sustentável atualizada com sucesso.' });
        } catch (error) {
            console.error('Erro ao atualizar atividade sustentável:', error);
            return res.status(500).json({ message: 'Erro ao atualizar atividade sustentável.', error: error.message });
        }
    }

    async excluir(req, res) {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({ message: 'Por favor, informe o ID da Atividade Sustentável para exclusão.' });
        }

        try {
            const atividadeSust = new CriarAtivSustModel();
            atividadeSust.id = id;

            await atividadeSust.excluir();

            return res.status(200).json({ message: 'Atividade sustentável excluída com sucesso.' });
        } catch (error) {
            console.error('Erro ao excluir atividade sustentável:', error);
            return res.status(500).json({ message: 'Erro ao excluir atividade sustentável.' });
        }
    }

    async filtrar(req, res) {
        const termoBusca = req.params.termoBusca || "";

        try {
            const criarAtivSustModel = new CriarAtivSustModel();
            const atividadesSusts = await criarAtivSustModel.filtrar(termoBusca);
            return res.status(200).json(atividadesSusts);
        } catch (error) {
            console.error('Erro ao filtrar atividades sustentáveis:', error);
            return res.status(500).json({ message: 'Erro ao filtrar atividades sustentáveis.' });
        }
    }
}

module.exports = CriarAtivSustController;
