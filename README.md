# Documentação do Projeto de Listagem de Ramais

## Requisitos
Para rodar este projeto em um servidor Linux (Debian), é necessário instalar os seguintes pacotes:

- **Node.js** (versão 18 ou superior)
- **NPM** (gerenciador de pacotes do Node.js)
- **SQLite3** (banco de dados leve e portátil)
- **Git** (para versionamento do código)
- **Systemd** (para iniciar automaticamente o servidor)

## Instalação do Ambiente

### 1️⃣ Atualizar o sistema
```sh
sudo apt update && sudo apt upgrade -y
```

### 2️⃣ Instalar dependências
```sh
sudo apt install nodejs npm sqlite3 git -y
```

### 3️⃣ Clonar o repositório
```sh
git clone https://github.com/seuusuario/seurepositorio.git
cd seurepositorio
```

### 4️⃣ Instalar pacotes do Node.js
```sh
npm install
```

### 5️⃣ Configurar o banco de dados SQLite
```sh
node setup.js  # Caso haja um script para criar a estrutura do banco
```

## Executando o Servidor

### 🔹 Iniciar manualmente
```sh
node server.js
```
O servidor estará rodando em **http://localhost:3000**.

### 🔹 Configurar início automático (Systemd)

Criar um arquivo de serviço:
```sh
sudo nano /etc/systemd/system/ramais.service
```
Adicione o seguinte conteúdo:
```ini
[Unit]
Description=Servidor de Ramais em Node.js
After=network.target

[Service]
ExecStart=/usr/bin/node /caminho/para/seu/server.js
WorkingDirectory=/caminho/para/seu/projeto
Restart=always
User=root
Environment=NODE_ENV=production
StandardOutput=file:/var/log/ramais.log
StandardError=file:/var/log/ramais_error.log

[Install]
WantedBy=multi-user.target
```

Salvar e sair (`Ctrl + X`, `Y`, `Enter`).

Recarregar e iniciar o serviço:
```sh
sudo systemctl daemon-reload
sudo systemctl start ramais
sudo systemctl enable ramais
```

Verificar status:
```sh
sudo systemctl status ramais
```

## Testando a API

Para testar as requisições, utilize `curl` ou ferramentas como Postman.

### 📌 Listar todos os ramais
```sh
curl -X GET http://localhost:3000/api/ramais
```

### 📌 Adicionar um ramal
```sh
curl -X POST http://localhost:3000/api/ramais \
-H "Content-Type: application/json" \
-d '{"nome":"Setor TI", "numero":"1001", "descricao":"Suporte", "centro_custo":"TI-001"}'
```

### 📌 Editar um ramal
```sh
curl -X PUT http://localhost:3000/api/ramais/1 \
-H "Content-Type: application/json" \
-d '{"nome":"Setor TI", "numero":"1001", "descricao":"Infraestrutura", "centro_custo":"TI-002"}'
```

### 📌 Deletar um ramal
```sh
curl -X DELETE http://localhost:3000/api/ramais/1
```

## Logs do Servidor
Os logs são armazenados em:
```sh
/var/log/ramais.log  # Logs padrão
/var/log/ramais_error.log  # Logs de erro
```
Para visualizar em tempo real:
```sh
tail -f /var/log/ramais.log
```

## Atualização do Projeto

Caso haja uma nova versão no repositório, atualize com:
```sh
cd /caminho/para/seu/projeto
git pull origin main
npm install
sudo systemctl restart ramais
```

---

Essa documentação cobre os principais passos para instalar, configurar e gerenciar o projeto no Linux (Debian). Caso precise de ajustes, basta modificar conforme sua necessidade! 🚀

