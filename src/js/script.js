// Lista para armazenar os dados dos cartões
let dados = [];

/* Função para buscar os dados do arquivo JSON */
async function iniciarBusca() {
   
    let resposta = await fetch("src/js/data.json"); // Resposta da confirmação de requisição
    dados = await resposta.json(); // Insere os dados tragos no data.json no array dados
    
    console.log(resposta);
    
}