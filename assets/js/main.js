const meusCursos = [
    { titulo: "Front-end Basics", desc: "HTML5, CSS3 e Bootstrap 5.", status: "Concluído", cor: "success" },
    { titulo: "UX/UI Design", desc: "Arquitetura e Design Inclusivo.", status: "Concluído", cor: "success" },
    { titulo: "Dev Dinâmico", desc: "Lógica com JavaScript e APIs.", status: "Em progresso", cor: "warning" }
];

function atualizarProgresso() {
    const total = meusCursos.length;
    const concluidos = meusCursos.filter(c => c.status === "Concluído").length;
    const porcentagem = Math.round((concluidos / total) * 100);
    const barra = document.getElementById('barra-progresso');
    if (barra) {
        barra.style.width = `${porcentagem}%`;
        barra.innerText = `${porcentagem}%`;
    }
}

function carregarCursos(filtro = "todos") {
    const container = document.getElementById('container-cards');
    if (!container) return;

    const filtrados = filtro === "todos" ? meusCursos : meusCursos.filter(c => c.status === filtro);

    container.innerHTML = filtrados.map(curso => `
        <div class="col-md-4">
            <div class="card h-100 shadow-sm border-0 border-top border-4 border-${curso.cor}">
                <div class="card-body p-4 text-center">
                    <h5 class="fw-bold text-primary">${curso.titulo}</h5>
                    <p class="text-muted small">${curso.desc}</p>
                    <span class="badge bg-${curso.cor}-subtle text-${curso.cor}">${curso.status}</span>
                </div>
            </div>
        </div>
    `).join('');
    atualizarProgresso();
}

// Dark Mode com LocalStorage
const darkToggle = document.getElementById('dark-mode-toggle');
if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
}

darkToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDark ? 'enabled' : 'disabled');
    darkToggle.innerHTML = isDark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
});

document.getElementById('filtro-status')?.addEventListener('change', (e) => carregarCursos(e.target.value));

window.onload = () => {
    carregarCursos();
    // Função de busca da API de frases aqui...
};