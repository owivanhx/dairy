// ================= NAVIGAÇÃO DO DIÁRIO =================
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


// ================= ANIMAÇÃO DE PÉTALAS (CANVAS) =================
const canvas = document.getElementById("fundo-petalas");
const ctx = canvas.getContext("2d");

// Ajusta o tamanho do canvas para cobrir a tela inteira
function redimensionarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", redimensionarCanvas);
redimensionarCanvas();

const quantidadePetalas = 40;
const petalasArray = [];

// Paleta interna de cores para as pétalas (Variações de Coral Glow e Rosa)
const coresPetalas = ["rgba(250, 133, 90, 0.6)", "rgba(244, 153, 119, 0.7)", "rgba(255, 191, 236, 0.6)"];

class Petala {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height - 10;
        this.tamanho = Math.random() * 8 + 6;
        this.velocidadeY = Math.random() * 1.5 + 0.8;
        this.velocidadeX = Math.random() * 1 - 0.5;
        this.densidade = Math.random() * 20;
        this.cor = coresPetalas[Math.floor(Math.random() * coresPetalas.length)];
        this.rotacao = Math.random() * 360;
        this.velocidadeRotacao = Math.random() * 0.02 - 0.01;
    }

    atualizar() {
        this.y += this.velocidadeY;
        this.x += this.velocidadeX + Math.sin(this.densidade) * 0.5;
        this.densidade += 0.01;
        this.rotacao += this.velocidadeRotacao;

        // Se passar da parte inferior da tela, volta para o topo
        if (this.y > canvas.height) {
            this.reset();
        }
    }

    desenhar() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotacao);
        ctx.fillStyle = this.cor;
        
        // Desenha uma forma elíptica imitando uma pétala de flor
        ctx.beginPath();
        ctx.ellipse(0, 0, this.tamanho, this.tamanho / 2, 0, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.restore();
    }
}

// Inicializa a lista de pétalas
for (let i = 0; i < quantidadePetalas; i++) {
    petalasArray.push(new Petala());
}

// Loop contínuo de renderização
function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    petalasArray.forEach(petala => {
        petala.atualizar();
        petala.desenhar();
    });

    requestAnimationFrame(animar);
}

animar();
