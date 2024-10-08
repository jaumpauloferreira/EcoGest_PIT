const AtividadeController = require('../controller/AtividadeController');
const atividadeController = new AtividadeController();
const express = require('express');
const router = express.Router();
router.get('/cadtipoativsust', atividadeController.obterTodos);
router.get('/cadtipoativsust/:id', atividadeController.obterPorId);
router.post('/cadtipoativsust',atividadeController.adicionar);
router.put('/cadtipoativsust/:id',atividadeController.atualizar);
router.delete('/cadtipoativsust/:id',atividadeController.excluir);
router.get('/cadtipoativsust/filtrar/:termoBusca',atividadeController.filtrar);

module.exports = router;