const btnVoltar = document.getElementById("btn-voltar");
const btnAvancar = document.getElementById("btn-avancar");
const paginas = document.querySelectorAll(".pagina");

let paginaAtual = 0;
const totalPaginas = paginas.length;

function atualizarDiario() {
    paginas.forEach((pagina, index) => {
        if (index < paginaAtual) {
            pagina.classList.add("virada");
            pagina.style.zIndex = 10 + index;
        } else {
            pagina.classList.remove("virada");
            pagina.style.zIndex = totalPaginas - index;
        }
    });
}

function avancarPagina() {
    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        atualizarDiario();
    }
}

function voltarPagina() {
    if (paginaAtual > 0) {
        paginaAtual--;
        atualizarDiario();
    }
}

btnAvancar.addEventListener("click", avancarPagina);
btnVoltar.addEventListener("click", voltarPagina);

paginas.forEach((pagina, index) => {
    pagina.addEventListener("click", (e) => {
        if (e.target.tagName === "TEXTAREA") return;

        if (index < paginaAtual) {
            voltarPagina();
        } else if (index === paginaAtual) {
            avancarPagina();
        }
    });
});

atualizarDiario();
