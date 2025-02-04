const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('ramais.db');

db.serialize(() => {
    // Criar tabela se não existir
    db.run(`CREATE TABLE IF NOT EXISTS ramais (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        numero TEXT NOT NULL,
        nome TEXT NOT NULL,
        descricao TEXT,
        centro_custo TEXT
    )`);

    console.log('Banco de dados criado com sucesso: ramais.db');
});

db.close();
