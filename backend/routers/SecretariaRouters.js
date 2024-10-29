const SecretariaController = require('../controller/SecretariaController');
const secretariaController = new SecretariaController();

const express = require('express');
const router = express.Router();
router.get('/secretaria', secretariaController.obterTodos);
router.get('/secretaria/:id', secretariaController.obterPorId);
router.post('/secretaria',secretariaController.adicionar);
router.put('/secretaria/:id',secretariaController.atualizar);
router.delete('/secretaria/:id',secretariaController.excluir);
router.get('/secretaria/filtrar/:termoBusca',secretariaController.filtrar);

module.exports = router;