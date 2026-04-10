// 1. Dados dos Cursos
const meusCursos = [
    {
        titulo: "Front-end Basics",
        desc: "HTML5, CSS3 e Bootstrap 5 aplicados neste projeto.",
        status: "Concluído",
        cor: "success"
    },
    {
        titulo: "UX/UI Design",
        desc: "Arquitetura de informação e Design Inclusivo.",
        status: "Concluído",
        cor: "success"
    },
    {
        titulo: "Dev Dinâmico",
        desc: "Lógica com JavaScript e consumo de dados reais.",
        status: "Em progresso",
        cor: "warning"
    }
];

// 2. Renderizar Cards
function carregarCursos() {
    const container = document.getElementById('container-cards');
    if (!container) return;

    container.innerHTML = meusCursos.map(curso => `
        <div class="col-md-4">
            <div class="card h-100 shadow-sm border-0">
                <div class="card-body p-4 text-center">
                    <h5 class="fw-bold text-primary">${curso.titulo}</h5>
                    <p class="text-muted small">${curso.desc}</p>
                    <span class="badge bg-${curso.cor}-subtle text-${curso.cor} border border-${curso.cor}-subtle">
                        ${curso.status}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

// 3. Consumo de API (Frase Motivacional)
async function buscarInspiracao() {
    const pFrase = document.getElementById('frase-api');
    try {
        const resposta = await fetch('https://api.adviceslip.com/advice');
        const dados = await resposta.json();
        if (pFrase) pFrase.innerText = `"${dados.slip.advice}"`;
    } catch (error) {
        if (pFrase) pFrase.innerText = "Continue focado nos seus objetivos!";
    }
}

// 4. Interação do Botão
const btn = document.getElementById('btnComeçar');
if (btn) {
    btn.addEventListener('click', () => {
        const nome = prompt("Olá! Qual o seu nome?");
        if (nome) {
            btn.innerText = `Bora focar, ${nome}!`;
            alert(`Bem-vindo, ${nome}! Vamos construir sua carreira.`);
        }
    });
}

// Inicialização
window.onload = () => {
    carregarCursos();
    buscarInspiracao();
};