const SecretariaModel = require("../model/entidades/SecretariaModel");
const secretariaModel = new SecretariaModel();

class SecretariaController {

    async obterTodos(req, res){
        const secretaria = await secretariaModel.obterTodos();
        return res.status(200).json(secretaria);
    }

    obterPorId = async (req, res) => {
        const id = req.params.id;
        const secretaria = await secretariaModel.obterPorId(id);
        return res.status(200).json(secretaria);
    }

    adicionar = async (req, res) => {
        const { nome_secretaria } = req.body;
        const secretaria = new SecretariaModel(0, nome_secretaria);

        try {
            await secretariaModel.adicionar(secretaria);
            return res.status(200).json({ message: 'Secretaria cadastrado com sucesso' });
        } catch (error) {
            console.log('Erro ao adicionar Secretaria', error);
            return res.status(500).json({ message: 'Erro ao cadastrar Secretaria' });
        }
    }

    atualizar = async (req, res) => {
        const id = req.params.id;
        const { nome_secretaria } = req.body;
        const secretaria = new SecretariaModel(id, nome_secretaria);

        try {
            await secretariaModel.atualizar(id, secretaria);
            return res.status(200).json({ message: 'Secretaria atualizado com sucesso' });
        } catch (error) {
            console.log('Erro ao adicionar Secretaria', error);
            return res.status(500).json({ message: 'Erro ao atualizar Secretaria' });
        }
    }

    excluir = async (req, res) => {
        const id = req.params.id;
        try {
            await secretariaModel.excluir(id);
            return res.status(200).json({ message: 'Secretaria excluído com sucesso' });
        } catch (error) {
            console.log('Erro ao excluir Secretaria', error);
            return res.status(500).json({ message: 'Erro ao excluir Secretaria' });
        }
    }

    filtrar = async (req, res) => {
        const termoBusca = req.params.termoBusca;
        const secretaria = await this.secretariaModel.filtrar(termoBusca);
        return res.status(200).json(secretaria);
    }
}

module.exports = SecretariaController;