
const cardConteiner = document.getElementById("card-conteiner"); // Obtém o elemento HTML com o ID "card-conteiner", que servirá como o contêiner para os cards dos planetas.
const searchInput = document.querySelector("header div input"); // Seleciona o primeiro campo de input encontrado dentro de uma div em um header, usado para a busca de planetas.
const searchButton = document.getElementById("botao-busca"); // Obtém o botão de busca pelo seu ID "botao-busca".
let allPlanetData = []; // Inicializa um array vazio que armazenará os dados de todos os planetas carregados do arquivo JSON.

// Função para renderizar os cards na tela
function renderizarCards(planetsToRender) {
    cardConteiner.innerHTML = ""; // Limpa o conteúdo atual do contêiner de cards para evitar duplicatas ao renderizar novos cards.

    for (let planet of planetsToRender) { // Itera sobre a lista de planetas que deve ser renderizada.
        let article = document.createElement("article"); // Cria um novo elemento <article> para cada planeta.
        article.innerHTML = `
            <img src="${planet.imagem}" alt="Imagem do planeta ${planet.nome}">
            <h2>${planet.nome}</h2>
            <p>${planet.descricao}</p>
            <a href="${planet.link}" target="_blank">Saiba mais</a>
        `; // Preenche o article com a imagem, nome, descrição e um link para mais informações sobre o planeta.
        cardConteiner.appendChild(article); // Adiciona o card do planeta recém-criado ao contêiner na página.
    }
}

// Função de busca, chamada apenas pelo botão
function iniciarBusca() {
    // Se o placeholder atual for a mensagem de erro, restaura para o padrão
    if (searchInput.placeholder === "planeta não encontrado") { // Verifica se o placeholder do campo de busca exibe a mensagem de erro.
        searchInput.placeholder = "Digite um planeta..."; // Restaura o placeholder para a mensagem padrão.
    }

    const searchTerm = searchInput.value.toLowerCase(); // Obtém o valor digitado no campo de busca e o converte para minúsculas para uma busca não sensível a maiúsculas/minúsculas.
    const filteredPlanets = allPlanetData.filter(planet => { // Filtra a lista de todos os planetas.
        return planet.nome.toLowerCase().includes(searchTerm); // Retorna apenas os planetas cujo nome, também em minúsculas, inclui o termo pesquisado.
    });

    // Se a busca não retornou resultados e o usuário digitou algo
    if (filteredPlanets.length === 0 && searchTerm) { // Se nenhum planeta foi encontrado e um termo de busca foi digitado.
        searchInput.placeholder = "planeta não encontrado"; // Altera o placeholder para indicar que a busca não teve sucesso.
        renderizarCards(allPlanetData); // Mostra todos os planetas novamente, já que a busca específica não retornou resultados.
    } else {
        // Se encontrou, renderiza os planetas filtrados
        renderizarCards(filteredPlanets); // Renderiza apenas os planetas que correspondem ao critério de busca.
    }

    // Limpa o campo de input após a busca
    searchInput.value = ""; // Limpa o campo de busca para a próxima pesquisa.
}

// Função para buscar os dados iniciais do JSON ao carregar a página
async function carregarDadosIniciais() {
    try {
        const response = await fetch("src/js/data.json"); // Faz uma requisição assíncrona para carregar o arquivo data.json.
        allPlanetData = await response.json(); // Converte a resposta para o formato JSON e armazena na variável global.
        renderizarCards(allPlanetData); // Renderiza todos os planetas na tela assim que os dados são carregados.
    } catch (error) {
        console.error("Erro ao carregar os dados dos planetas:", error); // Exibe um erro no console se a requisição falhar.
        cardConteiner.innerHTML = `<p class="error">Não foi possível carregar os dados. Tente novamente mais tarde.</p>`; // Exibe uma mensagem de erro na página.
    }
}

// Adiciona listener apenas para o clique no botão
searchButton.addEventListener('click', iniciarBusca); // Adiciona um "ouvinte" de evento ao botão de busca, que chama a função iniciarBusca quando o botão é clicado.

// Carrega os dados iniciais quando o script é executado
carregarDadosIniciais(); // Chama a função para carregar os dados dos planetas assim que o script é carregado.



