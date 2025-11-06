// Gestion du calendrier

function showCalendar() {
    document.getElementById('calendarView').classList.remove('hidden');
    document.getElementById('backofficeView').classList.add('hidden');
    renderCalendar();
}

function changeMonth(delta) {
    currentDate.setMonth(currentDate.getMonth() + delta);
    renderCalendar();
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    
    document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const numberOfDays = lastDay.getDate();

    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Ajouter les jours vides au début
    for (let i = 0; i < startingDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        grid.appendChild(emptyDay);
    }

    // Ajouter les jours du mois
    for (let day = 1; day <= numberOfDays; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        const currentDay = new Date(year, month, day);
        const dateStr = formatDate(currentDay);
        
        // Vérifier s'il y a une demande pour ce jour
        const request = requests.find(r => r.userId === currentUser.id && r.date === dateStr);
        
        // Désactiver les jours passés
        if (currentDay < today) {
            dayElement.classList.add('disabled');
        } else if (request) {
            if (request.status === 'pending') {
                dayElement.classList.add('requested');
            } else if (request.status === 'approved') {
                dayElement.classList.add('approved');
            } else if (request.status === 'rejected') {
                dayElement.classList.add('rejected');
            }
        }

        dayElement.innerHTML = `<strong>${day}</strong>`;
        
        // Ajouter un indicateur de statut
        if (request) {
            const statusIcon = document.createElement('small');
            statusIcon.innerHTML = request.status === 'pending' ? '⏳' : 
                                  request.status === 'approved' ? '✓' : '✗';
            dayElement.appendChild(statusIcon);
        }

        // Permettre de cliquer uniquement sur les jours futurs sans demande
        if (currentDay >= today && !request) {
            dayElement.onclick = () => openRequestModal(currentDay);
        }

        grid.appendChild(dayElement);
    }
}

function openRequestModal(date) {
    selectedDate = date;
    const dateStr = date.toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    document.getElementById('modalDate').textContent = dateStr;
    
    if (!requestModal) {
        requestModal = new bootstrap.Modal(document.getElementById('requestModal'));
    }
    requestModal.show();
}

function submitRequest() {
    if (selectedDate) {
        const request = {
            id: requests.length + 1,
            userId: currentUser.id,
            userName: currentUser.name,
            date: formatDate(selectedDate),
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        requests.push(request);
        saveData();
        
        requestModal.hide();
        renderCalendar();
        alert('Demande envoyée avec succès !');
    }
}