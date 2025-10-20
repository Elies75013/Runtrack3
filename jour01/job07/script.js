// Fonction jourtravaille pour l'année 2020
function jourtravaille(date) {
    // Liste des jours fériés en France pour 2020 (format : MM-DD)
    var joursFeries = [
        "01-01", // Jour de l'an
        "04-13", // Lundi de Pâques
        "05-01", // Fête du Travail
        "05-08", // Victoire 1945
        "05-21", // Ascension
        "06-01", // Lundi de Pentecôte
        "07-14", // Fête Nationale
        "08-15", // Assomption
        "11-01", // Toussaint
        "11-11", // Armistice
        "12-25"  // Noël
    ];

    var jour = date.getDate();
    var mois = date.getMonth() + 1; // getMonth() retourne 0 pour janvier
    var annee = date.getFullYear();

    // Format MM-DD pour comparaison
    var mmdd = (mois < 10 ? "0" : "") + mois + "-" + (jour < 10 ? "0" : "") + jour;

    // Vérification jour férié
    if (annee === 2020 && joursFeries.includes(mmdd)) {
        console.log(`Le ${jour} ${mois} ${annee} est un jour férié`);
        return;
    }

    // Vérification week-end
    var jourSemaine = date.getDay(); // 0 = dimanche, 6 = samedi
    if (jourSemaine === 0 || jourSemaine === 6) {
        console.log(`Non, ${jour} ${mois} ${annee} est un week-end`);
        return;
    }

    // Sinon jour travaillé
    console.log(`Oui, ${jour} ${mois} ${annee} est un jour travaillé`);
}

// Exemples de test
jourtravaille(new Date(2020, 0, 1));    // 1 janvier 2020, jour férié
jourtravaille(new Date(2020, 4, 1));    // 1 mai 2020, jour férié
jourtravaille(new Date(2020, 6, 14));   // 14 juillet 2020, jour férié
jourtravaille(new Date(2020, 0, 4));    // 4 janvier 2020, samedi
jourtravaille(new Date(2020, 0, 5));    // 5 janvier 2020, dimanche
jourtravaille(new Date(2020, 0, 2));    // 2 janvier 2020, jour travaillé
