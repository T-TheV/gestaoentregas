const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

app.use(express.json())
const porta = process.env.PORTA




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

app.get('/entregas', async (req, res) => {
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

//Metodo GET pelo id:
app.get('/entregas/:id', (req, res) => {
  try {
    const id = req.params.id;
    const entrega = entregas.find(elemento => elemento.id === id)
    
    if(!entrega){
      return res.status(404).json({msg:"entrega não encontrado!"})
    }
    
  res.status(200).json(entrega);
  } 
  catch (error) {
  res.status(500).json(
    {
      msg: "Erro ao buscar entrega!",
      erro: error.message
  })
  }

});

//Metodos POST pra enviar dados
app.post('/entregas', (req, res) => {
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
      ({ error: `Erro ao cadastrar entrega: ${error.message}`})
  }
});

// Rota para editar a entrega
app.put('/entregas/:id', (req, res) => {
  try {
    // Pegando o id da rota
    const id = req.params.id;
    const { novoRemetente, novoDestinatario, novoEnderecoDestino, novaDataPrevista, novoStatus} = req.body;

    // Busca o entrega com o id fornecido
    const entrega = entregas.find(elemento => elemento.id === id); // Usando parseInt(id) para garantir que seja tratado como número

    // Se o entrega não for encontrado
    if (!id){
      return res.status(404).json({error: "Informe um parâmetro"})
    }
    if (!entrega) {
      return res.status(404).json({ error: "entrega não encontrada!" });
    }
    if (entrega) {
          // Atualiza os dados do entrega
    entrega.remetente = novoRemetente || entrega.remetente;
    entrega.destinatario = novoDestinatario || entrega.destinatario;
    entrega.enderecoDestino = novoEnderecoDestino || entrega.enderecoDestino;
    entrega.dataPrevista = novaDataPrevista || entrega.dataPrevista;
    entrega.status = novoStatus || entrega.status;
    
      // Retorna o entrega atualizado
      return res.status(200).json({msg: 'entrega atualizado com sucesso!'});
      
    }

  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar entrega!" });
  }
});

//Metodo DELETE para deletar entregas

app.delete("/entregas/:id", (req,res) => {
  try {
  const id = req.params.id;
  const entrega = entregas.findIndex(elemento => elemento.id === id)
  if(entrega === -1){
    return res.status(404).json({msg: "entrega não encontrada!"})
  }
  entregas.splice(entrega, 1)
  return res.status(200).json({msg: "entrega deletada com sucesso!"});
} 
  catch (error) {
    res.status(500).json({msg:"Erro ao deletar o parametro do banco de dados!"})
  }
})


app.listen(porta, () => {
  console.log(`App de exemplo esta rodando em http://localhost:${porta}, acesse: http://localhost:${porta}`)
})