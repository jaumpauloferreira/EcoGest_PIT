const Beneficiario = require("../model/entidades/Beneficiario");
const beneficiario = new Beneficiario();

class BeneficiarioController {
    async obterTodos(req, res) {
        try {
            const lista = await beneficiario.obterTodos();
            return res.status(200).json(lista);
        } catch (error) {
            console.log('Erro ao obter todos os beneficiários:', error);
            return res.status(500).json({ error: 'Erro ao obter todos os beneficiários' });
        }
    }

    async obterPorId(req, res) {
        const id = req.params.id;
        try {
            const beneficiarioEncontrado = await beneficiario.obterPorId(id);
            if (beneficiarioEncontrado) {
                return res.status(200).json(beneficiarioEncontrado);
            } else {
                return res.status(404).json({ error: 'Beneficiário não encontrado' });
            }
        } catch (error) {
            console.log('Erro ao obter beneficiário por ID:', error);
            return res.status(500).json({ error: 'Erro ao obter beneficiário por ID' });
        }
    }

    async adicionar(req, res) {
        const { nome, cpf, contato, email, endereco, bairro, numero, datanascimento } = req.body;
        const novoBeneficiario = new Beneficiario(0, nome, cpf, contato, email, endereco, bairro, numero, datanascimento);

        try {
            const cpfExists = await beneficiario.verificarExistenciaCPF(cpf);
            if (cpfExists) {
                return res.status(400).json({ error: 'CPF já cadastrado. Tente outro CPF.' });
            }
            await beneficiario.adicionar(novoBeneficiario);
            return res.status(201).json({ message: 'Beneficiário cadastrado com sucesso' });
        } catch (error) {
            console.log('Erro ao cadastrar beneficiário:', error);
            return res.status(500).json({ error: 'Erro ao cadastrar beneficiário' });
        }
    }

    async atualizar(req, res) {
        const id = req.params.id;
        const { nome, cpf, contato, email, endereco, bairro, numero, datanascimento } = req.body;
        const beneficiarioAtualizado = new Beneficiario(id, nome, cpf, contato, email, endereco, bairro, numero, datanascimento);

        try {
            await beneficiario.atualizar(id, beneficiarioAtualizado);
            return res.status(200).json({ message: 'Beneficiário atualizado com sucesso' });
        } catch (error) {
            console.log('Erro ao atualizar beneficiário:', error);
            return res.status(500).json({ error: 'Erro ao atualizar beneficiário' });
        }
    }

    async excluir(req, res) {
        const id = req.params.id;

        try {
            await beneficiario.deletar(id);
            return res.status(200).json({ message: 'Beneficiário removido com sucesso' });
        } catch (error) {
            console.log('Erro ao tentar excluir beneficiário:', error);
            return res.status(500).json({ error: 'Erro ao tentar excluir beneficiário' });
        }
    }

    async filtrar(req, res) {
        const termoBusca = req.params.termobusca;

        try {
            const beneficiarios = await beneficiario.filtrar(termoBusca);
            return res.status(200).json(beneficiarios);
        } catch (error) {
            console.log('Erro ao filtrar beneficiários:', error);
            return res.status(500).json({ error: 'Erro ao filtrar beneficiários' });
        }
    }
}

module.exports = BeneficiarioController;
