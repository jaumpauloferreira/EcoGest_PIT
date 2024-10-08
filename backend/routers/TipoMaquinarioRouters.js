const TipoMaquinarioController = require('../controller/TipoMaquinarioController');
const tipoMaquinarioController = new TipoMaquinarioController();

const express = require('express');
const router = express.Router();
router.get('/tipomaquinario', tipoMaquinarioController.obterTodos);
router.get('/tipomaquinario/:id', tipoMaquinarioController.obterPorId);
router.post('/tipomaquinario',tipoMaquinarioController.adicionar);
router.put('/tipomaquinario/:id',tipoMaquinarioController.atualizar);
router.delete('/tipomaquinario/:id',tipoMaquinarioController.excluir);
router.get('/tipomaquinario/filtrar/:termoBusca',tipoMaquinarioController.filtrar);

module.exports = router;