// Gestion de l'authentification

function showLoginForm() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
}

function showRegisterForm() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        showMainApp();
    } else {
        alert('Email ou mot de passe incorrect');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Vérification du domaine email
    if (!email.endsWith('@laplateforme.io')) {
        alert('Utilisez votre adresse email @laplateforme.io');
        return;
    }

    // Vérification si l'email existe déjà
    if (users.find(u => u.email === email)) {
        alert('Cet email est déjà utilisé');
        return;
    }

    // Création du nouvel utilisateur
    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        password: password,
        role: 'user'
    };

    users.push(newUser);
    saveData();
    
    alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
    showLoginForm();
    
    // Réinitialisation du formulaire
    document.getElementById('registerName').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
}

function logout() {
    currentUser = null;
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('authPage').classList.remove('hidden');
    showLoginForm();
    
    // Réinitialisation des formulaires
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
}

function showMainApp() {
    document.getElementById('authPage').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    document.getElementById('userName').textContent = currentUser.name;

    // Afficher le lien backoffice pour les modérateurs et admins
    if (currentUser.role === 'moderator' || currentUser.role === 'admin') {
        document.getElementById('backofficeLink').style.display = 'block';
    } else {
        document.getElementById('backofficeLink').style.display = 'none';
    }

    // Afficher le calendrier par défaut
    showCalendar();
}