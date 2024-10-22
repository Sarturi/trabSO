const ram = document.getElementById("ram");
const message = document.getElementById("message");
let pagesInRam = [];
const maxPages = 5;

function loadProcess(process) {
    const pageSize = parseInt(process[1]); // O número após "P" é o tamanho da página
    const currentSize = pagesInRam.reduce((sum, page) => sum + parseInt(page[1]), 0);

    if (currentSize + pageSize <= maxPages) {
        pagesInRam.push(process);
        renderRam();
        message.textContent = ""; // Limpa a mensagem
    } else {
        message.textContent = "Memória cheia! Remova uma página antes de adicionar outra.";
    }
}

function removeProcess(process) {
    pagesInRam = pagesInRam.filter(page => page !== process);
    renderRam();
    message.textContent = `Página ${process} removida da RAM!`;
}

function renderRam() {
    ram.innerHTML = "";
    pagesInRam.forEach(page => {
        const div = document.createElement("div");
        div.classList.add("page");
        div.textContent = page;
        div.onclick = () => removeProcess(page); // Adiciona evento de clique para remover a página
        ram.appendChild(div);
    });
}

// Initialize
renderRam();
