// Importa o módulo Express
const express = require('express');
// Importa o módulo de banco de dados
const { pool } = require('../catalogoLivros/src/config/database');
// Importa o módulo dotenv
const dotenv = require('dotenv');

// Configurando a env
dotenv.config()

// Cria uma instância do Express
const app = express();

// Define a porta em que o servidor irá rodar
const portaServidor = process.env.PORTA

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

/************************
 * ROTAS GET
 ************************/

// Endpoint GET para recuperar todos os livros.
app.get('/livros', async (req, res) => {
  try {
    const consultaLivros = `SELECT * FROM livros`;
    const livros = await pool.query(consultaLivros);
    if (livros.rows.length === 0) {
      return res.status(200).json({ msg: "Não há livros a serem exibidos!" });
    }
    res.status(200).json(livros.rows);
  }
  catch (erro) {
    res.status(500).json({
      msg: "Erro ao buscar livros!",
      erro: erro.message
    });
  }
});

// Endpoint GET para recuperar um livro específico pelo id
app.get('/livros/:id', async (req, res) => {
  try {
    const idLivro = req.params.id;
    const consultaLivro = `SELECT * FROM livros WHERE id = $1`;
    const resultado = await pool.query(consultaLivro, [idLivro]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ msg: "Livro não encontrado!" });
    }

    res.status(200).json(resultado.rows[0]);
  }
  catch (erro) {
    res.status(500).json({
      msg: "Erro ao buscar livro!",
      erro: erro.message
    });
  }
});

/************************
 * ROTAS POST
 ************************/

// Endpoint POST para cadastrar um novo livro.
app.post('/livros', async (req, res) => {
  try {
    const { titulo, autor, anoPublicacao, genero, sinopse } = req.body;

    // Validação para verificar se todos os campos obrigatórios foram enviados
    if (!titulo || !autor || !anoPublicacao || !genero || !sinopse) {
      return res.status(400).json({
        error: 'Dados incompletos! Os campos titulo, autor, anoPublicacao, genero e sinopse são obrigatórios.'
      });
    }

    const novoLivro = [titulo, autor, anoPublicacao, genero, sinopse];
    const consultaInserirLivro = `INSERT INTO livros (titulo, autor, anoPublicacao, genero, sinopse) 
                                 VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    await pool.query(consultaInserirLivro, novoLivro);

    return res.status(201).json({ msg: "Livro criado com sucesso!" });
  }
  catch (erro) {
    res.status(500).json({ msg: "Erro ao cadastrar livro!", error: erro.message });
  }
});

/************************
 * ROTAS PUT
 ************************/

// Endpoint PUT para editar um livro existente
app.put('/livros/:id', async (req, res) => {
  try {
    const idLivro = req.params.id;
    const { novoTitulo, novoAutor, novoAnoPublicacao, novoGenero, novaSinopse } = req.body;

    const consultaLivroExistente = `SELECT * FROM livros WHERE id = $1`;
    const resultado = await pool.query(consultaLivroExistente, [idLivro]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Livro não encontrado!" });
    }

    const dadosAtualizados = [idLivro, novoTitulo, novoAutor, novoAnoPublicacao, novoGenero, novaSinopse];
    const consultaAtualizarLivro = `
      UPDATE livros 
      SET titulo = $2, autor = $3, anoPublicacao = $4, genero = $5, sinopse = $6 
      WHERE id = $1 
      RETURNING *`;
    await pool.query(consultaAtualizarLivro, dadosAtualizados);

    return res.status(200).json({ msg: 'Livro atualizado com sucesso!' });
  }
  catch (erro) {
    return res.status(500).json({ error: "Erro ao atualizar livro!" });
  }
});

/************************
 * ROTAS DELETE
 ************************/

// Endpoint DELETE para deletar todos os livros
app.delete("/livros", async (req, res) => {
  try {
    const consultaDeletarTodos = `DELETE FROM livros`;
    await pool.query(consultaDeletarTodos);
    res.status(200).json({ mensagem: 'Todos os livros foram deletados!' });
  } catch (erro) {
    res.status(500).json({ msg: "Erro ao deletar livros!" });
  }
});

// Endpoint DELETE para deletar um livro específico pelo id
app.delete("/livros/:id", async (req, res) => {
  try {
    const idLivro = req.params.id;
    const consultaLivroExistente = `SELECT * FROM livros WHERE id = $1`;
    const resultadoId = await pool.query(consultaLivroExistente, [idLivro]);

    if (resultadoId.rows.length === 0) {
      return res.status(404).json({ msg: "Livro não encontrado!" });
    }

    const consultaDeletarLivro = `DELETE FROM livros WHERE id = $1`;
    await pool.query(consultaDeletarLivro, [idLivro]);

    res.status(200).json({ mensagem: "Livro deletado com sucesso!" });
  }
  catch (erro) {
    res.status(500).json({
      msg: "Erro ao deletar o livro do banco de dados!",
      erro: erro.message
    });
  }
});

/************************
 * INICIANDO O SERVIDOR
 ************************/

// Inicia o servidor
app.listen(portaServidor, () => {
  console.log(`Servidor rodando na porta ${portaServidor}, acesse: http://localhost:${portaServidor}`);
});
