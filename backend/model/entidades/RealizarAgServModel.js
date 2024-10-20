const Database = require("../database");
const database = new Database();
const ServicoModel = require("./ServicoModel");

class RealizarAgServModel {
    // Atributos privados (prefixados com #) para encapsulamento
    #id;
    #nomeSolicitante;
    #cpfSolicitante;
    #contatoSolicitante;
    #endereco;
    #bairro;
    #numero;
    #tipoServico;
    #data;
    #horario;
    #descricaoServico;

    constructor(id = 0, nomeSolicitante = "", cpfSolicitante = "", contatoSolicitante = "", endereco = "", bairro = "", numero = "", tipoServicoId = null, data = null, horario = null, descricaoServico = "") {
        this.#id = id; 
        this.#nomeSolicitante = nomeSolicitante;
        this.#cpfSolicitante = cpfSolicitante;
        this.#contatoSolicitante = contatoSolicitante;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#numero = numero;
        this.#data = data;
        this.#horario = horario;
        this.#descricaoServico = descricaoServico;
    
        // Apenas definir o tipo de serviço pelo ID
        this.#tipoServico = tipoServicoId ? { id: tipoServicoId } : null; 
    }
    // Getters e Setters para cada atributo
    get id() {
        return this.#id;
    }

    set id(novoId) {
        this.#id = novoId;
    }

    // Método toJSON para conversão dos dados em um formato serializável
    toJSON() {
        return {
            agserv_nomeSolicitante: this.#nomeSolicitante,
            agserv_cpfSolicitante: this.#cpfSolicitante,
            agserv_contatoSolicitante: this.#contatoSolicitante,
            agserv_endereco: this.#endereco,
            agserv_bairro: this.#bairro,
            agserv_numero: this.#numero,
            tipoServicoId: this.#tipoServico ? this.#tipoServico.id : null, // Usando tipoServicoId
            agserv_data: this.#data,
            agserv_horario: this.#horario,
            agserv_descricaoServico: this.#descricaoServico,
        };

    }

    // Métodos de CRUD usando database
async adicionar() {
    const dadosServico = this.toJSON();
    const query = `
        INSERT INTO realizaragserv (
            agserv_nomeSolicitante, 
            agserv_cpfSolicitante, 
            agserv_contatoSolicitante, 
            agserv_endereco, 
            agserv_bairro, 
            agserv_numero, 
            agserv_tipoServico_id, 
            agserv_data, 
            agserv_horario, 
            agserv_descricao
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const valores = [
        dadosServico.agserv_nomeSolicitante,
        dadosServico.agserv_cpfSolicitante,
        dadosServico.agserv_contatoSolicitante,
        dadosServico.agserv_endereco,
        dadosServico.agserv_bairro,
        dadosServico.agserv_numero,
        dadosServico.tipoServicoId,
        dadosServico.agserv_data,
        dadosServico.agserv_horario,
        dadosServico.agserv_descricaoServico
    ];
    await database.ExecutaComandoNonQuery(query, valores);
}


    // Método atualizar ajustado
    async atualizar(tipoServicoId) {
        const dadosServico = this.toJSON(); // Se não quiser modificar, pode usar como está
        const query = `
            UPDATE realizaragserv SET 
                agserv_nomeSolicitante = ?, 
                agserv_cpfSolicitante = ?, 
                agserv_contatoSolicitante = ?, 
                agserv_endereco = ?, 
                agserv_bairro = ?, 
                agserv_numero = ?, 
                agserv_data = ?, 
                agserv_horario = ?, 
                agserv_descricao = ?, 
                agserv_tipoServico_id = ?  -- Atualizando o tipo de serviço
            WHERE agserv_id = ?
        `;
    
        const valores = [
            dadosServico.agserv_nomeSolicitante,
            dadosServico.agserv_cpfSolicitante,
            dadosServico.agserv_contatoSolicitante,
            dadosServico.agserv_endereco,
            dadosServico.agserv_bairro,
            dadosServico.agserv_numero,
            dadosServico.agserv_data,
            dadosServico.agserv_horario,
            dadosServico.agserv_descricaoServico, // Aqui deve ser agserv_descricaoServico
            tipoServicoId,
            this.#id
        ];
    
        try {
            console.log('Atualizando serviço com ID:', this.#id);
            await database.ExecutaComandoNonQuery(query, valores);
            console.log('Atualização realizada com sucesso.');
        } catch (error) {
            console.error('Erro ao atualizar o serviço:', error);
        }
    }

    async obterTodos() {
        const listaAgServ = await database.ExecutaComando(`
            SELECT 
                realizarAgServ.agserv_id, 
                realizarAgServ.agserv_nomeSolicitante,
                realizarAgServ.agserv_cpfSolicitante,
                realizarAgServ.agserv_contatoSolicitante,
                realizarAgServ.agserv_data,
                realizarAgServ.agserv_horario,
                realizarAgServ.agserv_descricao,
                cadastrotiposdeservico.nome AS tipo_servico
            FROM 
                realizarAgServ
            JOIN 
                cadastrotiposdeservico ON realizarAgServ.agserv_tipoServico_id = cadastrotiposdeservico.id
            ORDER BY 
                realizarAgServ.agserv_nomeSolicitante ASC

        `);
        return listaAgServ;
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando('SELECT * FROM realizarAgServ WHERE agserv_id = ?', [id]);
        console.log('Resultado da consulta por ID:', result); // Log do resultado da consulta
        return result[0]; // Retorna o primeiro resultado
    }

    async excluir() {
        console.log('ID usado para exclusão no model:', this.#id); // Verifique o valor do ID
        await database.ExecutaComandoNonQuery('DELETE FROM realizarAgServ WHERE agserv_id = ?', [this.#id]); // Corrigido para agserv_id
    }
    

    async filtrar(termoBusca) {
        const servicos = await database.ExecutaComando('SELECT * FROM realizarAgServ WHERE nomeSolicitante LIKE ?', [`%${termoBusca}%`]);
        return servicos;
    }
}

module.exports = RealizarAgServModel;