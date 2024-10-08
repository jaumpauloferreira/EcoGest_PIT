const ServicoModel = require("../model/entidades/ServicoModel");
const servicoModel = new ServicoModel();


class ServicoController{

    async obterTodos(req, res){
        const servico = await servicoModel.obterTodos();        
        return res.status(200).json(servico);
    }

    async obterPorId(req, res){
        const id = req.params.id;
        const servico = await servicoModel.obterPorId(id);        
        return res.status(200).json(servico);
    }

    async adicionar(req, res){
        const {nome} = req.body;
        const servico = new ServicoModel(0, nome);

        try {
            await servicoModel.adicionar(servico);
            return res.status(200).json({message: 'Serviço cadastrado com sucesso'});
        } catch (error) {
            console.log('Erro ao adicionar serviço', error);
            return res.status(500).json({message: 'Erro ao cadastrar serviço'});
        }

    }

    async atualizar(req, res){
        const id = req.params.id;
        const {nome} = req.body;
        const servico = new ServicoModel(id, nome);
        try {
            await servicoModel.atualizar(id, servico);
            return res.status(200).json({message: 'Serviço atualizado com sucesso'});
        } catch (error) {
            console.log('Erro ao adicionar serviço', error);
            return res.status(500).json({message: 'Erro ao atualizar serviço'});
        }

    }

    async excluir(req, res){
        const id = req.params.id;
        try {
            await servicoModel.excluir(id);
            return res.status(200).json({message: 'Serviço excluído com sucesso'});
        } catch (error) {
            console.log('Erro ao excluir serviço', error);
            return res.status(500).json({message: 'Erro ao excluir serviço'});
        }
    }

    async filtrar(req, res){
        const termoBusca = req.params.termoBusca;
        const servico = await servicoModel.filtrar(termoBusca);        
        return res.status(200).json(servico);
    }

}

module.exports = ServicoController;