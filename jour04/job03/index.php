<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Job 03</title>
  </head>
  <body>
    <!-- Formulaire de filtrage :
         - id : champ texte (filtre d'égalité sur l'ID)
         - nom : champ texte (recherche partielle sur le nom affiché)
         - type : liste déroulante peuplée dynamiquement depuis pokemon.json
         - filtrer : bouton qui lance le fetch+filtre
    -->
    <form id="filterForm">
      <label>id: <input type="text" id="pokeId"></label>
      <label>nom: <input type="text" id="pokeName"></label>
      <label>type: <select id="pokeType">
        <option value="">--Tous--</option>
      </select></label>
      <input type="button" id="filterBtn" value="filtrer">
    </form>

    <!-- Zone d'affichage des résultats (remplie par script.js) -->
    <div id="results"></div>

    <!-- Inclusion du script qui charge pokemon.json, peuple le select et
         effectue le filtrage sur clic. -->
    <script src="script.js"></script>
  </body>
</html>
