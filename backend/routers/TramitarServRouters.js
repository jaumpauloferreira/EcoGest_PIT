const TramitarServController = require('../controller/TramitarServController');
const tramitarServController = new TramitarServController();

const express = require('express');
const router = express.Router();

router.get('/tramitarserv', tramitarServController.obterTodos);
router.get('/tramitarserv/:id', tramitarServController.obterPorId);
router.get('/tramitarserv/servico/:id_servico', tramitarServController.obterPorServico);
router.post('/tramitarserv', tramitarServController.adicionar);
router.put('/tramitarserv/:id', tramitarServController.atualizar);
router.delete('/tramitarserv/:id', tramitarServController.excluir);

module.exports = router;