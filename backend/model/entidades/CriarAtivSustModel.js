const Database = require("../database");
const database = new Database();
const AtividadeModel = require("./AtividadeModel");

class CriarAtivSustModel {
    // Atributos privados (prefixados com #) para encapsulamento
    #id;
    #nome;
    #cpf;
    #contato;
    #endereco;
    #bairro;
    #numero;
    #tipoAtividade;
    #data;
    #horaInicial;
    #horaFinal;
    #descricao;

    constructor(id = 0, nome = "", cpf = "", contato = "", endereco = "", bairro = "", numero = "", tipoAtividadeId = null, data = null, horaInicial = null, horaFinal = null, descricao = "") {
        this.#id = id;  // Certifica-se de que o ID está corretamente atribuído
        this.#nome = nome;
        this.#cpf = cpf;
        this.#contato = contato;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#numero = numero;
        this.#data = data;
        this.#horaInicial = horaInicial;
        this.#horaFinal = horaFinal;
        this.#descricao = descricao;

        // Carrega o tipo de atividade associado, se o ID for fornecido
        if (tipoAtividadeId) {
            this.#tipoAtividade = new AtividadeModel();
            this.#tipoAtividade.id = tipoAtividadeId;
        }
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
            criar_nome: this.#nome,
            criar_cpf: this.#cpf,
            criar_contato: this.#contato,
            criar_endereco: this.#endereco,
            criar_bairro: this.#bairro,
            criar_numero: this.#numero,
            id: this.#tipoAtividade ? this.#tipoAtividade.id : null, // Garantir que o ID do tipo de atividade seja usado corretamente
            criar_data: this.#data,
            criar_horarioInicial: this.#horaInicial,
            criar_horarioFinal: this.#horaFinal,
            criar_descricao: this.#descricao,
        };
    }

    // Métodos de CRUD usando database
    async obterTodos() {
        const listaAtivSust = await database.ExecutaComando(`
            SELECT 
                criarativsust.criar_id,
                criarativsust.criar_nome,
                criarativsust.criar_cpf,
                criarativsust.criar_contato,
                criarativsust.criar_data,
                cadtipoativsust.nome AS tipo_atividade
            FROM 
                criarativsust
            JOIN 
                cadtipoativsust ON criarativsust.id = cadtipoativsust.id
            ORDER BY 
                criarativsust.criar_nome ASC
        `);
        return listaAtivSust;
    }

    async obterPorId(id) {
        const result = await database.ExecutaComando('SELECT * FROM criarativsust WHERE criar_id = ?', [id]);
        return result[0];
    }

    async adicionar() {
        const dadosAtividade = this.toJSON();
        const query = `
            INSERT INTO criarativsust (
                criar_nome, criar_cpf, criar_contato, criar_endereco, criar_bairro, 
                criar_numero, id, criar_data, criar_horarioInicial, criar_horarioFinal, criar_descricao
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const valores = [
            dadosAtividade.criar_nome, 
            dadosAtividade.criar_cpf, 
            dadosAtividade.criar_contato, 
            dadosAtividade.criar_endereco,
            dadosAtividade.criar_bairro, 
            dadosAtividade.criar_numero, 
            dadosAtividade.id,
            dadosAtividade.criar_data, 
            dadosAtividade.criar_horarioInicial, 
            dadosAtividade.criar_horarioFinal,
            dadosAtividade.criar_descricao
        ];
        await database.ExecutaComandoNonQuery(query, valores);
    }

    // Método atualizar ajustado
    async atualizar() {
        const dadosAtividade = this.toJSON();
        const query = `
            UPDATE criarativsust SET 
                criar_nome = ?, 
                criar_cpf = ?, 
                criar_contato = ?, 
                criar_endereco = ?, 
                criar_bairro = ?, 
                criar_numero = ?, 
                id = ?, 
                criar_data = ?, 
                criar_horarioInicial = ?, 
                criar_horarioFinal = ?, 
                criar_descricao = ?
            WHERE criar_id = ?
        `;
    
        const valores = [
            dadosAtividade.criar_nome,
            dadosAtividade.criar_cpf,
            dadosAtividade.criar_contato,
            dadosAtividade.criar_endereco,
            dadosAtividade.criar_bairro,
            dadosAtividade.criar_numero,
            dadosAtividade.id,
            dadosAtividade.criar_data,
            dadosAtividade.criar_horarioInicial,
            dadosAtividade.criar_horarioFinal,
            dadosAtividade.criar_descricao,
            this.#id
        ];
    
        try {
            console.log('Atualizando atividade com ID:', this.#id);
            await database.ExecutaComandoNonQuery(query, valores);
            console.log('Atualização realizada com sucesso.');
        } catch (error) {
            console.error('Erro ao atualizar a atividade:', error);
        }
    }

    async excluir() {
        await database.ExecutaComandoNonQuery('DELETE FROM criarativsust WHERE criar_id = ?', [this.#id]);
    }

    async filtrar(termoBusca) {
        const atividadesSust = await database.ExecutaComando('SELECT * FROM criarativsust WHERE criar_nome LIKE ?', [`%${termoBusca}%`]);
        return atividadesSust;
    }
}

module.exports = CriarAtivSustModel;
