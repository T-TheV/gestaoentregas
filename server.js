const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

const porta = process.env.PORTA
//sets
app.set('view engine', 'ejs');


//Métodos Get para renderizar as páginas
app.get('/', (req, res) => {
  res.render('index');
})

app.get('/home', (req, res) => {
  res.render('homeCliente');
})

app.get('/admin', (req, res) => {
  res.render('homeAdmin');
})



app.listen(porta, () => {
  console.log(`App de exemplo esta rodando em http://localhost:${porta}`)
})