// Importa o módulo Express
const express = require('express');
const dotenv = require('dotenv');

// Configurando a env
dotenv.config()

// Cria uma instância do Express
const app = express();

// Define a porta em que o servidor irá rodar
const porta = process.env.PORTA

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Array que armazenará os livros (em memória)
const livros = [];

/*
  Endpoint GET para recuperar todos os livros.
  Ao acessar a rota GET /livros, o servidor retorna o array de livros.
*/
app.get('/livros', (req, res) => {
  try {
    if (livros.length === 0) {
      return res.status(200).json({ msg: "Não há livros a serem exibidos!" })
    }
    res.status(200).json(livros);
  }
  catch (error) {
    res.status(500).json(
      {
        msg: "Erro ao buscar livros!",
        erro: error.message
      })
  }

});

//pelo id:
app.get('/livros/:id', (req, res) => {
  try {
    const id = req.params.id;
    const livro = livros.find(elemento => elemento.id === id)

    if (!livro) {
      return res.status(404).json({ msg: "Livro não encontrado!" })
    }

    res.status(200).json(livro);
  }
  catch (error) {
    res.status(500).json(
      {
        msg: "Erro ao buscar livro!",
        erro: error.message
      })
  }

});

/*
  Endpoint POST para cadastrar um novo livro.
  Os dados devem incluir os campos obrigatórios:
  id, titulo, autor, anoPublicacao, genero e sinopse.
*/
app.post('/livros', (req, res) => {
  // Extrai os dados do corpo da requisição
  try {
    const { id, titulo, autor, anoPublicacao, genero, sinopse } = req.body;

    // Validação para verificar se todos os campos obrigatórios foram enviados
    if (!id || !titulo || !autor || !anoPublicacao || !genero || !sinopse) {
      return res.status(400).json({
        error: 'Dados incompletos! Os campos id, titulo, autor, anoPublicacao, genero e sinopse são obrigatórios.'
      });
    }
    const novoLivro = { id, titulo, autor, anoPublicacao, genero, sinopse };
    livros.push(novoLivro);
    return res.status(201).json(novoLivro);
  }
  catch (error) {
    res.status(500).json
      ({ error: "Erro ao cadastrar livros!" })
  }
});


// Rota para editar o livro
// http://localhost:3000/livros/1
// Rota para editar o livro
app.put('/livros/:id', (req, res) => {
  try {
    // Pegando o id da rota
    const id = req.params.id;
    const { novoTitulo, novoAutor, novoAnoPublicacao, novoGenero, novaSinopse } = req.body;

    // Busca o livro com o id fornecido
    const livro = livros.find(elemento => elemento.id === id); // Usando parseIntid para garantir que seja tratado como número

    // Se o livro não for encontrado
    if (!id) {
      return res.status(404).json({ error: "Informe um parâmetro" })
    }
    if (!livro) {
      return res.status(404).json({ error: "Livro não encontrado!" });
    }
    if (livro) {
      // Atualiza os dados do livro
      livro.titulo = novoTitulo || livro.titulo;
      livro.autor = novoAutor || livro.autor;
      livro.anoPublicacao = novoAnoPublicacao || livro.anoPublicacao;
      livro.genero = novoGenero || livro.genero;
      livro.sinopse = novaSinopse || livro.sinopse;

      // Retorna o livro atualizado
      return res.status(200).json({ msg: 'Livro atualizado com sucesso!' });

    }

  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar livro!" });
  }
});

app.delete("/livros", (req, res) => {
  try {
    livros.length = 0;
    res.status(200).json({ mensagem: 'Tudo deletado!' })
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar tudo!" })
  }
})

app.delete("/livros/:id", (req, res) => {
  try {
    const id = req.params.id;
    const index = livros.findIndex(elemento => elemento.id === id)
    if (index === -1) {
      return res.status(404).json({ msg: "Livro não encontrado!" })
    }
    livros.splice(index, 1)
    res.status(200).json({ mensagem: "Livro deletado com sucesso!" })
  }
  catch (error) {
    res.status(500).json(
      { msg: "Erro ao deletar o parametro do banco de dados!" ,
        erro: error.message}
      )
  }
})





// Inicia o servidor
app.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}, acesse: http://localhost:${porta}`);
});