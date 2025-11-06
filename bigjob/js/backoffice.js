// Gestion du backoffice

function showBackoffice() {
    // Vérifier les permissions
    if (currentUser.role !== 'moderator' && currentUser.role !== 'admin') {
        return;
    }

    document.getElementById('calendarView').classList.add('hidden');
    document.getElementById('backofficeView').classList.remove('hidden');

    // Afficher le panel admin uniquement pour les administrateurs
    if (currentUser.role === 'admin') {
        document.getElementById('adminPanel').style.display = 'block';
        renderUsersList();
    } else {
        document.getElementById('adminPanel').style.display = 'none';
    }

    renderRequestsList();
}

function renderRequestsList() {
    const container = document.getElementById('requestsList');
    const pendingRequests = requests.filter(r => r.status === 'pending');

    if (pendingRequests.length === 0) {
        container.innerHTML = '<div class="alert alert-info">Aucune demande en attente</div>';
        return;
    }

    container.innerHTML = pendingRequests.map(request => {
        const user = users.find(u => u.id === request.userId);
        const date = new Date(request.date);
        const dateStr = date.toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        return `
            <div class="user-card">
                <div class="d-flex justify-content-between align-items-center flex-wrap">
                    <div class="mb-2 mb-md-0">
                        <h5 class="mb-1">${request.userName}</h5>
                        <p class="mb-1 text-muted">${user.email}</p>
                        <p class="mb-0"><i class="fas fa-calendar me-2"></i>${dateStr}</p>
                    </div>
                    <div>
                        <button class="btn btn-success btn-sm me-2 mb-2 mb-md-0" onclick="approveRequest(${request.id})">
                            <i class="fas fa-check"></i> Approuver
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="rejectRequest(${request.id})">
                            <i class="fas fa-times"></i> Refuser
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function approveRequest(requestId) {
    const request = requests.find(r => r.id === requestId);
    if (request) {
        request.status = 'approved';
        saveData();
        renderRequestsList();
        alert('Demande approuvée');
    }
}

function rejectRequest(requestId) {
    const request = requests.find(r => r.id === requestId);
    if (request) {
        request.status = 'rejected';
        saveData();
        renderRequestsList();
        alert('Demande refusée');
    }
}

function renderUsersList() {
    const container = document.getElementById('usersList');
    
    const roleColors = {
        admin: 'danger',
        moderator: 'warning',
        user: 'primary'
    };

    const roleLabels = {
        admin: 'Administrateur',
        moderator: 'Modérateur',
        user: 'Utilisateur'
    };

    container.innerHTML = users.map(user => {
        return `
            <div class="user-card">
                <div class="d-flex justify-content-between align-items-center flex-wrap">
                    <div class="mb-2 mb-md-0">
                        <h5 class="mb-1">${user.name}</h5>
                        <p class="mb-1 text-muted">${user.email}</p>
                        <span class="badge bg-${roleColors[user.role]} badge-role">
                            ${roleLabels[user.role]}
                        </span>
                    </div>
                    ${user.id !== currentUser.id ? `
                    <div class="btn-group">
                        <button class="btn btn-outline-primary btn-sm dropdown-toggle" 
                                data-bs-toggle="dropdown">
                            Changer rôle
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" onclick="changeUserRole(${user.id}, 'user'); return false;">
                                Utilisateur
                            </a></li>
                            <li><a class="dropdown-item" href="#" onclick="changeUserRole(${user.id}, 'moderator'); return false;">
                                Modérateur
                            </a></li>
                            <li><a class="dropdown-item" href="#" onclick="changeUserRole(${user.id}, 'admin'); return false;">
                                Administrateur
                            </a></li>
                        </ul>
                    </div>
                    ` : '<span class="badge bg-info">Vous</span>'}
                </div>
            </div>
        `;
    }).join('');
}

function changeUserRole(userId, newRole) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.role = newRole;
        saveData();
        renderUsersList();
        alert(`Rôle mis à jour pour ${user.name}`);
    }
}