const express = require('express');
const entregaController = require('../controllers/entregaController');

const router = express.Router();

router.post('/', entregaController.criarEntrega);
router.put('/editar/:id', entregaController.editarEntrega);
router.get('/listar', entregaController.listarEntregas);
router.get('/buscar/:id', entregaController.buscarEntrega);
router.delete('/excluir/:id', entregaController.excluirEntrega);
router.delete('/excluirtodas', entregaController.excluirTodasEntregas);

module.exports = router;
