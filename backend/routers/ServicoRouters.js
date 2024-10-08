const ServicoController = require('../controller/ServicoController');
const servicoController = new ServicoController();

const express = require('express');
const router = express.Router();
router.get('/servico', servicoController.obterTodos);
router.get('/servico/:id', servicoController.obterPorId);
router.post('/servico',servicoController.adicionar);
router.put('/servico/:id',servicoController.atualizar);
router.delete('/servico/:id',servicoController.excluir);
router.get('/servico/filtrar/:termoBusca',servicoController.filtrar);

module.exports = router;