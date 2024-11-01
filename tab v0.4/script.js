const ram = document.getElementById("ram");
const hd = document.getElementById("hd");
const message = document.getElementById("message");
const addProcessButton = document.getElementById("add-process");
const processNameInput = document.getElementById("process-name");
const processSizeInput = document.getElementById("process-size");

let pagesInRam = [];
let pagesInHd = [];
const maxPages = 32; 

function addProcess() {
    const processName = processNameInput.value.trim();
    const pageSize = parseInt(processSizeInput.value);
    const currentSize = getCurrentSize(pagesInRam);

    if (!processName) {
        message.textContent = "Por favor, insira um nome para o processo.";
        return;
    }

    if (currentSize + pageSize <= maxPages) {
        const color = getColorForProcess(pagesInRam.length + pagesInHd.length);
        const process = { id: processName, size: pageSize, color: color };
        pagesInRam.push(process);
        renderRam();
        message.textContent = "";
        // processNameInput.value = ""; // Limpa o campo do nome do processo
    } else {
        message.textContent = `Memória cheia! Você já usou ${currentSize} unidades, o limite é 32.`;
    }
}


function removeProcess(index) {
    const process = pagesInRam[index];
    pagesInRam.splice(index, 1);
    renderRam();
    message.textContent = `Processo ${process.id} removido da RAM!`;
}

function moveToHd(index) {
    const process = pagesInRam.splice(index, 1)[0];
    pagesInHd.push(process);
    renderRam();
    renderHd();
    message.textContent = `Processo ${process.id} movido para o HD!`;
}

function moveToRam(index) {
    const process = pagesInHd.splice(index, 1)[0];
    const currentSize = getCurrentSize(pagesInRam);

    if (currentSize + process.size <= maxPages) {
        pagesInRam.push(process);
        renderRam();
        renderHd();
        message.textContent = `Processo ${process.id} movido para a RAM!`;
    } else {
        message.textContent = `Memória cheia! Não foi possível mover ${process.id} para a RAM.`;
    }
}

function renderRam() {
    ram.innerHTML = "";
    pagesInRam.forEach((process, index) => {
        const div = createProcessDiv(process, () => moveToHd(index));
        ram.appendChild(div);
    });
}

function renderHd() {
    hd.innerHTML = "";
    pagesInHd.forEach((process, index) => {
        const div = createProcessDiv(process, () => moveToRam(index));
        hd.appendChild(div);
    });
}

function createProcessDiv(process, onClick) {
    const div = document.createElement("div");
    div.classList.add("page");
    div.textContent = `${process.id} (${process.size})`;
    div.style.backgroundColor = process.color; // Atribui a cor específica do processo
    div.style.width = `${(process.size / maxPages) * 100}%`; // Define a largura proporcional do processo
    div.onclick = onClick;
    return div;
}

function getCurrentSize(pages) {
    return pages.reduce((sum, page) => sum + page.size, 0);
}

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
    return colors[index % colors.length];
}

addProcessButton.addEventListener("click", addProcess);

renderRam();
renderHd();
