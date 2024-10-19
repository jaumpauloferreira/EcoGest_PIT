const RealizarAgServController = require('../controller/RealizarAgServController');
const realizarAgServController = new RealizarAgServController(); // Cria uma instância do controlador
const express = require('express');
const router = express.Router();

// Define as rotas e associa com os métodos do controller
router.get('/realizaragserv', realizarAgServController.obterTodos.bind(realizarAgServController));
router.get('/realizaragserv/:id', realizarAgServController.obterPorId.bind(realizarAgServController));
router.post('/realizaragserv', realizarAgServController.adicionar.bind(realizarAgServController));

// Atualização de serviço agendado com o ID vindo da URL
router.put('/realizaragserv/:id', realizarAgServController.atualizar.bind(realizarAgServController));

// Exclusão de serviço agendado com o ID vindo da URL
router.delete('/realizaragserv/:id', realizarAgServController.excluir.bind(realizarAgServController));

// Filtro de serviços agendados por termo de busca
router.get('/realizaragserv/filtrar/:termoBusca', realizarAgServController.filtrar.bind(realizarAgServController));

module.exports = router;