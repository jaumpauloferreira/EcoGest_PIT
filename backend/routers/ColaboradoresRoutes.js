const ColaboradorController = require('../controller/ColaboradorController')
const colaboradorController = new ColaboradorController();
const express = require('express');
const router =express.Router();
router.get('/Colaborador',colaboradorController.obterTodos)
router.get('/Colaborador/:id',colaboradorController.obterPorId)
router.post('/Colaborador',colaboradorController.adicionar)
router.put('/Colaborador/:id',colaboradorController.atualizar)
router.delete('/Colaborador/:id',colaboradorController.excluir)
router.get('/Colaborador/filtrar/:termobusca',colaboradorController.filtrar)

module.exports=router;