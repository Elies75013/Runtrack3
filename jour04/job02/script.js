function jsonValueKey(jsonString, key) {
  // Essaie d'abord un parse JSON strict (clé/valeurs doivent être valides JSON)
  try {
    var obj = JSON.parse(jsonString);
    return obj[key];
  } catch (e) {
    // Si la chaîne n'est pas du JSON strict (p.ex. clés non-quotées),
    // on tente une approche permissive : exécution contrôlée via Function.
    // ATTENTION: cette approche n'est sûre que si vous contrôlez la source
    // de la chaîne. Ne pas utiliser sur des entrées utilisateurs non fiables.
    try {
      // On enveloppe la chaîne entre parenthèses pour permettre
      // l'évaluation d'un littéral d'objet JavaScript.
      var fixed = Function('return (' + jsonString + ')')();
      return fixed[key];
    } catch (e2) {
      // La chaîne n'est ni du JSON valide ni un littéral JS analysable
      console.error('Invalid JSON string');
      return undefined;
    }
  }
}

// Export for browser global use
window.jsonValueKey = jsonValueKey;
