
// Récupère le bouton pour afficher la citation
const showBtn = document.getElementById('showBtn');
// Récupère le bouton pour cacher la citation
const hideBtn = document.getElementById('hideBtn');
// Récupère l'élément contenant la citation
const quote = document.getElementById('quote');

// Lorsque l'utilisateur clique sur le bouton "Afficher la citation"
showBtn.addEventListener('click', () => {
    // Affiche le texte de la citation
    quote.style.display = 'block';
});

// Lorsque l'utilisateur clique sur le bouton "Cacher l'élément"
hideBtn.addEventListener('click', () => {
    // Cache le texte de la citation
    quote.style.display = 'none';
});
