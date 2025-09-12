function cadastrarProduto(event) {
    event.preventDefault(); // evita reload automático

    const nome = document.getElementById('nome').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);

    if (!nome || quantidade <= 0) {
        alert('Digite um nome válido e quantidade maior que 0');
        return;
    }

    fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome, quantidade: quantidade })
    })
    .then(res => {
        if (res.ok) {
            alert('Produto cadastrado com sucesso!');
            window.location.reload(); // recarrega para limpar o formulário
        } else {
            alert('Erro ao cadastrar produto');
        }
    })
    .catch(error => console.log(error));
}