const ram = document.getElementById("ram");
const message = document.getElementById("message");
let pagesInRam = [];
const maxPages = 5;

function loadProcess() {
    const pageNum = Math.floor(Math.random() * 10);
    if (pagesInRam.length < maxPages) {
        pagesInRam.push(`P${pageNum}`);
        renderRam();
    } else {
        message.textContent = "Memória cheia! Use 'Trocar Página'.";
    }
}

function swapPage() {
    if (pagesInRam.length === 0) {
        message.textContent = "Nenhuma página para trocar!";
        return;
    }
    const removedPage = pagesInRam.shift();
    message.textContent = `Página ${removedPage} removida da RAM!`;
    renderRam();
}

function renderRam() {
    ram.innerHTML = "";
    pagesInRam.forEach(page => {
        const div = document.createElement("div");
        div.classList.add("page");
        div.textContent = page;
        ram.appendChild(div);
    });
}

// Initialize
renderRam();
