const express = require('express');
const entregaController = require('../controllers/entregaController');

const router = express.Router();

router.post('/entregas', entregaController.criar);
router.put('/entregas/:id', entregaController.editar);
router.get('/entregas', entregaController.listar);
router.get('/entregas/:id', entregaController.listarPorMatricula);
router.delete('/entregas/:id', entregaController.excluirPorMatricula);
router.delete('/entregas', entregaController.excluirTodos);

module.exports = router;
