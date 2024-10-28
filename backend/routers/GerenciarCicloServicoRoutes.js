// Local: backend/routers/GerenciarCicloServicoRoutes.js

const GerenciarCicloServicoController = require('../controller/GerenciarCicloServicoController');
const gerenciarCicloServicoController = new GerenciarCicloServicoController();
const express = require('express');
const router = express.Router();

router.get('/agendamentos', gerenciarCicloServicoController.obterTodos);
router.get('/agendamentos/:id', gerenciarCicloServicoController.obterPorId);
router.post('/agendamentos', gerenciarCicloServicoController.adicionar);
router.put('/agendamentos/:id', gerenciarCicloServicoController.atualizar);
router.delete('/agendamentos/:id', gerenciarCicloServicoController.deletar);
router.put('/agendamentos/:id/status', gerenciarCicloServicoController.atualizarStatus);
router.get('/agendamentos/:id/historico', gerenciarCicloServicoController.obterHistorico);


module.exports = router;
