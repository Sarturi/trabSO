const ram = document.getElementById("ram");
const message = document.getElementById("message");
const addProcessButton = document.getElementById("add-process");
const processSizeInput = document.getElementById("process-size");

let pagesInRam = [];
const maxPages = 32; // RAM fixada em 32 unidades

// Função para adicionar um processo com o valor definido manualmente
function addProcess() {
    const pageSize = parseInt(processSizeInput.value); // Pega o valor inserido pelo usuário
    const currentSize = pagesInRam.reduce((sum, page) => sum + parseInt(page.match(/\((\d+)\)/)[1]), 0);

    if (currentSize + pageSize <= maxPages) {
        const processId = `P${pagesInRam.length + 1}`; // Define um ID simples para o processo
        pagesInRam.push(`${processId}(${pageSize})`);
        renderRam();
        message.textContent = ""; // Limpa a mensagem de erro
    } else {
        message.textContent = `Memória cheia! Você já usou ${currentSize} unidades, o limite é 32.`;
    }
}

function removeProcess(process, indexToRemove) {
    let removed = false;
    pagesInRam = pagesInRam.filter((page, index) => {
        if (index === indexToRemove && !removed) {
            removed = true; // Marca o processo como removido
            return false;
        }
        return true;
    });

    renderRam();
    message.textContent = `Página ${process} removida da RAM!`;
}

function renderRam() {
    ram.innerHTML = ""; // Limpa a visualização da RAM

    const ramWidth = 100; // Representa 100% da largura da RAM

    pagesInRam.forEach((page, index) => {
        const div = document.createElement("div");
        div.classList.add("page");

        const pageSize = parseInt(page.match(/\((\d+)\)/)[1]); // Extrai o tamanho do processo
        const widthPercentage = (pageSize / maxPages) * ramWidth; // Calcula a porcentagem da largura da RAM
        div.style.width = `${widthPercentage}%`;

        // Atribui uma cor com base no índice do processo
        div.style.backgroundColor = getColorForProcess(index);

        div.textContent = page; // Exibe o nome do processo (ex: P1(3))
        div.onclick = () => removeProcess(page, index);
        ram.appendChild(div);
    });
}

// Função para gerar cores diferentes com base no índice do processo
function getColorForProcess(index) {
    const colors = [
        '#007bff', // Azul
        '#28a745', // Verde
        '#ffc107', // Amarelo
        '#dc3545', // Vermelho
        '#6f42c1'  // Roxo
    ];
    return colors[index % colors.length]; // Garante que o índice rode sobre as cores disponíveis
}

// Adiciona o evento ao botão de adicionar processo
addProcessButton.addEventListener("click", addProcess);

// Inicializa a RAM visualmente
renderRam();
