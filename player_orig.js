// Get Player ID from URL
const urlParams = new URLSearchParams(window.location.search);
const playerId = parseInt(urlParams.get('id'), 10);

// Simulated global player data (synchronized with dashboard)
const players = JSON.parse(sessionStorage.getItem('players') || '[]');

// Find the current player
const player = players.find(p => p.id === playerId);

// Update UI elements
const scoreElement = document.getElementById('score');
const districtCards = document.getElementById('district-cards');
const nameInput = document.getElementById('name-input');
const setNameButton = document.getElementById('set-name-button');
const playerName = document.getElementById('player-name');
const addButton = document.getElementById('add-button');
const deleteButton = document.getElementById('delete-button');
const addPopup = document.getElementById('add-popup');
const cardGallery = document.getElementById('card-gallery');
const closePopup = document.getElementById('close-popup');
const backButton = document.getElementById('back-button');

let deleteMode = false; // Tracks whether delete mode is active

// Initialize player data
function initializePlayer() {
    if (player) {
        playerName.textContent = player.name;
        updateScore(); //
        renderDistrictCards();
    } else {
        console.error(`Player with ID ${playerId} not found.`);
    }
}

// Update data in sessionStorage
function updateLocalStorage() {
    sessionStorage.setItem('players', JSON.stringify(players));
}

// Render District Cards
function renderDistrictCards() {
    districtCards.innerHTML = '';
    player.district.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = `card ${card.color}`;
        cardElement.textContent = `${card.name} (${card.points})`;

        // Allow deletion of the card in delete mode
        cardElement.addEventListener('click', () => {
            if (deleteMode) {
                removeCardFromDistrict(index); // Remove the card
                toggleDeleteMode(false); // Exit delete mode after one deletion
            }
        });

        districtCards.appendChild(cardElement);
    });
}

// Add Card to District
function addCardToDistrict(card) {
    player.district.push(card);
    player.score += card.points;
    updateLocalStorage();
    renderDistrictCards();
    updateScore();
    closeAddPopup();
}

// Remove Card from District
function removeCardFromDistrict(index) {
    const removedCard = player.district.splice(index, 1)[0];
    player.score -= removedCard.points;
    updateLocalStorage();
    renderDistrictCards();
    updateScore();
}

// Toggle Delete Mode
function toggleDeleteMode(enable) {
    deleteMode = enable;
    deleteButton.style.backgroundColor = deleteMode ? '#a97d52' : ''; // Highlight the button in delete mode
}

// Show Add Card Popup
addButton.addEventListener('click', () => {
    renderCardGallery();
    addPopup.style.display = 'flex';
});

// Close Add Card Popup
closePopup.addEventListener('click', () => {
    closeAddPopup();
});

// Close Add Popup Function
function closeAddPopup() {
    addPopup.style.display = 'none';
}

function updateScore() {
    scoreElement.textContent = `${player.district.reduce((sum, card) => sum + card.points, 0)}`;
}


// Render Card Gallery for Adding Cards
function renderCardGallery() {
    cardGallery.innerHTML = '';
    const cards = [
        { name: 'Manor', points: 3, color: 'yellow' },
        { name: 'Castle', points: 4, color: 'yellow' },
        { name: 'Palace', points: 5, color: 'yellow' },
        { name: 'Temple', points: 1, color: 'blue' },
        { name: 'Church', points: 2, color: 'blue' },
        { name: 'Cathedral', points: 5, color: 'blue' },
        { name: 'Market', points: 2, color: 'green' },
        { name: 'Trading Post', points: 3, color: 'green' },
        { name: 'Docks', points: 3, color: 'green' },
        { name: 'Fortress', points: 5, color: 'red' },
        { name: 'Battlefield', points: 3, color: 'red' },
        { name: 'Prison', points: 2, color: 'red' },
        { name: 'Library', points: 6, color: 'purple' },
        { name: 'School of Magic', points: 6, color: 'purple' },
        { name: 'Observatory', points: 5, color: 'purple' },
        { name: 'Laboratory', points: 5, color: 'purple' },
        { name: 'Graveyard', points: 5, color: 'purple' }
    ];
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = `card ${card.color}`;
        cardElement.textContent = `${card.name} (${card.points})`;

        // Add card when clicked
        cardElement.addEventListener('click', () => {
            addCardToDistrict(card);
        });

        cardGallery.appendChild(cardElement);
    });
}


// Set Player Name
setNameButton.addEventListener('click', () => {
    const newName = nameInput.value.trim();
    if (newName) {
        player.name = newName; // Update the player's name
        playerName.textContent = newName;
        updateLocalStorage();
        nameInput.value = ''; // Clear the input
    } else {
        alert('Please enter a valid name.');
    }
});

// Back to Dashboard Button
backButton.addEventListener('click', () => {
    window.location.href = 'index.html'; // Navigate back to the central dashboard
});

// Delete Button Toggle
deleteButton.addEventListener('click', () => {
    toggleDeleteMode(!deleteMode); // Toggle delete mode on/off
});

// Initialize player page
initializePlayer();
