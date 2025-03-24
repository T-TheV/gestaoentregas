const express = require("express");
const dotenv = require("dotenv");
const entregaRoute = require("./src/modules/entrega/routes/entregaRoute"); // Verifique se esse caminho está correto

dotenv.config();

const port = process.env.PORTA; // Corrigindo o nome da variável de ambiente
const app = express();

app.use(express.json());

// Registrar as rotas corretamente com um prefixo, por exemplo, "/api/entregas"
app.use("/api/entregas", entregaRoute);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
