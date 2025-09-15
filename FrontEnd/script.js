    // Método GET:
    fetch("http://localhost:3000/produtos")
    .then(res => res.json())
    .then(produtos => {
        const listaProdutos = document.querySelector("#conteudo");

        produtos.forEach(produto => {
            listaProdutos.innerHTML += `
            <tr id="linha-${produto.id}">
                <td class="col-3">${produto.id}</td>
                <td class="col-3">${produto.nome}</td>
                <td class="col-3" id="quantidade-${produto.id}">${produto.quantidade}</td>
                <td class="col-3">
                    <div class="d-flex align-items-center">
                        <input class="form-control" type="number" id="qnt-${produto.id}" value="1" style="width: 60px;">
                        <button class="btn btn-outline-dark me-2" onclick="alterarProduto(${produto.id}, '${produto.nome}', true)">+</button>
                        <button class="btn btn-outline-dark" onclick="alterarProduto(${produto.id}, '${produto.nome}', false)">-</button>
                    </div>  
                </td>
                <td class="col-1"><a class="btn btn-outline-primary" href="historico/index.html?id=${produto.id}">Histórico</a></td>
                <td class="col-1"><button class="btn btn-outline-danger" onclick="deletarProduto(${produto.id}, '${produto.nome}')">Deletar</button></td>
            </tr>
            `;
        });
    })
    .catch(error => console.log(error));

    function deletarProduto(id, nome) {
        if (!confirm(`Você deseja excluir o produto:\nID: ${id}\nNome: ${nome}`)) return;

        fetch(`http://localhost:3000/produtos/${id}`, { method: 'DELETE' })
        .then(res => {
            if (res.ok) {
                document.getElementById(`linha-${id}`).remove();
                alert(`Produto ${id} excluído com sucesso!`);
            } else {
                alert("Erro ao deletar produto");
            }
        })
        .catch(error => console.log(error));
    }

    function alterarProduto(id, nome, aumentar) {
        const input = document.getElementById(`qnt-${id}`);
        let valorInput = parseInt(input.value);
        if (isNaN(valorInput) || valorInput <= 0) {
            alert("Digite um número válido maior que 0");
            return;
        }

        const quantidadeTd = document.getElementById(`quantidade-${id}`);
        
        let quantidadeAtual = parseInt(quantidadeTd.textContent);

        if (quantidadeAtual <= 10) {
            document.getElementById(`quantidade-${id}`).style.color = "red"
        } else {
            document.getElementById(`quantidade-${id}`).style.color = "black"
        }

        let novaQNT = aumentar ? quantidadeAtual + valorInput : quantidadeAtual - valorInput;
        if (novaQNT < 0) novaQNT = 0;

        fetch(`http://localhost:3000/produtos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, nome: nome, quantidade: novaQNT })
        })
        .then(res => {
            if (res.ok) {
                quantidadeTd.textContent = novaQNT; // atualiza a quantidade na tabela
                input.value = 1; // reseta o input
            } else {
                alert("Erro ao atualizar quantidade");
            }
        })
        .catch(error => console.log(error));
    }
