const AREAS = [
    { name: 'Identidade & Evolução', icon: 'fas fa-brain' },
    { name: 'Filhos & Família', icon: 'fas fa-heart' },
    { name: 'Profissional', icon: 'fas fa-briefcase' },
    { name: 'Finanças', icon: 'fas fa-dollar-sign' },
    { name: 'Relacionamentos', icon: 'fas fa-user-friends' },
    { name: 'Espiritualidade', icon: 'fas fa-church' },
    { name: 'Corpo & Saúde', icon: 'fas fa-running' }
];

const FRASES_MOTIVACIONAIS = [
    "O presente é o palco da sua evolução.",
    "A espiritualidade é a base da sua jornada.",
    "Pequenos hábitos constroem grandes destinos.",
    "Seja mais seletivo com sua energia.",
    "A vida é sobre o que você planta hoje.",
    "Disciplina é a chave para a liberdade."
];

// -------------------- DADOS E PERSISTÊNCIA (Local Storage) --------------------

/**
 * Carrega dados do Local Storage ou inicializa com dados pré-carregados.
 */
function carregarDados() {
    let metas = JSON.parse(localStorage.getItem('metas')) || inicializarMetas();
    let habitos = JSON.parse(localStorage.getItem('habitos')) || [];
    return { metas, habitos };
}

/**
 * Salva dados no Local Storage.
 */
function salvarDados(metas, habitos) {
    localStorage.setItem('metas', JSON.stringify(metas));
    localStorage.setItem('habitos', JSON.stringify(habitos));
}

/**
 * Conteúdos Pré-carregados (Seção 3)
 */
function inicializarMetas() {
    return [
        // Identidade & Evolução
        { id: generateId(), descricao: 'Desenvolver 1 novo hábito a cada 60 dias', categoria: 'Identidade & Evolução', prazo: '2025-12-31', prioridade: 'Média', concluida: false, dataConclusao: null, ehHabito: true },
        { id: generateId(), descricao: 'Criar ritual diário de 10 minutos (oração, meditação, firmamento)', categoria: 'Identidade & Evolução', prazo: '2025-01-31', prioridade: 'Alta', concluida: false, dataConclusao: null, ehHabito: true },
        { id: generateId(), descricao: 'Estudar comportamento humano e comunicação', categoria: 'Identidade & Evolução', prazo: '2025-06-30', prioridade: 'Média', concluida: false, dataConclusao: null, ehHabito: false },

        // Filhos & Família
        { id: generateId(), descricao: 'Ter 1 dia especial por mês com cada filho', categoria: 'Filhos & Família', prazo: '2025-12-31', prioridade: 'Alta', concluida: false, dataConclusao: null, ehHabito: false },
        { id: generateId(), descricao: 'Criar reserva financeira mensal para eles', categoria: 'Filhos & Família', prazo: '2025-03-31', prioridade: 'Média', concluida: false, dataConclusao: null, ehHabito: false },

        // Profissional
        { id: generateId(), descricao: 'Aumentar renda mensal em 20% até junho', categoria: 'Profissional', prazo: '2025-06-30', prioridade: 'Alta', concluida: false, dataConclusao: null, ehHabito: false },
        { id: generateId(), descricao: 'Realizar 2 cursos estratégicos', categoria: 'Profissional', prazo: '2025-10-31', prioridade: 'Média', concluida: false, dataConclusao: null, ehHabito: false },
        
        // Finanças
        { id: generateId(), descricao: 'Criar fundo emergencial', categoria: 'Finanças', prazo: '2025-09-30', prioridade: 'Alta', concluida: false, dataConclusao: null, ehHabito: false },
        { id: generateId(), descricao: 'Guardar 10% fixo da renda', categoria: 'Finanças', prazo: '2025-12-31', prioridade: 'Alta', concluida: false, dataConclusao: null, ehHabito: true },
        
        // Relacionamentos
        { id: generateId(), descricao: 'Viver relações leves e saudáveis', categoria: 'Relacionamentos', prazo: '2025-12-31', prioridade: 'Média', concluida: false, dataConclusao: null, ehHabito: false },
        
        // Espiritualidade
        { id: generateId(), descricao: '1 ritual semanal de limpeza/elevação', categoria: 'Espiritualidade', prazo: '2025-12-31', prioridade: 'Alta', concluida: false, dataConclusao: null, ehHabito: true },
        { id: generateId(), descricao: '1 firmeza por mês', categoria: 'Espiritualidade', prazo: '2025-12-31', prioridade: 'Média', concluida: false, dataConclusao: null, ehHabito: true },
        
        // Corpo & Saúde
        { id: generateId(), descricao: 'Treinar 3–4x por semana', categoria: 'Corpo & Saúde', prazo: '2025-12-31', prioridade: 'Média', concluida: false, dataConclusao: null, ehHabito: true },
        { id: generateId(), descricao: 'Melhorar alimentação', categoria: 'Corpo & Saúde', prazo: '2025-03-31', prioridade: 'Média', concluida: false, dataConclusao: null, ehHabito: true },
    ];
}

let dados = carregarDados();
let metas = dados.metas;
let habitos = dados.habitos;

// -------------------- UTILIDADES --------------------

function generateId() {
    return 'id-' + Date.now() + '-' + Math.random().toString(16).substring(2, 8);
}

function showView(viewId) {
    document.querySelectorAll('.container').forEach(view => {
        view.classList.remove('active-view');
        view.classList.add('hidden-view');
    });
    document.getElementById(viewId).classList.add('active-view');
    document.getElementById(viewId).classList.remove('hidden-view');
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    // Limpar formulário de meta ao fechar
    if (modalId === 'modal-meta') {
        document.getElementById('form-meta').reset();
        document.getElementById('meta-id').value = '';
        document.getElementById('habito-opcoes').classList.add('hidden');
    }
}

// -------------------- RENDERIZAÇÃO --------------------

/**
 * Renderiza o dashboard de áreas (Seção 1)
 */
function renderizarDashboard() {
    const areasGrid = document.getElementById('areas-grid');
    areasGrid.innerHTML = '';
    
    AREAS.forEach(area => {
        const metasArea = metas.filter(m => m.categoria === area.name);
        const totalMetas = metasArea.length;
        const metasConcluidas = metasArea.filter(m => m.concluida).length;
        const progresso = totalMetas > 0 ? (metasConcluidas / totalMetas) * 100 : 0;
        
        const cardHTML = `
            <div class="card-area" data-area="${area.name}">
                <div class="card-header">
                    <h3><i class="${area.icon}"></i> ${area.name}</h3>
                    <span class="progresso-texto">${metasConcluidas} / ${totalMetas} Metas</span>
                </div>
                <div class="barra-progresso-container">
                    <div class="barra-progresso" style="width: ${progresso}%;"></div>
                </div>
                <div class="card-acoes">
                    <button class="btn-adicionar" onclick="openMetaModal('${area.name}')">+ Adicionar Meta</button>
                    <button class="btn-detalhes" onclick="verDetalhes('${area.name}')">Ver Detalhes</button>
                </div>
                <div id="metas-detalhes-${area.name.replace(/\s/g, '-')}" class="lista-metas hidden">
                    </div>
            </div>
        `;
        areasGrid.innerHTML += cardHTML;
        
        // Renderizar os detalhes das metas ativas dentro do card
        renderizarDetalhesMetas(area.name);
    });
    
    // Atualiza o progresso geral e estatísticas
    atualizarProgressoGeral();
    renderizarPrioridadeChart();
    renderizarHabitosWidget();
}

/**
 * Renderiza os detalhes das metas ativas em um card específico.
 */
function renderizarDetalhesMetas(categoria) {
    const listaContainer = document.getElementById(`metas-detalhes-${categoria.replace(/\s/g, '-')}`);
    if (!listaContainer) return;
    
    const metasAtivas = metas.filter(m => m.categoria === categoria && !m.concluida);
    listaContainer.innerHTML = '';

    if (metasAtivas.length === 0) {
        listaContainer.innerHTML = `<p style="font-size: 0.9em; margin-top: 10px;">Nenhuma meta ativa nesta área.</p>`;
        return;
    }

    metasAtivas.forEach(meta => {
        const itemHTML = `
            <li class="meta-item prioridade-${meta.prioridade.replace('Média', 'Mdia')}" data-id="${meta.id}">
                <div class="meta-info">
                    <h4>${meta.descricao}</h4>
                    <small>Prioridade: ${meta.prioridade} | Prazo: ${meta.prazo || 'N/A'}</small>
                </div>
                <div class="meta-actions">
                    <button class="btn-icon" onclick="openMetaModal('${categoria}', '${meta.id}')" title="Editar Meta"><i class="fas fa-edit"></i></button>
                    <input type="checkbox" class="checkbox-concluida" onchange="marcarComoConcluida('${meta.id}', this.checked)">
                </div>
            </li>
        `;
        listaContainer.innerHTML += itemHTML;
    });
}

/**
 * Renderiza a lista de conquistas na view de histórico (Seção D)
 */
function renderizarHistorico() {
    const conquistasLista = document.getElementById('conquistas-lista');
    conquistasLista.innerHTML = '';

    const metasConcluidas = metas
        .filter(m => m.concluida)
        .sort((a, b) => new Date(b.dataConclusao) - new Date(a.dataConclusao));

    if (metasConcluidas.length === 0) {
        conquistasLista.innerHTML = '<p class="progresso-info">Você ainda não concluiu nenhuma meta este ano. Vamos começar!</p>';
        return;
    }

    metasConcluidas.forEach(meta => {
        const dataFormatada = new Date(meta.dataConclusao).toLocaleDateString('pt-BR');
        conquistasLista.innerHTML += `
            <div class="conquista-item meta-item prioridade-${meta.prioridade.replace('Média', 'Mdia')}">
                <div class="meta-info">
                    <h4>✅ ${meta.descricao}</h4>
                    <small>Categoria: ${meta.categoria} | Concluído em: ${dataFormatada}</small>
                </div>
                <i class="fas fa-star" style="color: var(--cor-secundaria); font-size: 1.5rem;"></i>
            </div>
        `;
    });

    const totalMetas = metas.length;
    const totalConcluidas = metasConcluidas.length;
    const percentualGeral = totalMetas > 0 ? ((totalConcluidas / totalMetas) * 100).toFixed(1) : 0;

    document.getElementById('historico-progresso-total').textContent = 
        `Progresso Anual: ${totalConcluidas} de ${totalMetas} metas concluídas (${percentualGeral}%)`;
}


/**
 * Atualiza o Progresso Geral no Progress Ring (Seção E)
 */
function atualizarProgressoGeral() {
    const totalMetas = metas.length;
    const totalConcluidas = metas.filter(m => m.concluida).length;
    const progresso = totalMetas > 0 ? (totalConcluidas / totalMetas) * 100 : 0;
    
    document.getElementById('percentual-geral').textContent = `${progresso.toFixed(1)}%`;
    
    // Atualiza o gráfico de anel (Progress Ring)
    const circle = document.getElementById('path-progresso-geral');
    // Circunferência de 15.9155 * 2 * PI = 100.
    const offset = 100 - progresso;
    circle.style.strokeDasharray = `${100 - offset}, ${offset}`;
}


// -------------------- FUNCIONALIDADES (A, B, C) --------------------

/**
 * Abre o modal para adicionar ou editar uma meta (Seções A e B)
 */
function openMetaModal(categoria = '', metaId = '') {
    const modal = document.getElementById('modal-meta');
    const titulo = document.getElementById('modal-meta-titulo');
    const form = document.getElementById('form-meta');
    const categoriaSelect = document.getElementById('meta-categoria');
    
    // Popular o Select de Categoria
    categoriaSelect.innerHTML = AREAS.map(a => 
        `<option value="${a.name}">${a.name}</option>`
    ).join('');

    if (metaId) {
        // Modo Edição
        const meta = metas.find(m => m.id === metaId);
        if (!meta) return;

        titulo.textContent = 'Editar Meta';
        document.getElementById('meta-id').value = meta.id;
        document.getElementById('meta-descricao').value = meta.descricao;
        document.getElementById('meta-prazo').value = meta.prazo;
        document.getElementById('meta-prioridade').value = meta.prioridade;
        categoriaSelect.value = meta.categoria;
        
        // Opção de converter para hábito visível no modo edição
        document.getElementById('habito-opcoes').classList.remove('hidden');
        document.getElementById('meta-eh-habito').checked = meta.ehHabito;

    } else {
        // Modo Adicionar
        titulo.textContent = 'Adicionar Nova Meta';
        form.reset();
        document.getElementById('meta-id').value = '';
        if (categoria) categoriaSelect.value = categoria;
        
        // Esconder opção de converter para hábito ao adicionar
        document.getElementById('habito-opcoes').classList.add('hidden');
    }

    modal.style.display = 'block';
}

/**
 * Salva a meta (nova ou editada)
 */
document.getElementById('form-meta').addEventListener('submit', function(e) {
    e.preventDefault();

    const id = document.getElementById('meta-id').value;
    const descricao = document.getElementById('meta-descricao').value;
    const categoria = document.getElementById('meta-categoria').value;
    const prazo = document.getElementById('meta-prazo').value;
    const prioridade = document.getElementById('meta-prioridade').value;
    const ehHabito = document.getElementById('meta-eh-habito').checked;

    if (id) {
        // Edição (B)
        const index = metas.findIndex(m => m.id === id);
        if (index !== -1) {
            metas[index] = { ...metas[index], descricao, categoria, prazo, prioridade, ehHabito };
        }
    } else {
        // Criação (A)
        const novaMeta = {
            id: generateId(),
            descricao,
            categoria,
            prazo,
            prioridade,
            concluida: false,
            dataConclusao: null,
            ehHabito
        };
        metas.push(novaMeta);
    }

    salvarDados(metas, habitos);
    closeModal('modal-meta');
    renderizarDashboard();
});

/**
 * Marca uma meta como concluída (Seção C)
 */
function marcarComoConcluida(id, isChecked) {
    const meta = metas.find(m => m.id === id);
    if (!meta) return;

    if (isChecked) {
        meta.concluida = true;
        meta.dataConclusao = new Date().toISOString().substring(0, 10);
        
        // Animação suave (Seção 4)
        const listItem = document.querySelector(`.meta-item[data-id="${id}"]`);
        if (listItem) {
             // 1. Clonar para animação
            const clone = listItem.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.width = listItem.offsetWidth + 'px';
            clone.classList.add('meta-concluida-animacao');
            listItem.parentNode.insertBefore(clone, listItem.nextSibling);

            // 2. Remover após animação e renderizar
            setTimeout(() => {
                clone.remove(); 
                salvarDados(metas, habitos);
                renderizarDashboard();
                renderizarHistorico();
                alert(`🎉 Parabéns! Meta "${meta.descricao}" concluída e registrada no Histórico!`);
            }, 800);
        }

    } else {
        // Reabrir meta
        meta.concluida = false;
        meta.dataConclusao = null;
        salvarDados(metas, habitos);
        renderizarDashboard();
        renderizarHistorico();
    }
}

/**
 * Mostra/esconde a lista detalhada de metas ativas no card.
 */
function verDetalhes(categoria) {
    const idDetalhes = `metas-detalhes-${categoria.replace(/\s/g, '-')}`;
    const lista = document.getElementById(idDetalhes);
    lista.classList.toggle('hidden');
}


// -------------------- HÁBITOS (F) --------------------

/**
 * Abre o modal de criação de hábito
 */
function openHabitoModal() {
    document.getElementById('modal-habito').style.display = 'block';
}

/**
 * Cria/Salva o hábito
 */
document.getElementById('form-habito').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const descricao = document.getElementById('habito-descricao').value;
    const frequencia = document.getElementById('habito-frequencia').value;
    
    const novoHabito = {
        id: generateId(),
        descricao,
        frequencia,
        logs: []
    };
    habitos.push(novoHabito);
    
    salvarDados(metas, habitos);
    closeModal('modal-habito');
    renderizarHabitosWidget();
});


/**
 * Renderiza o widget de hábitos no dashboard.
 */
function renderizarHabitosWidget() {
    const widget = document.getElementById('widget-habitos');
    widget.innerHTML = '';
    
    const habitosAtivos = habitos;
    if (habitosAtivos.length === 0) {
        widget.innerHTML = `<p style="font-size: 0.9em; color: #888;">Crie seus primeiros hábitos.</p>`;
        return;
    }

    const hoje = new Date().toISOString().substring(0, 10);

    habitosAtivos.forEach(habito => {
        const feitoHoje = habito.logs.includes(hoje);
        const icon = feitoHoje ? 'fas fa-check-circle' : 'far fa-circle';

        widget.innerHTML += `
            <div class="habito-item">
                <span>${habito.descricao} (${habito.frequencia})</span>
                <button class="btn-icon" onclick="marcarHabito('${habito.id}', ${!feitoHoje})">
                    <i class="${icon}" style="color: ${feitoHoje ? 'var(--cor-sucesso)' : 'var(--cor-primaria)'}"></i>
                </button>
            </div>
        `;
    });
}

/**
 * Marca um hábito como feito/desfeito para o dia.
 */
function marcarHabito(id, feito) {
    const habito = habitos.find(h => h.id === id);
    if (!habito) return;
    
    const hoje = new Date().toISOString().substring(0, 10);
    
    if (feito) {
        if (!habito.logs.includes(hoje)) {
            habito.logs.push(hoje);
        }
    } else {
        habito.logs = habito.logs.filter(log => log !== hoje);
    }
    
    salvarDados(metas, habitos);
    renderizarHabitosWidget();
}


// -------------------- ESTATÍSTICAS (E) --------------------

let prioridadeChartInstance = null;

function renderizarPrioridadeChart() {
    const ctx = document.getElementById('prioridade-chart').getContext('2d');
    
    const metasConcluidas = metas.filter(m => m.concluida);
    const alta = metasConcluidas.filter(m => m.prioridade === 'Alta').length;
    const media = metasConcluidas.filter(m => m.prioridade === 'Média').length;
    const baixa = metasConcluidas.filter(m => m.prioridade === 'Baixa').length;

    const data = {
        labels: ['Alta', 'Média', 'Baixa'],
        datasets: [{
            data: [alta, media, baixa],
            backgroundColor: [
                '#dc3545', // Vermelho (Perigo/Alta)
                '#4A90E2', // Azul (Primária/Média)
                '#28a745'  // Verde (Sucesso/Baixa)
            ],
            hoverOffset: 4
        }]
    };

    if (prioridadeChartInstance) {
        prioridadeChartInstance.data = data;
        prioridadeChartInstance.update();
    } else {
        prioridadeChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: getComputedStyle(document.body).getPropertyValue('--cor-texto-principal')
                        }
                    },
                    title: {
                        display: true,
                        text: 'Prioridade das Metas Concluídas',
                        color: getComputedStyle(document.body).getPropertyValue('--cor-texto-principal')
                    }
                }
            }
        });
    }
}


// -------------------- RECURSOS EXTRAS --------------------

/**
 * Alterna entre Modo Escuro/Claro (Seção 5)
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    const icon = isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
    document.getElementById('btn-modo-toggle').innerHTML = `<i class="${icon}"></i>`;
    localStorage.setItem('dark-mode', isDarkMode ? 'enabled' : 'disabled');
    
    // Atualiza cores do gráfico
    if (prioridadeChartInstance) {
        prioridadeChartInstance.options.plugins.legend.labels.color = isDarkMode ? '#F5F5F7' : '#333333';
        prioridadeChartInstance.options.plugins.title.color = isDarkMode ? '#F5F5F7' : '#333333';
        prioridadeChartInstance.update();
    }
}

/**
 * Gerador de Frase Motivacional Diária (Seção 5)
 */
function exibirFraseMotivacional() {
    const indice = Math.floor(Math.random() * FRASES_MOTIVACIONAIS.length);
    document.getElementById('frase-motivacional').textContent = `"${FRASES_MOTIVACIONAIS[indice]}"`;
}


// -------------------- INICIALIZAÇÃO --------------------

document.addEventListener('DOMContentLoaded', () => {
    // Carregar tema
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        document.getElementById('btn-modo-toggle').innerHTML = `<i class="fas fa-moon"></i>`;
    }

    // Event Listeners
    document.getElementById('btn-modo-toggle').addEventListener('click', toggleDarkMode);
    document.getElementById('btn-historico').addEventListener('click', () => {
        showView('historico-view');
        renderizarHistorico();
    });

    // Iniciar renderização
    renderizarDashboard();
    exibirFraseMotivacional();
});

// Tornar funções globais acessíveis pelo HTML
window.openMetaModal = openMetaModal;
window.marcarComoConcluida = marcarComoConcluida;
window.verDetalhes = verDetalhes;
window.showView = showView;
window.closeModal = closeModal;
window.openHabitoModal = openHabitoModal;
window.marcarHabito = marcarHabito;