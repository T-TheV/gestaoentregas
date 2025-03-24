

```markdown
# 📦 Sistema de Gestão de Entregas para Motoboys

Este projeto consiste no desenvolvimento de uma API RESTful para gerenciamento de entregas de motoboys. A aplicação foi construída como atividade prática para o curso de **Técnico em Desenvolvimento de Sistemas** no **SENAC**.

---

## ✨ Sobre o Projeto

O sistema tem como objetivo permitir o registro, consulta, atualização e exclusão de entregas solicitadas por clientes, simulando o funcionamento de um sistema real utilizado por serviços de delivery e transporte de pequenas encomendas.

---

## 🎯 Objetivos da Atividade

✔️ Criar um sistema simples de gerenciamento de entregas para motoboys.  
✔️ Implementar rotas para **Criar**, **Visualizar**, **Atualizar** e **Excluir** registros (CRUD).  
✔️ Usar **Node.js** e **Express** para construção da API.  
✔️ Trabalhar com **JSON** para entrada e saída de dados.  
✔️ Aplicar boas práticas no código, como **validação de entradas** e **tratamento de erros**.

---

## 📝 Contexto do Problema

Atualmente, serviços de motoboys realizam diversas entregas diárias, e o controle manual dessas informações pode gerar **perdas de informações**, **atrasos** e **desorganização**. A proposta é desenvolver um sistema simples que permita visualizar e gerenciar as entregas de forma eficiente.

Cada entrega deve conter as seguintes informações:

| Campo                     | Descrição                                                          |
|---------------------------|--------------------------------------------------------------------|
| **ID**                   | Identificador único da entrega                                     |
| **Remetente**            | Nome da pessoa ou empresa que solicitou a entrega                 |
| **Destinatário**         | Nome da pessoa que receberá a encomenda                           |
| **Endereço de Coleta**  | Local onde a entrega deve ser coletada                           |
| **Endereço de Destino**  | Local onde a entrega deve ser realizada                           |
| **Data Prevista de Entrega** | Data e hora para a entrega ser realizada                     |
| **Status**               | Estado atual da entrega (ex: 'pendente', 'coletado', 'em trânsito', 'entregue') |

---

## ✅ Funcionalidades da API

A API permite as seguintes ações:

1. **Criar uma nova entrega**
2. **Listar todas as entregas cadastradas**
3. **Buscar uma entrega específica pelo ID**
4. **Atualizar uma entrega**, seja para modificar informações ou alterar o status
5. **Excluir uma entrega**, caso ela seja cancelada

---

## ⚙️ Requisitos Técnicos

- A API foi desenvolvida utilizando **Node.js** + **Express**  
- O sistema armazena os dados **temporariamente em memória** usando um array (não utiliza banco de dados neste estágio)  
- As **requisições** e **respostas** utilizam o formato **JSON**  
- Implementado **tratamento de erros** e **validação de entradas**  
- A API está **documentada com exemplos de requisições**

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos:
- **Node.js** instalado (versão mínima recomendada: 14.x)

### Passos:
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nome-do-repositorio.git

# Acesse a pasta do projeto
cd nome-do-repositorio

# Instale as dependências
npm install

# Execute a aplicação
npm start
```

O servidor irá rodar localmente em `http://localhost:3000`.

---

## 📫 Rotas da API

| Método   | Rota               | Descrição                             |
|----------|--------------------|--------------------------------------|
| `POST`   | `/entregas`        | Criar uma nova entrega               |
| `GET`    | `/entregas`        | Listar todas as entregas             |
| `GET`    | `/entregas/:id`    | Buscar entrega pelo ID               |
| `PUT`    | `/entregas/:id`    | Atualizar informações de uma entrega |
| `DELETE` | `/entregas/:id`    | Excluir uma entrega                  |

---

## 📂 Exemplo de Requisição

### Criar uma entrega (POST `/entregas`)

```json
{
  "remetente": "Loja XYZ",
  "destinatario": "João Silva",
  "enderecoDestino": "Rua das Flores, 123",
  "dataPrevistaEntrega": "2025-03-01T15:00:00Z",
  "status": "coletado"
}
```

### Resposta esperada:
```json
{
  "id": 1,
  "remetente": "Loja XYZ",
  "destinatario": "João Silva",
  "enderecoDestino": "Rua das Flores, 123",
  "dataPrevistaEntrega": "2025-03-01T15:00:00Z",
  "status": "coletado"
}
```

---

## 🛠 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)

---

## ✍️ Autor

**David Jardim**  
Aluno do curso Técnico em Desenvolvimento de Sistemas - SENAC  
Professor: Valtemir Procópio de Lima  

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e está livre para uso não-comercial.
