// Fonction qui vérifie si un nombre est premier
function estPremier(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

// Fonction sommenombrespremiers
function sommenombrespremiers(a, b) {
    if (estPremier(a) && estPremier(b)) {
        return a + b;
    } else {
        return false;
    }
}

// Exemples de test
console.log(sommenombrespremiers(3, 5));   // 8
console.log(sommenombrespremiers(4, 5));   // false
console.log(sommenombrespremiers(7, 11));  // 18
console.log(sommenombrespremiers(8, 9));   // false
