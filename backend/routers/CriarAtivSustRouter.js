const CriarAtivSustController = require('../controller/CriarAtivSustController');
const criarAtivSustController = new CriarAtivSustController(); // Cria uma instância do controlador
const express = require('express');
const router = express.Router();

// Define as rotas e associa com os métodos do controller
router.get('/criarativsust', criarAtivSustController.obterTodos.bind(criarAtivSustController));
router.get('/criarativsust/:id', criarAtivSustController.obterPorId.bind(criarAtivSustController));
router.post('/criarativsust', criarAtivSustController.adicionar.bind(criarAtivSustController));

// Atualização de atividade sustentável com o ID vindo da URL
router.put('/criarativsust/:id', criarAtivSustController.atualizar.bind(criarAtivSustController));

// Exclusão de atividade sustentável com o ID vindo da URL
router.delete('/criarativsust/:id', criarAtivSustController.excluir.bind(criarAtivSustController));

// Filtro de atividades sustentáveis por termo de busca
router.get('/criarativsust/filtrar/:termoBusca', criarAtivSustController.filtrar.bind(criarAtivSustController));

module.exports = router;
