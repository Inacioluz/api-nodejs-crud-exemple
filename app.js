const { v4: uuidv4 } = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Simula um banco de dados em JSON
const dbPath = './database.json';

// Middleware para carregar dados do banco de dados
app.use((req, res, next) => {
  const data = fs.readFileSync(dbPath, 'utf8');
  req.db = JSON.parse(data);
  next();
});

// Rota para obter todos os itens
app.get('/items', (req, res) => {
  res.json(req.db.items);
});

// Rota para obter um item específico
app.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const item = req.db.items.find((i) => i.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item não encontrado');
  }
});

// Rota para adicionar um novo item
app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = uuidv4();
  req.db.items.push(newItem);
  saveDatabase(req.db);
  res.json(newItem);
});

// Rota para atualizar um item existente
app.put('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  const index = req.db.items.findIndex((i) => i.id === itemId);

  if (index !== -1) {
    req.db.items[index] = updatedItem;
    saveDatabase(req.db);
    res.json(updatedItem);
  } else {
    res.status(404).send('Item não encontrado');
  }
});

// Rota para excluir um item
app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const index = req.db.items.findIndex((i) => i.id === itemId);

  if (index !== -1) {
    const deletedItem = req.db.items.splice(index, 1)[0];
    saveDatabase(req.db);
    res.json(deletedItem);
  } else {
    res.status(404).send('Item não encontrado');
  }
});

// Função para salvar o banco de dados
function saveDatabase(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
