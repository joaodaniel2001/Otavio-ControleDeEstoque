document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")
  
    if (!id) return
  
    const resp = await fetch(`http://localhost:3000/historico/${id}`)
    const dados = await resp.json()
  
    const lista = document.querySelector("#conteudo")
  
    if (dados.length === 0) {
      lista.innerHTML = "<tr><td colspan='3'>Sem histórico</td></tr>"
      return
    }
  
    dados.forEach(h => {
      lista.innerHTML += `
        <tr>
          <td>${h.nome}</td>
          <td>${h.anterior}</td>
          <td>${h.novo}</td>
          <td>${new Date(h.data).toLocaleString()}</td>
        </tr>
      `
    })
  })
  