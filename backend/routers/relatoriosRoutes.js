const express = require('express');
const { obterFaturamentoTodasLojas } = require('../controller/relatoriosController');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota de login
router.get('/obter-faturamento-lojas',verifyToken,authorizeRole(['admin','diretor']),obterFaturamentoTodasLojas);


module.exports = router;
