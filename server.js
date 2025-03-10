// Importa o módulo Express
const express = require('express');
// Importa o módulo de banco de dados
const { pool } = require('../gestaoentregas/src/config/database');
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

// Endpoint GET para recuperar todas as entregas.
app.get('/entregas', async (req, res) => {
  try {
    const consultaEntregas = `SELECT * FROM entregas`;
    const entregas = await pool.query(consultaEntregas);
    if (entregas.rows.length === 0) {
      return res.status(200).json({ msg: "Não há entregas para exibir!" });
    }
    res.status(200).json(entregas.rows);
  } catch (erro) {
    res.status(500).json({
      msg: "Erro ao buscar entregas!",
      erro: erro.message
    });
  }
});

// Endpoint GET para recuperar uma entrega específica pelo id
app.get('/entregas/:id', async (req, res) => {
  try {
    const idEntrega = req.params.id;
    const consultaEntrega = `SELECT * FROM entregas WHERE id = $1`;
    const resultado = await pool.query(consultaEntrega, [idEntrega]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ msg: "Entrega não encontrada!" });
    }

    res.status(200).json(resultado.rows[0]);
  } catch (erro) {
    res.status(500).json({
      msg: "Erro ao buscar entrega!",
      erro: erro.message
    });
  }
});

/************************
 * ROTAS POST
 ************************/

// Endpoint POST para cadastrar uma nova entrega.
app.post('/entregas', async (req, res) => {
  try {
    const { remetente, destinatario, endereco_destino, data_prevista_entrega } = req.body;

    // Validação para garantir que os campos obrigatórios foram preenchidos
    if (!remetente || !destinatario || !endereco_destino || !data_prevista_entrega) {
      return res.status(400).json({
        error: 'Dados incompletos! Os campos remetente, destinatario, endereco_destino e data_prevista_entrega são obrigatórios.'
      });
    }

    const novaEntrega = [remetente, destinatario, endereco_destino, data_prevista_entrega];
    const consultaInserirEntrega = `INSERT INTO entregas (remetente, destinatario, endereco_destino, data_prevista_entrega) 
                                   VALUES ($1, $2, $3, $4) RETURNING *`;
    await pool.query(consultaInserirEntrega, novaEntrega);

    return res.status(201).json({ msg: "Entrega criada com sucesso!" });
  } catch (erro) {
    res.status(500).json({ msg: "Erro ao cadastrar entrega!", error: erro.message });
  }
});

/************************
 * ROTAS PUT
 ************************/

// Endpoint PUT para editar uma entrega existente
app.put('/entregas/:id', async (req, res) => {
  try {
    const idEntrega = req.params.id;
    const { novoRemetente, novoDestinatario, novoEnderecoDestino, novaDataPrevistaEntrega } = req.body;

    const consultaEntregaExistente = `SELECT * FROM entregas WHERE id = $1`;
    const resultado = await pool.query(consultaEntregaExistente, [idEntrega]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Entrega não encontrada!" });
    }

    const dadosAtualizados = [idEntrega, novoRemetente, novoDestinatario, novoEnderecoDestino, novaDataPrevistaEntrega];
    const consultaAtualizarEntrega = `
      UPDATE entregas 
      SET remetente = $2, destinatario = $3, endereco_destino = $4, data_prevista_entrega = $5 
      WHERE id = $1 
      RETURNING *`;
    await pool.query(consultaAtualizarEntrega, dadosAtualizados);

    return res.status(200).json({ msg: 'Entrega atualizada com sucesso!' });
  } catch (erro) {
    return res.status(500).json({ error: "Erro ao atualizar entrega!" });
  }
});

/************************
 * ROTAS DELETE
 ************************/

// Endpoint DELETE para deletar todos as entregas
app.delete("/entregas", async (req, res) => {
  try {
    const consultaDeletarTodos = `DELETE FROM entregas`;
    await pool.query(consultaDeletarTodos);
    res.status(200).json({ mensagem: 'Todas as entregas foram deletadas!' });
  } catch (erro) {
    res.status(500).json({ msg: "Erro ao deletar entregas!" });
  }
});

// Endpoint DELETE para deletar uma entrega específica pelo id
app.delete("/entregas/:id", async (req, res) => {
  try {
    const idEntrega = req.params.id;
    const consultaEntregaExistente = `SELECT * FROM entregas WHERE id = $1`;
    const resultadoId = await pool.query(consultaEntregaExistente, [idEntrega]);

    if (resultadoId.rows.length === 0) {
      return res.status(404).json({ msg: "Entrega não encontrada!" });
    }

    const consultaDeletarEntrega = `DELETE FROM entregas WHERE id = $1`;
    await pool.query(consultaDeletarEntrega, [idEntrega]);

    res.status(200).json({ mensagem: "Entrega deletada com sucesso!" });
  } catch (erro) {
    res.status(500).json({
      msg: "Erro ao deletar a entrega!",
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
