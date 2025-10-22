<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Job 04</title>
  </head>
  <body>
    <!-- Bouton update : au clic, le script appelle users.php et met à jour
         le tableau HTML avec les utilisateurs récupérés depuis la BDD. -->
    <button id="update">update</button>

    <!-- Tableau où seront insérés les utilisateurs (tbody rempli par script.js) -->
    <table id="usersTable" border="1">
      <thead>
        <tr><th>id</th><th>nom</th><th>prenom</th><th>email</th></tr>
      </thead>
      <tbody></tbody>
    </table>

    <!-- Inclusion du script qui effectue le fetch sur users.php et affiche les données -->
    <script src="script.js"></script>
  </body>
</html>
