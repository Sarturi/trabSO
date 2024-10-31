const ram = document.getElementById("ram");
const hd = document.getElementById("hd");
const message = document.getElementById("message");
const addProcessButton = document.getElementById("add-process");
const processSizeInput = document.getElementById("process-size");

let pagesInRam = [];
let pagesInHd = [];
const maxPages = 32;

// Adiciona um processo à RAM
function addProcess() {
    const pageSize = parseInt(processSizeInput.value);
    const currentSize = getCurrentSize(pagesInRam);

    if (currentSize + pageSize <= maxPages) {
        const processId = `P${pagesInRam.length + 1}`;
        pagesInRam.push(`${processId}(${pageSize})`);
        renderRam();
        message.textContent = "";
    } else {
        message.textContent = `Memória cheia! Você já usou ${currentSize} unidades, o limite é 32.`;
    }
}

// Remove um processo da RAM
function removeProcess(process, indexToRemove) {
    pagesInRam = pagesInRam.filter((_, index) => index !== indexToRemove);
    renderRam();
    message.textContent = `Processo ${process} removido da RAM!`;
}

// Move um processo para o HD
function moveToHd(process, index) {
    pagesInRam.splice(index, 1);
    pagesInHd.push(process);
    renderRam();
    renderHd();
    message.textContent = `Processo ${process} movido para o HD!`;
}

// Move um processo para a RAM
function moveToRam(process, index) {
    pagesInHd.splice(index, 1);
    pagesInRam.push(process);
    renderRam();
    renderHd();
    message.textContent = `Processo ${process} movido para a RAM!`;
}

// Remove um processo do HD
function removeFromHd(process, indexToRemove) {
    pagesInHd = pagesInHd.filter((_, index) => index !== indexToRemove);
    renderHd();
    message.textContent = `Processo ${process} removido do HD!`;
}

// Renderiza a RAM
function renderRam() {
    ram.innerHTML = "";
    pagesInRam.forEach((page, index) => {
        const div = createProcessDiv(page, () => moveToHd(page, index));
        ram.appendChild(div);
    });
}

// Renderiza o HD
function renderHd() {
    hd.innerHTML = "";
    pagesInHd.forEach((page, index) => {
        const div = createProcessDiv(page, () => moveToRam(page, index));
        hd.appendChild(div);
    });
}

// Cria um elemento de processo
function createProcessDiv(page, onClick) {
    const div = document.createElement("div");
    div.classList.add("page");
    div.textContent = page;
    div.onclick = onClick;
    div.style.backgroundColor = getColorForProcess(pagesInRam.length + pagesInHd.length);
    return div;
}

// Calcula o tamanho atual
function getCurrentSize(pages) {
    return pages.reduce((sum, page) => sum + parseInt(page.match(/\((\d+)\)/)[1]), 0);
}

// Gera cores diferentes com base no índice
function getColorForProcess(index) {
    const colors = [
        '#007bff', // Azul
        '#28a745', // Verde
        '#ffc107', // Amarelo
        '#dc3545', // Vermelho
        '#6f42c1', // Roxo
        '#17a2b8', // Ciano
        '#fd7e14', // Laranja
        '#6610f2'  // Roxo Escuro
    ];
    return colors[index % colors.length]; // Garante que o índice rode sobre as cores disponíveis
}


// Adiciona o evento ao botão de adicionar processo
addProcessButton.addEventListener("click", addProcess);

// Inicializa a visualização da RAM e HD
renderRam();
renderHd();
