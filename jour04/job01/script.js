// Récupère le bouton et attache un écouteur pour le clic
// Lors du clic, on utilise fetch pour récupérer le contenu de expression.txt
// puis on ajoute ce texte dans un paragraphe inséré dans le <body>.
document.getElementById('button').addEventListener('click', function() {
  // fetch retourne une promesse contenant la réponse HTTP
  fetch('expression.txt')
    // On lit la réponse en texte
    .then(function(response) { return response.text(); })
    // Une fois le texte obtenu, on crée un <p> et on l'ajoute au body
    .then(function(text) {
      var p = document.createElement('p');
      p.textContent = text;
      document.body.appendChild(p);
    })
    // Gestion simple des erreurs réseau / lecture
    .catch(function(err) {
      console.error('Erreur fetch:', err);
    });
});
