// --- Jeu du Taquin ---

// Récupération des éléments HTML
const board = document.getElementById('taquin-board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

// Liste des images 
const images = [
    '1.PNG',
    '2.PNG',
    '3.PNG',
    '4.PNG',
    '5.PNG',
    '6.PNG',
    '7.PNG',
    '8.PNG',
    '9.PNG'
];

let tiles = [];
let gameActive = true;

// Mélange le plateau avec une permutation aléatoire
function shuffleTiles() {
    // Crée un tableau avec les index des images + la case vide
    let arr = [...Array(8).keys(), null];
    // Mélange le tableau
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Affiche le plateau de jeu
function renderBoard() {
    board.innerHTML = '';
    tiles.forEach((tile, idx) => {
        const div = document.createElement('div');
        div.classList.add('taquin-tile');
        if (tile === null) {
            div.classList.add('taquin-empty');
        } else {
            const img = document.createElement('img');
            img.src = images[tile];
            img.alt = `Tuile ${tile+1}`;
            div.appendChild(img);
            if (gameActive) {
                div.addEventListener('click', () => moveTile(idx));
            }
        }
        board.appendChild(div);
    });
}

// Vérifie si le déplacement est possible et effectue le mouvement
function moveTile(idx) {
    if (!gameActive) return;
    // Trouve l'index de la case vide
    const emptyIdx = tiles.indexOf(null);
    // Vérifie si la case cliquée est adjacente à la case vide
    if (isAdjacent(idx, emptyIdx)) {
        // Échange la tuile avec la case vide
        [tiles[idx], tiles[emptyIdx]] = [tiles[emptyIdx], tiles[idx]];
        renderBoard();
        checkWin();
    }
}

// Vérifie si deux cases sont adjacentes
function isAdjacent(i1, i2) {
    const x1 = i1 % 3, y1 = Math.floor(i1 / 3);
    const x2 = i2 % 3, y2 = Math.floor(i2 / 3);
    return (Math.abs(x1 - x2) + Math.abs(y1 - y2)) === 1;
}

// Vérifie si le joueur a gagné
function checkWin() {
    // Ordre correct : [0,1,2,3,4,5,6,7,null]
    for (let i = 0; i < 8; i++) {
        if (tiles[i] !== i) return;
    }
    if (tiles[8] === null) {
        message.textContent = 'Vous avez gagné';
        message.style.color = 'green';
        gameActive = false;
        restartBtn.style.display = 'inline-block';
    }
}

// Initialise une nouvelle partie
function startGame() {
    tiles = shuffleTiles();
    gameActive = true;
    message.textContent = '';
    message.style.color = '';
    restartBtn.style.display = 'none';
    renderBoard();
}

restartBtn.addEventListener('click', startGame);

// Démarre la partie au chargement
startGame();
