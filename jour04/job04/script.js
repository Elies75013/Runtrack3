// Au clic sur le bouton update, on appelle l'endpoint PHP `users.php`
// qui renvoie la liste des utilisateurs au format JSON. On remplit ensuite
// le <tbody> du tableau avec les données reçues.
document.getElementById('update').addEventListener('click', function() {
  fetch('users.php')
    .then(function(r){ return r.json(); })
    .then(function(data){
      var tbody = document.querySelector('#usersTable tbody');
      tbody.innerHTML = '';
      data.forEach(function(u){
        var tr = document.createElement('tr');
        ['id','nom','prenom','email'].forEach(function(k){
          var td = document.createElement('td');
          td.textContent = u[k] || '';
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    })
    .catch(function(e){ console.error(e); });
});
