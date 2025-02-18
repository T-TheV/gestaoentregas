const dotenv = require('dotenv').config()
const express = require('express')
const router = express.Router('./routes/entregaRoutes')
const Entrega = require('../models/entrega')



router.get('/fluxoEntregas', async (req, res) => {
    try {
        if(!req.session.user){
            res.redirect('/')
        }
    const entregas = await Entrega.find()
    res.render('fluxoEntregas', { entregas })
} 
catch (error) {
    res.status(400).send('Erro ao buscar entregas')
}

})