const AtividadeModel = require("../model/entidades/AtividadeModel");
const atividadeModel = new AtividadeModel();
class AtividadeController{

    async obterTodos(req, res){
        const atividade = await atividadeModel.obterTodos();        
        return res.status(200).json(atividade);
    }

    async obterPorId(req, res){
        const id = req.params.id;
        const atividade = await atividadeModel.obterPorId(id);        
        return res.status(200).json(atividade);
    }

    async adicionar(req, res){
        const {nome} = req.body;
        const atividade = new AtividadeModel(0, nome);

        try {
            await atividadeModel.adicionar(atividade);
            return res.status(200).json({message: 'Atividade cadastrada com sucesso'});
        } catch (error) {
            console.log('Erro ao adicionar atividade', error);
            return res.status(500).json({message: 'Erro ao cadastrar atividade'});
        }

    }

    async atualizar(req, res){
        const id = req.params.id;
        const {nome} = req.body;
        const atividade = new AtividadeModel(id, nome);
        try {
            await atividadeModel.atualizar(id, atividade);
            return res.status(200).json({message: 'Atividade atualizada com sucesso'});
        } catch (error) {
            console.log('Erro ao adicionar atividade', error);
            return res.status(500).json({message: 'Erro ao atualizar atividade'});
        }

    }

    async excluir(req, res){
        const id = req.params.id;
        try {
            await atividadeModel.excluir(id);
            return res.status(200).json({message: 'Atividade excluída com sucesso'});
        } catch (error) {
            console.log('Erro ao excluir atividade', error);
            return res.status(500).json({message: 'Erro ao excluir atividade'});
        }
    }

    async filtrar(req, res){
        const termoBusca = req.params.termoBusca;
        const atividades = await atividadeModel.filtrar(termoBusca);        
        return res.status(200).json(atividades);
    }

}

module.exports = AtividadeController;