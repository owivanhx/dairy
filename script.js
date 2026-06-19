const btnVoltar = document.getElementById("btn-voltar");
const btnAvancar = document.getElementById("btn-avancar");
const paginas = document.querySelectorAll(".pagina");

let paginaAtual = 0;
const totalPaginas = paginas.length;

function atualizarDiario() {
    paginas.forEach((pagina, index) => {
        if (index < paginaAtual) {
            // Páginas anteriores viram para a esquerda
            pagina.classList.add("virada");
            // Ajusta o z-index para que a folha virada mais recente fique por cima
            pagina.style.zIndex = 10 + index;
        } else {
            // Páginas futuras voltam para a posição original
            pagina.classList.remove("virada");
            // Restaura o z-index original decrescente
            pagina.style.zIndex = totalPaginas - index;
        }
    });
}

btnAvancar.addEventListener("click", () => {
    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        atualizarDiario();
    }
});

btnVoltar.addEventListener("click", () => {
    if (paginaAtual > 0) {
        paginaAtual--;
        atualizarDiario();
    }
});

// Inicializa as posições de z-index corretas ao carregar o site
atualizarDiario();
