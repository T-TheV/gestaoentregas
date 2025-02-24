// Importa o módulo Express
const express = require('express');
// Importa o módulo de banco de dados
const {pool} = require('./config/database');
// Importa o módulo dotenv
const dotenv = require('dotenv');

// Configurando a env
dotenv.config()

// Cria uma instância do Express
const app = express();

// Define a porta em que o servidor irá rodar
const porta = process.env.PORTA

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());


/*
  Endpoint GET para recuperar todos os livros.
  Ao acessar a rota GET /livros, o servidor retorna o array de livros.
*/
app.get('/livros', async (req, res) => {
  try {
    const consulta = `select * from livros`;
    const livros = await pool.query(consulta);
    if (livros.rows.length === 0) {
      return res.status(200).json({ msg: "Não há livros a serem exibidos!" })
    }
    res.status(200).json(livros.rows);
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
app.post('/livros', async (req, res) => {
  // Extrai os dados do corpo da requisição
  try {
    const { titulo, autor, anoPublicacao, genero, sinopse } = req.body;

    // Validação para verificar se todos os campos obrigatórios foram enviados
    if ( !titulo || !autor || !anoPublicacao || !genero || !sinopse) {
      return res.status(400).json({
        error: 'Dados incompletos! Os campos id, titulo, autor, anoPublicacao, genero e sinopse são obrigatórios.'
      });
    }
    const novoLivro = [ titulo, autor, anoPublicacao, genero, sinopse ];
    const  consulta = `INSERT INTO livros (titulo, autor, anoPublicacao, genero, sinopse) 
                        VALUES ($1, $2, $3, $4, $5) returning *`;	  
    await pool.query(consulta, novoLivro);

  return res.status(201).json({msg: "Produto criado com sucesso"});
  }
  catch (error) {
    res.status(500).json
      ({ error: "Erro ao cadastrar livros!" })
  }
});


// Rota para editar o livro
// http://localhost:3000/livros/1
// Rota para editar o livro
app.put('/livros/:id', async (req, res) => {
  try {
    // Pegando o id da rota
    const id = req.params.id;
    const { novoTitulo, novoAutor, novoAnoPublicacao, novoGenero, novaSinopse } = req.body;

    // Se o livro não for encontrado
    if (!id) {
      return res.status(404).json({ error: "Informe um parâmetro" });
    }

    // Busca o livro com o id fornecido
    const parametro = [id];
    const consulta = `SELECT * FROM produto WHERE id = $1`;
    const resultado = await pool.query(consulta, parametro);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Livro não encontrado!" });
    }

    const dados = [id, novoTitulo, novoAutor, novoAnoPublicacao, novoGenero, novaSinopse];
    const update = `
      UPDATE livros 
      SET titulo = $2, autor = $3, anoPublicacao = $4, genero = $5, sinopse = $6 
      WHERE id = $1 
      RETURNING *`;
    await pool.query(update, dados);

    // Retorna o livro atualizado
    return res.status(200).json({ msg: 'Livro atualizado com sucesso!' });

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

app.delete("/livros/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const parametroId = [id];
    const consultaId = `SELECT * FROM produto WHERE id = $1`;
    const resultadoId = await pool.query(consultaId, parametroId);

    if (resultadoId.rows.lenght === 0) {
      return res.status(404).json({ msg: "Livro não encontrado!" })
    }
    const deleteQuery = `DELETE FROM livros WHERE id = $1`;
    await pool.query(deleteQuery, parametroId);
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