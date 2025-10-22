<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Job 02</title>
  </head>
  <body>
    <!-- Inclusion du script qui définit jsonValueKey(jsonString, key). -->
    <script src="script.js"></script>

    <!-- Exemple visible (non requis par l'exercice) :
         ce script construit une chaîne JSON, appelle jsonValueKey et affiche
         le résultat dans un paragraphe, pour que le résultat soit visible
         sans ouvrir la console du navigateur. -->
    <script>
      (function(){
        var s = '{"name":"La Plateforme_","address":"8 rue d\'hozier","city":"Marseille","nb_staff":"11","creation":"2019"}';
        var v = typeof jsonValueKey === 'function' ? jsonValueKey(s, 'city') : undefined;
        var p = document.createElement('p');
        p.textContent = 'Résultat test jsonValueKey(city) → ' + (v === undefined ? 'undefined' : v);
        document.body.appendChild(p);
      })();
    </script>
  </body>
</html>
