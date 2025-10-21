

// ===============================
// Récupération des éléments HTML
// ===============================

// On récupère le bouton qui va permettre de mélanger les images de l'arc-en-ciel
const shuffleBtn = document.getElementById('shuffleBtn'); // Permet de déclencher le mélange

// On récupère le conteneur principal qui contient toutes les images au départ
const rainbowContainer = document.getElementById('rainbow-container'); // Contient les images à mélanger

// On récupère le conteneur qui contient les dropzones où l'utilisateur doit placer les images dans l'ordre
const orderContainer = document.getElementById('order-container'); // Contient les zones de dépôt pour l'ordre

// On récupère le bouton qui permet de vérifier si les images sont dans le bon ordre
const checkBtn = document.getElementById('checkBtn'); // Permet de vérifier la solution

// On récupère l'élément qui affichera le message de victoire ou d'échec
const message = document.getElementById('message'); // Affiche le résultat

// Fonction pour mélanger les images
function shuffleImages() {
    // Récupère toutes les images dans le conteneur principal

// Cette fonction mélange les images dans le conteneur principal et remet toutes les images dans ce conteneur
// même celles qui auraient été placées dans les dropzones
    const images = Array.from(rainbowContainer.querySelectorAll('.rainbow-img'));
    // Mélange les images avec l'algorithme de Fisher-Yates
    for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        rainbowContainer.appendChild(images[j]); // Ajoute l'image mélangée dans le conteneur
        images.splice(j, 1); // Retire l'image de la liste temporaire
    }
    // Remet toutes les images qui étaient dans les dropzones dans le conteneur principal
    Array.from(orderContainer.querySelectorAll('.rainbow-img')).forEach(img => {
        rainbowContainer.appendChild(img);
    });
    message.textContent = '';
}

// Ajoute l'événement au bouton pour mélanger les images
shuffleBtn.addEventListener('click', shuffleImages);

// Drag & Drop : gestion du déplacement des images
let draggedImg = null; // Variable pour stocker l'image en cours de déplacement

// Quand on commence à déplacer une image
rainbowContainer.addEventListener('dragstart', function(e) {
    if (e.target.classList.contains('rainbow-img')) {

// Quand l'utilisateur clique sur le bouton "Mélanger les images", on appelle la fonction shuffleImages
        draggedImg = e.target; // On mémorise l'image déplacée
    }
});

// Ajoute les événements de drag & drop sur chaque dropzone

// Variable qui stocke l'image en cours de déplacement (drag)
orderContainer.querySelectorAll('.dropzone').forEach(zone => {
    // Autorise le drop sur la zone
    zone.addEventListener('dragover', function(e) {
        e.preventDefault();
    });
    // Quand une image est déposée dans la zone
    zone.addEventListener('drop', function(e) {
        e.preventDefault();
        if (draggedImg) {
            // Si une image est déjà présente dans la zone, on la remet dans le conteneur principal
            if (zone.firstChild) {
                rainbowContainer.appendChild(zone.firstChild);
            }
            // Ajoute l'image déplacée dans la zone

// Pour chaque dropzone, on ajoute les événements nécessaires pour gérer le drag & drop
            zone.appendChild(draggedImg);
            draggedImg = null; // Réinitialise la variable
        }
    });
});

// Vérification de l'ordre des images
checkBtn.addEventListener('click', function() {
    const correctOrder = ['img1','img2','img3','img4','img5','img6']; // Ordre attendu
    let userOrder = [];
    // Récupère l'ordre des images dans les dropzones
    orderContainer.querySelectorAll('.dropzone').forEach(zone => {
        if (zone.firstChild && zone.firstChild.id) {
            userOrder.push(zone.firstChild.id);
        } else {
            userOrder.push(null); // Si la zone est vide
        }
    });
    // Compare l'ordre de l'utilisateur avec l'ordre correct
    if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
        message.textContent = 'Vous avez gagné'; // Affiche le message de victoire
        message.style.color = 'green';
    } else {
        message.textContent = 'Vous avez perdu'; // Affiche le message d'échec

// Quand l'utilisateur clique sur le bouton "Vérifier l'ordre", on compare l'ordre des images dans les dropzones
        message.style.color = 'red';
    }
});
