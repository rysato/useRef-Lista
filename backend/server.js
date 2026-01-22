const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3001;
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./lista.db', (err) => {
  if (err) console.error(err.message);
  else console.log('Conectado ao banco de dados SQLite.');
});

db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id TEXT PRIMARY KEY,
    nome TEXT
)`);

app.get('/produtos', (req, res) => {
  db.all("SELECT * FROM produtos", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/produtos', (req, res) => {
  const { id, nome } = req.body;
  db.run(`INSERT INTO produtos (id, nome) VALUES (?, ?)`, [id, nome], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Produto adicionado", id, nome });
  });
});

app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM produtos WHERE id = ?`, id, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Produto deletado" });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});