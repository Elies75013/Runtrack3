<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Job 06 - Konami</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
 

  <script>
    // Définition de la séquence Konami demandée par l'exercice.
    // Les valeurs correspondent aux valeurs de 'e.key' pour les touches
    // fléchées et pour les lettres 'b' et 'a'.
    const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    // position courante dans la séquence (0 = début)
    let pos = 0;

    // Ecoute globale des touches. Si la séquence complète est détectée,
    // on ajoute la classe CSS 'konami-active' au <body> pour appliquer
    // le style demandé (couleurs de La Plateforme_).
    window.addEventListener('keydown', function(e) {
      const key = e.key;
      if (key === konami[pos]) {
        pos++;
        if (pos === konami.length) {
          // Séquence complète : activation du style
          document.body.classList.add('konami-active');
          pos = 0; // réinitialisation pour permettre une nouvelle activation
        }
      } else {
        // Si la touche ne correspond pas, on réinitialise la position.
        // Si la touche correspond au premier élément, on démarre à 1.
        pos = (key === konami[0]) ? 1 : 0;
      }
    });
  </script>
</body>
</html>
