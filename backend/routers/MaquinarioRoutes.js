const MaquinarioController = require('../controller/MaquinarioController.js');
const maquinarioController = new MaquinarioController();
const express = require('express');
const router = express.Router();

router.get('/maquinario', maquinarioController.obterTodos);
router.post('/maquinario', maquinarioController.adicionar);
router.get('/maquinario/:id', maquinarioController.obterPorId);
router.put('/maquinario/:id', maquinarioController.atualizar);
router.delete('/maquinario/:id', maquinarioController.excluir);
router.get('/maquinario/filtrar/:termobusca', maquinarioController.filtrar);

module.exports = router;
