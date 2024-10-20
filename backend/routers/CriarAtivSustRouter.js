const CriarAtivSustController = require('../controller/CriarAtivSustController');
const criarAtivSustController = new CriarAtivSustController(); // Instância do controlador
const express = require('express');
const router = express.Router();

// Rotas associadas aos métodos do controlador de atividades sustentáveis

// Rota para obter todas as atividades sustentáveis
router.get('/criarativsust', criarAtivSustController.obterTodos.bind(criarAtivSustController));

// Rota para obter uma atividade sustentável por ID
router.get('/criarativsust/:id', criarAtivSustController.obterPorId.bind(criarAtivSustController));

// Rota para adicionar uma nova atividade sustentável
router.post('/criarativsust', criarAtivSustController.adicionar.bind(criarAtivSustController));

// Rota para atualizar uma atividade sustentável existente pelo ID
router.put('/criarativsust/:id', criarAtivSustController.atualizar.bind(criarAtivSustController));

// Rota para excluir uma atividade sustentável pelo ID
router.delete('/criarativsust/:id', criarAtivSustController.excluir.bind(criarAtivSustController));

// Rota para filtrar atividades sustentáveis por um termo de busca
router.get('/criarativsust/filtrar/:termoBusca', criarAtivSustController.filtrar.bind(criarAtivSustController));

module.exports = router;
