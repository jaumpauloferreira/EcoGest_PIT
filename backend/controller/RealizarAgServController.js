const RealizarAgServModel = require("../model/entidades/RealizarAgServModel");
const ServicoModel = require("../model/entidades/ServicoModel");

class RealizarAgServController {
    async obterTodos(req, res) {
        try {
            const realizarAgServModel = new RealizarAgServModel();
            const listaAgServ = await realizarAgServModel.obterTodos();
            return res.status(200).json(listaAgServ);
        } catch (error) {
            console.error('Erro ao obter todos os serviços:', error);
            return res.status(500).json({ message: 'Erro ao obter todos os serviços.' });
        }
    }

    async obterPorId(req, res) {
        const id = req.params.id;
        try {
            const realizarAgServModel = new RealizarAgServModel();
            const listaAgServ = await realizarAgServModel.obterPorId(id);
            console.log('Dados do agendamento por ID:', listaAgServ); // Log dos dados retornados
            if (listaAgServ) {
                return res.status(200).json(listaAgServ);
            } else {
                return res.status(404).json({ message: 'Serviço não encontrado.' });
            }
        } catch (error) {
            console.error('Erro ao obter serviço por ID:', error);
            return res.status(500).json({ message: 'Erro ao obter serviço.' });
        }
    }

    async adicionar(req, res) {
        console.log(req.body); // Verifique se os dados estão sendo recebidos corretamente
    
        const { 
            nomeSolicitante, 
            cpfSolicitante, 
            contatoSolicitante, 
            endereco, 
            bairro, 
            numero, 
            tipoServico, 
            data, 
            horario, 
            descricaoServico 
        } = req.body;
    
        // Verificação de campos obrigatórios
        if (!nomeSolicitante || !cpfSolicitante || !contatoSolicitante || !endereco || !bairro || !numero || !tipoServico || !data || !horario || !descricaoServico) {
            return res.status(400).json({ message: 'Por favor, informe todos os dados do serviço.' });
        }
    
        try {
            const servicoModel = new ServicoModel();
            // Correção para usar o ID do tipo de serviço diretamente
            const tipoServicoData = await servicoModel.obterPorId(tipoServico);
    
            if (!tipoServicoData) {
                return res.status(400).json({ message: 'Tipo de serviço inválido.' });
            }
    
            // Criação do novo serviço agendado
            const listaAgServ = new RealizarAgServModel(
                0, // ID será gerado automaticamente
                nomeSolicitante,
                cpfSolicitante,
                contatoSolicitante,
                endereco,
                bairro,
                numero,
                tipoServico, // Passar o ID do tipo de serviço
                data,
                horario,
                descricaoServico
            );
    
            await listaAgServ.adicionar();
    
            return res.status(200).json({ message: 'Serviço cadastrado com sucesso.' });
        } catch (error) {
            console.error('Erro ao adicionar serviço:', error);
            return res.status(500).json({ message: 'Erro ao cadastrar serviço.' });
        }
    }



async excluir(req, res) {
    const id = parseInt(req.params.id, 10); // Garantir que o ID seja um número

    console.log('ID recebido para exclusão:', id); // Verifique o valor do ID

    if (!id) {
        return res.status(400).json({ message: 'Por favor, informe o ID do serviço para exclusão.' });
    }

    try {
        const listaAgServ = new RealizarAgServModel();
        listaAgServ.id = id;

        await listaAgServ.excluir();

        return res.status(200).json({ message: 'Serviço excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir serviço:', error);
        return res.status(500).json({ message: 'Erro ao excluir serviço.' });
    }
}

// async atualizar(req, res) {
//     const id = req.params.id;
//     const {
//         nomeSolicitante,
//         cpfSolicitante,
//         contatoSolicitante,
//         endereco,
//         bairro,
//         numero,
//         tipoServico,
//         data,
//         horario,
//         descricaoServico
//     } = req.body;

//     console.log('Dados recebidos para atualização:', req.body); // Adicionado para debug

//     if (!nomeSolicitante || !cpfSolicitante || !contatoSolicitante || !endereco || !bairro || !numero || !tipoServico || !data || !horario || !descricaoServico) {
//         return res.status(400).json({ message: 'Por favor, informe todos os dados do serviço.' });
//     }

//     try {
//         const listaAgServ = new RealizarAgServModel(
//             id,
//             nomeSolicitante,
//             cpfSolicitante,
//             contatoSolicitante,
//             endereco,
//             bairro,
//             numero,
//             tipoServico,
//             data,
//             horario,
//             descricaoServico
//         );

//         await listaAgServ.atualizar();
//         return res.status(200).json({ message: 'Serviço atualizado com sucesso.' });
//     } catch (error) {
//         console.error('Erro ao atualizar serviço:', error);
//         return res.status(500).json({ message: 'Erro ao atualizar serviço.', error: error.message });
//     }
// }

async atualizar(req, res) {
    const id = req.params.id;
    const {
        nomeSolicitante,
        cpfSolicitante,
        contatoSolicitante,
        endereco,
        bairro,
        numero,
        tipoServico, // Suponho que esse campo seja o ID do tipo de serviço
        data,
        horario,
        descricaoServico
    } = req.body;

    console.log('Dados recebidos para atualização:', req.body); // Adicionado para debug

    if (!nomeSolicitante || !cpfSolicitante || !contatoSolicitante || !endereco || !bairro || !numero || !tipoServico || !data || !horario || !descricaoServico) {
        return res.status(400).json({ message: 'Por favor, informe todos os dados do serviço.' });
    }

    try {
        const listaAgServ = new RealizarAgServModel(
            id,
            nomeSolicitante,
            cpfSolicitante,
            contatoSolicitante,
            endereco,
            bairro,
            numero,
            tipoServico, // Certifique-se de que esse campo é realmente o ID do tipo de serviço
            data,
            horario,
            descricaoServico
        );

        await listaAgServ.atualizar(tipoServico); // Passe o tipo de serviço aqui
        return res.status(200).json({ message: 'Serviço atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar serviço:', error);
        return res.status(500).json({ message: 'Erro ao atualizar serviço.', error: error.message });
    }
}

    async filtrar(req, res) {
        const termoBusca = req.params.termoBusca || "";

        try {
            const realizarAgServModel = new RealizarAgServModel();
            const listaAgServ = await realizarAgServModel.filtrar(termoBusca);
            return res.status(200).json(listaAgServ);
        } catch (error) {
            console.error('Erro ao filtrar serviços:', error);
            return res.status(500).json({ message: 'Erro ao filtrar serviços.' });
        }
    }
}

module.exports = RealizarAgServController;