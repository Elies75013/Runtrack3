// Fonction tri qui trie un tableau numbers selon l'ordre ascendant ou descendant
function tri(numbers, order) {
    // Copie du tableau pour ne pas modifier l'original
    let arr = numbers.slice();
    // Algorithme de tri à bulles
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            let condition = order === "asc" ? arr[j] > arr[j + 1] : arr[j] < arr[j + 1];
            if (condition) {
                // Échange
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// Exemples de test
console.log(tri([5, 2, 9, 1, 7], "asc"));   // [1, 2, 5, 7, 9]
console.log(tri([5, 2, 9, 1, 7], "desc"));  // [9, 7, 5, 2, 1]
console.log(tri([3, 3, 2, 1], "asc"));      // [1, 2, 3, 3]
console.log(tri([3, 3, 2, 1], "desc"));     // [3, 3, 2, 1]
