// Use the globally available `db` from firebase-init.js
const playersRef = db.ref("players");

playersRef.on("value", (snapshot) => {
    console.log("Real-time data from Firebase:", snapshot.val());
    const players = snapshot.val() || {};
    renderDashboard(players);
});

// Render the 3x3 dashboard
function renderDashboard(players) {
    const dashboardGrid = document.getElementById("dashboard-grid");
    dashboardGrid.innerHTML = ""; // Clear existing content

    Object.entries(players).forEach(([id, player]) => {
        const playerDiv = document.createElement("div");
        playerDiv.className = "player-tile";

        // Render the district cards
        const districtCards = player.district
            ? player.district
                  .map((card) => {
                      // Ensure card data exists before rendering
                      const name = card.name || "Unknown Card";
                      const points = card.points || 0;
                      const color = card.color || "default";

                      return `
                          <span class="card ${color}">
                              ${name} ${points}
                              ${
                                  card.description
                                      ? `<br><small>${card.description}</small>`
                                      : ""
                              }
                          </span>
                      `;
                  })
                  .join("")
            : "No cards";

        // Player tile content
        playerDiv.innerHTML = `
            <h2>${player.name || `Player ${id}`}</h2>
            <p>Score: ${player.score || 0}</p>
            <div class="player-cards">${districtCards}</div>
        `;

        // Click to navigate to the player's page
        playerDiv.addEventListener("click", () => {
            window.location.href = `player${id}.html?id=${id}`;
        });

        dashboardGrid.appendChild(playerDiv);
    });
}
