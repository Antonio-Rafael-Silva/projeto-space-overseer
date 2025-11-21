
const cardContainer = document.getElementById("card-conteiner");
const searchInput = document.querySelector("header div input");
const searchButton = document.getElementById("botao-busca");
let allData = {}; // Armazenará o objeto completo com todas as categorias.

// Função para renderizar os cards de uma lista específica de itens (usado na busca)
function renderizarItensFiltrados(items) {
    cardContainer.innerHTML = ""; // Limpa o contêiner
    items.forEach(item => {
        const article = document.createElement("article");
        article.innerHTML = `
            <img src="${item.imagem}" alt="Imagem de ${item.nome}">
            <h2>${item.nome}</h2>
            <p>${item.descricao}</p>
            <a href="${item.link}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    });
}

// Função para renderizar todas as categorias e seus respectivos cards
function renderizarCategorias() {
    cardContainer.innerHTML = ""; // Limpa o contêiner para a renderização inicial

    for (const categoria in allData) {
        if (allData.hasOwnProperty(categoria)) {
            // Cria o título da categoria
            const h2 = document.createElement("h2");
            h2.textContent = categoria;
            h2.classList.add("categoria-titulo");
            cardContainer.appendChild(h2);

            // Cria um contêiner para os cards da categoria
            const itemsContainer = document.createElement("div");
            itemsContainer.classList.add("items-container");

            const items = allData[categoria];
            items.forEach(item => {
                const article = document.createElement("article");
                article.innerHTML = `
                    <img src="${item.imagem}" alt="Imagem de ${item.nome}">
                    <h2>${item.nome}</h2>
                    <p>${item.descricao}</p>
                    <a href="${item.link}" target="_blank">Saiba mais</a>
                `;
                itemsContainer.appendChild(article);
            });
            cardContainer.appendChild(itemsContainer);
        }
    }
}

// Função de busca
function iniciarBusca() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    // Se o campo de busca estiver vazio, renderiza todas as categorias novamente
    if (!searchTerm) {
        renderizarCategorias();
        return;
    }

    // Junta todos os itens de todas as categorias em um único array
    const allItems = [].concat(...Object.values(allData));

    const filteredItems = allItems.filter(item => {
        return item.nome.toLowerCase().includes(searchTerm);
    });

    if (filteredItems.length === 0) {
        searchInput.value = ""; // Limpa o input
        searchInput.placeholder = "Nenhum item encontrado";
        // Mostra tudo novamente se a busca não encontrar nada
        renderizarCategorias();
    } else {
        searchInput.placeholder = "Digite um item...";
        renderizarItensFiltrados(filteredItems);
        searchInput.value = "";
    }
}

// Função para carregar os dados iniciais do JSON
async function carregarDadosIniciais() {
    try {
        const response = await fetch("src/js/data.json");
        allData = await response.json();
        renderizarCategorias(); // Renderiza as categorias na tela
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        cardContainer.innerHTML = `<p class="error">Não foi possível carregar os dados. Tente novamente mais tarde.</p>`;
    }
}

// Listeners de eventos
searchButton.addEventListener('click', iniciarBusca);
searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        iniciarBusca();
    }
});

// Carrega os dados iniciais
carregarDadosIniciais();



