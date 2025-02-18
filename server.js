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

// app.get('/home', (req, res) => {
//   res.render('homeCliente');
// })

// app.get('/admin', (req, res) => {
//   res.render('homeAdmin');
// })

const entregas = []

app.get('/fluxoEntregas', async (req, res) => {
  try {
      if (entregas.length === 0) 
          {
        return res.status(200).json({ msg: "Não há entregas a serem feitas!" })
      }
      res.status(200).json(entregas);
  } catch (error) {
      res.status(500).json(
          {
            msg: "Erro ao buscar entregas!",
            erro: error.message
          })
  }
});


//Metodos POST pra enviar dados
app.post('/fluxoEntregas', (req, res) => {
  // Extrai os dados do corpo da requisição
  try {
    const { id, remetente, destinatario, enderecoDestino, dataPrevista, status } = req.body;

    // Validação para verificar se todos os campos obrigatórios foram enviados
    if (!id || !remetente || !destinatario || !enderecoDestino || !dataPrevista || !status) {
      return res.status(400).json({
        error: 'Dados incompletos! Os campos id, remetente, destinatario, enderecoDestino, dataPrevista, status são obrigatórios.'
      });
    }
    const novaEntrega = { id, remetente, destinatario, enderecoDestino, dataPrevista, status };
    entregas.push(novaEntrega);
    return res.status(201).json(novaEntrega);
  }
  catch (error) {
    res.status(500).json
      ({ error: "Erro ao cadastrar entrega!",
        error: error.message
       })
  }
});



app.listen(porta, () => {
  console.log(`App de exemplo esta rodando em http://localhost:${porta}`)
})