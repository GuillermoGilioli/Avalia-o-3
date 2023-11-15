//Professor o Crud é no produtos onde tem o
const conteudo = document.querySelector('#conteudo');

function menu(link) {

    fetch('LINDOMAR/' + link + '.html')
        .then(response => response.text())
        .then(html => conteudo.innerHTML = html)
        .catch(error => console.innerHTML = 'Página não encontrada')
}
function salvar() {
    const cliente = {};
    const campoNome = document.querySelector('#nome');
    const campoEmail = document.querySelector('#email');
    cliente.nome = campoNome.value;
    cliente.email = campoEmail.value;
    cliente.id = document.querySelector('#id').value;
    campoNome.value = ''
    campoEmail.value = ''

    if (cliente.id) {
        atualizar(cliente);
    } else {

        fetch('https://cruddd-fa5b0-default-rtdb.firebaseio.com/clientes.json', {
            method: 'POST',
            body: JSON.stringify({
                nome: cliente.nome,
                email: cliente.email,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                carregar();
            })
            .catch(error => console.log(error));
    }
}
const clientes = [];
function carregar() {

    fetch('https://cruddd-fa5b0-default-rtdb.firebaseio.com/clientes.json')
        .then(response => response.json())
        .then(data => {
            const lista = document.querySelector('#lista');
            lista.innerHTML = '';
            for (const key in data) {
                const cliente = data[key];
                cliente.id = key;
                clientes.push(cliente);
                const li = document.createElement('li');
                li.innerHTML = cliente.nome;
                li.innerHTML += '<button class="editar" data-key="' + key + '">Editar</button>';
                li.innerHTML += '<button class="excluir" data-key="' + key + '">Excluir</button>';
                lista.appendChild(li);


                const editarButtons = document.querySelectorAll('.editar');
                editarButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const key = button.dataset.key;
                        editar(key);
                    });
                });
                const excluirButtons = document.querySelectorAll('.excluir');
                excluirButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const key = button.dataset.key;
                        remover(key);
                    });
                });
            }
        })
        .catch(error => console.log(error))
}
document.body.onload = carregar();

function editar(key) {
    const cliente = clientes.find(item => item.id === key);
    document.querySelector('#nome').value = cliente.nome;
    document.querySelector('#email').value = cliente.email;
    document.querySelector('#id').value = cliente.id;
}

function atualizar(cliente) {
    fetch('https://cruddd-fa5b0-default-rtdb.firebaseio.com/clientes/' + cliente.id + '.json', {
        method: 'PUT',
        body: JSON.stringify({
            email: cliente.email,
            nome: cliente.nome
        })
    })
        .then(response => response.json())
        .then(() => carregar())
        .catch(error => console.log(error))

}
function remover(key) {
    fetch(`https://cruddd-fa5b0-default-rtdb.firebaseio.com/clientes/${key}.json`, {
        method: 'DELETE',

    })
        .then(response => response.json())
        .then(() => carregar())
        .catch(error => console.log(error))
}