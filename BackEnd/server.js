
// Váriaveis principais
const express = require("express");
const cors = require("cors");

const { METHODS } = require("http");
const { parse } = require("path");
const app = express(); // Cria o servidor
const port = 3000; // Variável para armazenar a porta

// Para permitir receber JSON nas requisições
app.use(express.json());
app.use(cors());

// Criação de produtos
const produtos = [
    {"id": 1, "nome": "Monitor Gamer 27 polegadas", "quantidade": 25},
    {"id": 2, "nome": "Iphone 16 PRO MAX", "quantidade": 5},
    {"id": 3, "nome": "RTX 4060", "quantidade": 7}
]

let nextId = 4;

// Iniciando o site
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

app.get("/produtos", (req, res) => {
    res.send(produtos)
})

// Método POST
app.post("/produtos", (req, res) => {
    const novoProduto = req.body

    novoProduto.id = nextId++
    produtos.push(novoProduto)

    res.status(201).send(novoProduto)
})


// Método PUT
app.put("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const novoProduto = req.body
    novoProduto.id = id
    const index = produtos.findIndex(produto => produto.id == id)

    if (index != null) {
        produtos[index] = novoProduto
        res.status(204).send(novoProduto)
    } else {
        res.status(404).send(`Produto ${id} não encontrado!`)
    }
})
// Método DELETE
app.delete("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const index = produtos.findIndex(produto => produto.id == id)

    if (index != null) {
        produtos.splice(index, 1)
        res.status(200).send(`Produto com o id ${id} foi excluido com sucesso!`)
    } else {
        res.status(404).send(`Produto ${id} não encontrado!`)
    }
})