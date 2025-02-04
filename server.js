// Importando as dependências
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const db = new sqlite3.Database('ramais.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Banco de dados conectado com sucesso');
    }
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Criando a tabela de ramais, caso não exista
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS ramais (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        numero TEXT,
        descricao TEXT,
        centro_custo TEXT
    )`);
});

// Rota para obter todos os ramais
app.get('/api/ramais', (req, res) => {
    db.all('SELECT * FROM ramais', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log('Consulta realizada. Dados encontrados:', rows); // Log no terminal
        res.json(rows);
    });
});

// Rota para adicionar um ramal
app.post('/api/ramais', (req, res) => {
    const { nome, numero, descricao, centro_custo } = req.body;
    db.run(
        'INSERT INTO ramais (nome, numero, descricao, centro_custo) VALUES (?, ?, ?, ?)',
        [nome, numero, descricao, centro_custo],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            console.log(`Ramal adicionado: ID ${this.lastID}, Nome: ${nome}, Número: ${numero}`);
            res.json({ id: this.lastID, nome, numero, descricao, centro_custo });
        }
    );
});

// Rota para editar um ramal
app.put('/api/ramais/:id', (req, res) => {
    const { id } = req.params;
    const { nome, numero, descricao, centro_custo } = req.body;
    db.run(
        'UPDATE ramais SET nome = ?, numero = ?, descricao = ?, centro_custo = ? WHERE id = ?',
        [nome, numero, descricao, centro_custo, id],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            console.log(`Ramal atualizado: ID ${id}, Nome: ${nome}, Número: ${numero}`);
            res.json({ updatedID: id, nome, numero, descricao, centro_custo });
        }
    );
});

// Rota para remover um ramal
app.delete('/api/ramais/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM ramais WHERE id = ?', id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log(`Ramal removido: ID ${id}`);
        res.json({ deletedID: id });
    });
});

// Iniciando o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
