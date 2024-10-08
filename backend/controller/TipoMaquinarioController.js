const TipoMaquinarioModel = require("../model/entidades/TipoMaquinarioModel");

class TipoMaquinarioController {
    constructor() {
        this.tipoMaquinarioModel = new TipoMaquinarioModel();
    }

    obterTodos = async (req, res) => {
        const tiposMaq = await this.tipoMaquinarioModel.obterTodos();
        return res.status(200).json(tiposMaq);
    }

    obterPorId = async (req, res) => {
        const id = req.params.id;
        const tiposMaq = await this.tipoMaquinarioModel.obterPorId(id);
        return res.status(200).json(tiposMaq);
    }

    adicionar = async (req, res) => {
        const { nome } = req.body;
        const tiposMaq = new TipoMaquinarioModel(0, nome);

        try {
            await this.tipoMaquinarioModel.adicionar(tiposMaq);
            return res.status(200).json({ message: 'Tipo de Maquinário cadastrado com sucesso' });
        } catch (error) {
            console.log('Erro ao adicionar Tipo de Maquinário', error);
            return res.status(500).json({ message: 'Erro ao cadastrar Tipo de Maquinário' });
        }
    }

    atualizar = async (req, res) => {
        const id = req.params.id;
        const { nome } = req.body;
        const tiposMaq = new TipoMaquinarioModel(id, nome);

        try {
            await this.tipoMaquinarioModel.atualizar(id, tiposMaq);
            return res.status(200).json({ message: 'Tipo de Maquinário atualizado com sucesso' });
        } catch (error) {
            console.log('Erro ao adicionar Tipo de Maquinário', error);
            return res.status(500).json({ message: 'Erro ao atualizar Tipo de Maquinário' });
        }
    }

    excluir = async (req, res) => {
        const id = req.params.id;
        try {
            await this.tipoMaquinarioModel.excluir(id);
            return res.status(200).json({ message: 'Tipo de Maquinário excluído com sucesso' });
        } catch (error) {
            console.log('Erro ao excluir Tipo de Maquinário', error);
            return res.status(500).json({ message: 'Erro ao excluir Tipo de Maquinário' });
        }
    }

    filtrar = async (req, res) => {
        const termoBusca = req.params.termoBusca;
        const tiposMaq = await this.tipoMaquinarioModel.filtrar(termoBusca);
        return res.status(200).json(tiposMaq);
    }
}

module.exports = TipoMaquinarioController;