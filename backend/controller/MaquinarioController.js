const MaquinarioModel = require("../model/entidades/MaquinarioModel");

const maquinarioModel = new MaquinarioModel
class MaquinarioController {

    async obterTodos(req, res) {
        const maquinarios = await maquinarioModel.obterTodos();
        return res.status(200).json(maquinarios);
    }
    async obterPorId(req,res){
        const id = req.params.id;
        const maquinarios = await maquinarioModel.obterPorId(id);
        return res.status(200).json(maquinarios);
    }
    async adicionar(req, res) {
        const { modelo, placa, ano } = req.body;
        const maquinario = new MaquinarioModel(0, modelo, placa, ano)

        try {
            await maquinarioModel.adicionar(maquinario);
            return res.status(201).json({ message: 'Cadastrado com sucesso!' })
        } catch (error) {
            console.log('Erro ao cadastrar maquinário' + error);
            return res.status(500).json({ error: 'Erro ao cadastrar maquinário' })
        }
    }
    async atualizar(req,res){
        const id =req.params.id;
        const {modelo, placa, ano}=req.body;
        const maquinario = new MaquinarioModel(id, modelo, placa, ano)
        try{
            await maquinarioModel.atualizar(id,maquinario);
            return res.status(201).json({message:'Atualizado com sucesso'})
        }catch (error){
            console.log('Erro ao cadastrar:'+error)
            res.status(500).json({error:'Erro ao atualizar maquinário'})
        }
    }
    async excluir(req, res) {
        const id = req.params.id;
        try {
            await maquinarioModel.delete(id);
            res.status(200).json({ message: 'Maquinário foi Excluído!' });
        } catch (error) {
            console.log('Erro ao excluir maquinário', error);
            res.status(500).json({ error: 'Erro ao excluir maquinário' });
        }
    }
    async filtrar(req,res){
        const termobusca =req.params.termobusca;
        const maquinarios = await maquinarioModel.filtrar(termobusca);
        return res.status(200).json(maquinarios);
    }
}

module.exports = MaquinarioController;