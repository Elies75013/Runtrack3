// Variables globales
let currentUser = null;
let currentDate = new Date();
let selectedDate = null;
let requestModal = null;

// Données de l'application (normalement chargées depuis data.json)
let users = [
    { id: 1, name: "Admin User", email: "admin@laplateforme.io", password: "admin123", role: "admin" },
    { id: 2, name: "Moderateur User", email: "modo@laplateforme.io", password: "modo123", role: "moderator" },
    { id: 3, name: "Étudiant User", email: "etudiant@laplateforme.io", password: "etudiant123", role: "user" }
];

let requests = [];

// Fonction pour charger les données depuis le fichier JSON
async function loadData() {
    try {
        const response = await fetch('data/data.json');
        const data = await response.json();
        users = data.users;
        requests = data.requests;
    } catch (error) {
        console.log('Utilisation des données par défaut');
    }
}

// Fonction pour sauvegarder les données (simulation)
function saveData() {
    const data = {
        users: users,
        requests: requests
    };
    
    // Dans un vrai projet, on enverrait les données à un serveur
    console.log('Données sauvegardées:', data);
    
    // Simulation de sauvegarde dans localStorage pour persistance
    try {
        localStorage.setItem('laPlateforme_data', JSON.stringify(data));
    } catch (e) {
        console.log('localStorage non disponible');
    }
}

// Fonction pour charger depuis localStorage si disponible
function loadFromLocalStorage() {
    try {
        const savedData = localStorage.getItem('laPlateforme_data');
        if (savedData) {
            const data = JSON.parse(savedData);
            users = data.users;
            requests = data.requests;
            return true;
        }
    } catch (e) {
        console.log('Impossible de charger depuis localStorage');
    }
    return false;
}

// Utilitaires
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}