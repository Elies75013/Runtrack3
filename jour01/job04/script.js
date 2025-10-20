// Déclare la fonction bisextile qui prend une année en paramètre
function bisextile(annee) {
    // Une année est bisextile si elle est divisible par 4 et (non divisible par 100 ou divisible par 400)
    return (annee % 4 === 0) && ((annee % 100 !== 0) || (annee % 400 === 0));
}

// Exemples d'utilisation
console.log("2000 est bisextile ?", bisextile(2000)); // true
console.log("1900 est bisextile ?", bisextile(1900)); // false
console.log("2024 est bisextile ?", bisextile(2024)); // true
console.log("2023 est bisextile ?", bisextile(2023)); // false
