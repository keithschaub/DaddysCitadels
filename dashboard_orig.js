// Simulated in-memory data for players
let players = JSON.parse(sessionStorage.getItem('players')) || [
    { id: 1, name: "Player 1", score: 0, district: [] },
    { id: 2, name: "Player 2", score: 0, district: [] },
    { id: 3, name: "Player 3", score: 0, district: [] },
    { id: 4, name: "Player 4", score: 0, district: [] },
    { id: 5, name: "Player 5", score: 0, district: [] },
    { id: 6, name: "Player 6", score: 0, district: [] },
    { id: 7, name: "Player 7", score: 0, district: [] },
    { id: 8, name: "Player 8", score: 0, district: [] },
    { id: 9, name: "Player 9", score: 0, district: [] }
];

// Save players to sessionStorage
sessionStorage.setItem('players', JSON.stringify(players));

// Render the 3x3 dashboard
function renderDashboard() {
    const dashboardGrid = document.getElementById('dashboard-grid');
    dashboardGrid.innerHTML = ''; // Clear existing content

    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-tile';

        // Player tile content
        playerDiv.innerHTML = `
            <h2>${player.name}</h2>
            <p>Score: ${player.score}</p>
            <div class="player-cards">
                ${player.district
                    .map(
                        card => `<span class="card ${card.color}">${card.name} (${card.points})</span>`
                    )
                    .join('')}
            </div>
        `;

        // Click to navigate to the player's page
        playerDiv.addEventListener('click', () => {
            window.location.href = `player${player.id}.html?id=${player.id}`;
        });

        dashboardGrid.appendChild(playerDiv);
    });
}

// Initial render
renderDashboard();

// Periodic updates (to reflect changes from player pages)
setInterval(() => {
    players = JSON.parse(sessionStorage.getItem('players')) || players;
    renderDashboard();
}, 1000);
