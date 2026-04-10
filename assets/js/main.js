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

// 2. Função para Atualizar a Barra de Progresso Geral
function atualizarProgresso() {
    const total = meusCursos.length;
    const concluidos = meusCursos.filter(c => c.status === "Concluído").length;
    const porcentagem = Math.round((concluidos / total) * 100);
    
    const barra = document.getElementById('barra-progresso');
    if (barra) {
        barra.style.width = `${porcentagem}%`;
        barra.innerText = `${porcentagem}%`;
        barra.setAttribute('aria-valuenow', porcentagem);
    }
}

// 3. Renderizar Cards com suporte a Filtro
function carregarCursos(filtro = "todos") {
    const container = document.getElementById('container-cards');
    if (!container) return;

    // Lógica de Filtro
    const cursosFiltrados = filtro === "todos" 
        ? meusCursos 
        : meusCursos.filter(c => c.status === filtro);

    container.innerHTML = cursosFiltrados.map(curso => `
        <div class="col-md-4">
            <div class="card h-100 shadow-sm border-0 border-top border-4 border-${curso.cor}">
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

    // Sempre que renderizamos, atualizamos o progresso geral
    atualizarProgresso();
}

// 4. Consumo de API (Frase Motivacional)
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

// 5. Interações e Eventos
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

// Escuta a mudança no Select de Filtro
const selectFiltro = document.getElementById('filtro-status');
if (selectFiltro) {
    selectFiltro.addEventListener('change', (e) => {
        carregarCursos(e.target.value);
    });
}

// Inicialização
window.onload = () => {
    carregarCursos();
    buscarInspiracao();
};