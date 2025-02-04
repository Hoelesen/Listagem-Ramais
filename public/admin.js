function carregarRamais() {
    fetch('/api/ramais')
        .then(response => response.json())
        .then(data => {
            const tabela = document.getElementById('listaRamais');
            tabela.innerHTML = '';
            data.forEach(ramal => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${ramal.numero}</td>
                    <td>${ramal.nome}</td>
                    <td>${ramal.descricao || '-'}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editarRamal(${ramal.id}, '${ramal.numero}', '${ramal.nome}', '${ramal.descricao || ''}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="excluirRamal(${ramal.id})">Excluir</button>
                    </td>
                `;
                tabela.appendChild(row);
            });
        });
}

function editarRamal(id, numero, nome, descricao) {
    document.getElementById('ramalId').value = id;
    document.getElementById('numero').value = numero;
    document.getElementById('nome').value = nome;
    document.getElementById('descricao').value = descricao;
}

function excluirRamal(id) {
    if (confirm('Tem certeza que deseja excluir este ramal?')) {
        fetch(`/api/ramais/${id}`, { method: 'DELETE' })
            .then(() => carregarRamais());
    }
}

document.getElementById('ramalForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('ramalId').value;
    const numero = document.getElementById('numero').value;
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;

    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `/api/ramais/${id}` : '/api/ramais';

    fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, numero, descricao })
    }).then(() => {
        document.getElementById('ramalForm').reset();
        carregarRamais();
    });
});

document.addEventListener('DOMContentLoaded', carregarRamais);
