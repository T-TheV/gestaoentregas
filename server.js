const express = require("express"); // Importar o express
const dotenv = require("dotenv"); // Importar o dotenv
const alunoRoutes = require('./src/modules/entrega/routes/entregaRoute'); // Importar as rotas do módulo aluno

dotenv.config(); // Carregar as variáveis de ambiente

const port = process.env.PORTA || 3000; // Fallback para a porta 3000
const app = express();

app.use(express.json());

// Registrar as rotas do módulo aluno
app.use(alunoRoutes);

// Middleware para tratar rotas inexistentes
app.use((req, res) => {
    res.status(404).json({ error: "Rota não encontrada" });
});

// Middleware para tratar erros gerais
app.use((erro, req, res) => {
    console.error(erro.stack);
    res.status(500).json({ erro: "Erro interno do servidor" });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});