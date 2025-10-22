// Ensemble des types trouvés dans le fichier pokemon.json (utilisé pour le <select>)
var typesSet = new Set();

// Retourne le nom à afficher pour un pokémon.
// { english: ..., french: ..., japanese: ... } — on préfère french puis english.
function getPokemonDisplayName(p) {
  if (p && p.name) {
    if (typeof p.name === 'string') return p.name;
    return p.name.french || p.name.english || Object.values(p.name)[0] || '';
  }
  return '';
}

// Remplit le <select id="pokeType"> avec la liste des types triés.
// On conserve la première option placeholder (index 0) et on remplace le reste.
function renderTypes(types) {
  var select = document.getElementById('pokeType');
  for (var i = select.options.length - 1; i >= 1; i--) select.remove(i);
  types.forEach(function(t) {
    var opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    select.appendChild(opt);
  });
}

// Affiche la liste des pokémon fournie sous forme d'une liste non-ordonnée.
// Si aucun résultat, on affiche un message simple.
function renderResults(list) {
  var container = document.getElementById('results');
  container.innerHTML = '';
  if (!list || list.length === 0) {
    container.textContent = 'Aucun résultat.';
    return;
  }
  var ul = document.createElement('ul');
  list.forEach(function(p) {
    var li = document.createElement('li');
    var name = getPokemonDisplayName(p);
    var types = Array.isArray(p.type) ? p.type.join(', ') : (p.type || '');
    li.textContent = (p.id || '') + ' - ' + name + ' (' + types + ')';
    ul.appendChild(li);
  });
  container.appendChild(ul);
}

// Charge le fichier pokemon.json, récupère les types uniques et appelle renderTypes.
function loadAndPopulateTypes() {
  fetch('pokemon.json')
    .then(function(r){ return r.json(); })
    .then(function(data){
      data.forEach(function(p){
        if (Array.isArray(p.type)) p.type.forEach(function(t){ if (t) typesSet.add(t); });
      });
      renderTypes(Array.from(typesSet).sort());
    })
    .catch(function(e){ console.error(e); });
}

// Écouteur sur le bouton 'filtrer' : lit les valeurs du formulaire,
// recharge pokemon.json et filtre les éléments selon les critères.
document.getElementById('filterBtn').addEventListener('click', function(){
  var id = document.getElementById('pokeId').value.trim();
  var name = document.getElementById('pokeName').value.trim().toLowerCase();
  var type = document.getElementById('pokeType').value;

  fetch('pokemon.json')
    .then(function(r){ return r.json(); })
    .then(function(data){
      var filtered = data.filter(function(p){
        if (id) {
          // compare numeric or string id
          if (String(p.id) !== String(id)) return false;
        }
        if (name) {
          var display = getPokemonDisplayName(p).toLowerCase();
          if (display.indexOf(name) === -1) return false;
        }
        if (type) {
          if (!Array.isArray(p.type) || p.type.indexOf(type) === -1) return false;
        }
        return true;
      });
      renderResults(filtered);
    })
    .catch(function(e){ console.error(e); });
});

loadAndPopulateTypes();
