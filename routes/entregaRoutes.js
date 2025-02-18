const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/entregas', (req, res) => {
    res.render('fluxoEntregas');
  })