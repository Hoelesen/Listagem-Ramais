let ramais = [];

function carregarRamais() {
    fetch('/api/ramais')
        .then(response => response.json())
        .then(data => {
            ramais = data;
            exibirRamais(ramais);
        });
}

function exibirRamais(lista) {
    const tabela = document.getElementById('lista');
    tabela.innerHTML = '';
    lista.forEach(ramal => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ramal.numero}</td>
            <td>${ramal.nome}</td>
            <td>${ramal.descricao || '-'}</td>
        `;
        tabela.appendChild(row);
    });
}

function filtrarRamais() {
    const termo = document.getElementById('buscar').value.toLowerCase();
    const filtrados = ramais.filter(ramal => 
        ramal.nome.toLowerCase().includes(termo) || 
        ramal.numero.includes(termo) ||
        (ramal.descricao && ramal.descricao.toLowerCase().includes(termo))
    );
    exibirRamais(filtrados);
}

document.addEventListener('DOMContentLoaded', carregarRamais);
