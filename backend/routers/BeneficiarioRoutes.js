const BeneficiarioController = require('../controller/BeneficiarioController');
const beneficiariosController = new BeneficiarioController();
const express = require('express');
const router = express.Router();

router.get('/beneficiarios', beneficiariosController.obterTodos);
router.get('/beneficiarios/:id', beneficiariosController.obterPorId);
router.post('/beneficiarios', beneficiariosController.adicionar);
router.put('/beneficiarios/:id', beneficiariosController.atualizar);
router.delete('/beneficiarios/:id', beneficiariosController.excluir);
router.get('/beneficiarios/filtrar/:termobusca', beneficiariosController.filtrar);


module.exports = router;
