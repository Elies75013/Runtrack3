<?php
// Cette page renvoie la liste des utilisateurs au format JSON.
header('Content-Type: application/json; charset=utf-8');

$host = '127.0.0.1';
$user = 'root';
$pass = '';
$db = 'utilisateurs';

// Connexion via mysqli
$mysqli = new mysqli($host, $user, $pass, $db);
if ($mysqli->connect_errno) {
  // En cas d'erreur de connexion, renvoyer un JSON contenant l'erreur.
  echo json_encode(['error' => 'Connection failed']);
  exit;
}

// Requête simple : on récupère id, nom, prenom et email depuis la table `utilisateurs`.
$res = $mysqli->query('SELECT id, nom, prenom, email FROM utilisateurs');
$rows = [];
if ($res) {
  // fetch_assoc renvoie un tableau associatif pour chaque ligne
  while ($r = $res->fetch_assoc()) {
    $rows[] = $r;
  }
  $res->free();
}

// Envoi du JSON au client
echo json_encode($rows);
$mysqli->close();

?>
