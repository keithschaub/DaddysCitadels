// Use the globally available `db` from firebase-init.js
const urlParams = new URLSearchParams(window.location.search);
const playerId = urlParams.get("id");

// Firebase reference to the specific player
const playerRef = db.ref(`players/${playerId}`);

// Declare the cards array globally
const cards = [
    { name: "Manor", points: 3, color: "yellow" },
    { name: "Castle", points: 4, color: "yellow" },
    { name: "Palace", points: 5, color: "yellow" },

    { name: "Temple", points: 1, color: "blue" },
    { name: "Church", points: 2, color: "blue" },
    { name: "Monastery", points: 3, color: "blue" },
    { name: "Cathedral", points: 5, color: "blue" },

    { name: "Market", points: 2, color: "green" },
    { name: "Trading Post", points: 2, color: "green" },
    { name: "Tavern", points: 1, color: "green" },
    { name: "Harbor", points: 4, color: "green" },
    { name: "Town Hall", points: 5, color: "green" },
    { name: "Docks", points: 3, color: "green" },

    { name: "Watchtower", points: 1, color: "red" },
    { name: "Fortress", points: 5, color: "red" },
    { name: "Prison", points: 2, color: "red" },
    { name: "Barracks", points: 3, color: "red" },

    {
        name: "Statue",
        points: 3,
        color: "purple",
        description: "If you have the crown at the end of the game, score 5 extra points",
    },
    {
        name: "Dragon Gate",
        points: 6,
        color: "purple",
        description: "At the end of the game, score 2 extra points",
    },
    {
        name: "Museum",
        points: 4,
        color: "purple",
        description: "Once/turn, assign 1 card from your hand facedown under the Museum. At the end of the game, score 1 extra point for each card under Museum",
    },
    {
        name: "Dragon Gate",
        points: 6,
        color: "purple",
        description: "At the end of the game, score 2 extra points",
    },
    {
        name: "Armory",
        points: 3,
        color: "purple",
        description: "During your turn, destroy the Armory to destroy 1 district of your choice",
    },
    {
        name: "Map Room",
        points: 5,
        color: "purple",
        description: "At the end of the game, score 1 extra point for each card in your hand",
    },
    {
        name: "Gold Mine",
        points: 6,
        color: "purple",
        description: "If you choose to gain gold when gatherning resources, gain 1 extra gold",
    },
    {
        name: "Basilica",
        points: 4,
        color: "purple",
        description: "At the end of the game, score 1 extra point for each district in your city with an odd-numbered cost",
    },
    {
        name: "Wishing Well",
        points: 5,
        color: "purple",
        description: "At the end of the game, score 1 extra point for each UNIQUE district in your city (including WW)",
    },
    {
        name: "Thieves' Den",
        points: 6,
        color: "purple",
        description: "Pay some or all of the Thieves' Den cost with cards from your hand instead of gold at a rate of 1 card:1 gold",
    },
    {
        name: "Factory",
        points: 5,
        color: "purple",
        description: "You pay 1 fewer gold to build any other UNIQUE district",
    },
    {
        name: "Keep",
        points: 3,
        color: "purple",
        description: "The rank 8 character cannot use its ability on the Keep",
    },
    {
        name: "Smithy",
        points: 5,
        color: "purple",
        description: "Once/turn, pay 2 gold to gain 3 cards",
    },
    {
        name: "Park",
        points: 6,
        color: "purple",
        description: "If there are no cards in your hand at the end of your turn, gain 2 cards",
    },
    {
        name: "Great Wall",
        points: 6,
        color: "purple",
        description: "The rank 8 character must pay 1 more gold to use its ability on any other district in your city",
    },
    {
        name: "School of Magic",
        points: 6,
        color: "purple",
        description: "For abilities that gain resources for your districts, the SoM counts as the district type of your choice",
    },
    {
        name: "Monument",
        points: 4,
        color: "purple",
        description: "You cannot build the Monument if you have 5 or more districts in your city. Treat Monument as being 2 districts toward your completed city",
    },
    {
        name: "Imperial Treasury",
        points: 5,
        color: "purple",
        description: "At the end of the game, score 1 exta point for each gold in your stash",
    },
    {
        name: "Ivory Tower",
        points: 5,
        color: "purple",
        description: "If the Ivory Tower is the only UNIQUE in your city at the end of the game, score 5 extra points",
    },
    {
        name: "Laboratory",
        points: 5,
        color: "purple",
        description: "Once/turn, discard 1 card from your hand to gain 2 gold",
    },
    {
        name: "Stables",
        points: 2,
        color: "purple",
        description: "Building Stables does nto count toward your building limit for each turn",
    },
    {
        name: "Library",
        points: 6,
        color: "purple",
        description: "If you choose to draw cards when gathering resources, keep all drawn cards",
    },
    {
        name: "Framework",
        points: 3,
        color: "purple",
        description: "You can build a district by destroying Framework instead of paying that district's cost",
    },
    {
        name: "Poor House",
        points: 4,
        color: "purple",
        description: "If you have no gold in your stash at the end of your turn, gain 1 gold",
    },
    {
        name: "Theater",
        points: 6,
        color: "purple",
        description: "At the end of each selection phase, you may exchange your chosen character card with an opponent's character card",
    },
    {
        name: "Observatory",
        points: 4,
        color: "purple",
        description: "If you choose to draw cards when gathering resources, draw 3 cards instead of 2",
    },
    {
        name: "Capitol",
        points: 5,
        color: "purple",
        description: "If you have at least 3 districts of the same type at the end of the game, score 3 extra points",
    },
    {
        name: "Quarry",
        points: 5,
        color: "purple",
        description: "You can build districts that are identical",
    },
    {
        name: "Necropolis",
        points: 5,
        color: "purple",
        description: "You can build Necropolis by destroying 1 district in your city instead of paying Necropolis' cost",
    },
    {
        name: "Haunted Quarter",
        points: 2,
        color: "purple",
        description: "At end of game, Haunted Quarter counts as any 1 district type of your choice",
    },

];

playerRef.on("value", (snapshot) => {
    const player = snapshot.val();
    console.log("Player data:", player); // Debugging: log the data
    renderPlayerPage(player);
});

// Render Player Page
function renderPlayerPage(player) {
    if (!player) {
        console.error("Player not found.");
        return;
    }

    const playerNameElement = document.getElementById("player-name");
    const scoreElement = document.getElementById("score");
    const districtCardsElement = document.getElementById("district-cards");

    // Update player name and score
    playerNameElement.textContent = player.name || `Player ${playerId}`;
    scoreElement.textContent = `${player.score || 0}`;

    // Render district cards
    districtCardsElement.innerHTML = ""; // Clear existing cards
    if (player.district && Array.isArray(player.district)) {
        player.district.forEach((card) => {
            const cardElement = document.createElement("div");
            cardElement.className = `card ${card.color}`;
            cardElement.innerHTML = `
                <strong>${card.name || "Unknown Card"}</strong> ${card.points || 0}
                ${card.description ? `<br><small>${card.description}</small>` : ""}
            `;

            // Add click-to-delete functionality in delete mode
            cardElement.addEventListener("click", () => {
                if (deleteMode) {
                    const index = player.district.indexOf(card);
                    removeCardFromDistrict(index);
                }
            });

            districtCardsElement.appendChild(cardElement);
        });
    } else {
        districtCardsElement.textContent = "No cards in district.";
    }
}

// Set Player Name
document.getElementById("set-name-button").addEventListener("click", () => {
    const newName = document.getElementById("player-name-input").value.trim();
    if (newName) {
        playerRef.update({ name: newName });
    }
});

// Add Card to District
function addCardToDistrict(card) {
    playerRef.child("district").get().then((snapshot) => {
        const district = snapshot.val() || [];

        // Add the card to the district array
        district.push({
            name: card.name || "Unknown Card",
            points: card.points || 0,
            color: card.color || "default",
            description: card.description || "", // Include description if available
        });

        // Recalculate the score
        const newScore = district.reduce((sum, card) => sum + card.points, 0);

        // Update Firebase with the new district and score
        playerRef.update({
            district: district,
            score: newScore,
        });
    });
}

// Remove Card from District
function removeCardFromDistrict(index) {
    playerRef.child("district").get().then((snapshot) => {
        const district = snapshot.val() || [];
        district.splice(index, 1);

        const newScore = district
            .map((name) => cards.find((c) => c.name === name)?.points || 0)
            .reduce((sum, points) => sum + points, 0);

        playerRef.update({
            district: district,
            score: newScore,
        });
    });
}

// Delete mode toggle
let deleteMode = false;
document.getElementById("delete-button").addEventListener("click", () => {
    deleteMode = !deleteMode;
    document.getElementById("delete-button").style.backgroundColor = deleteMode
        ? "#a97d52"
        : "";
});

// Add card functionality
document.getElementById("add-button").addEventListener("click", () => {
    const addPopup = document.getElementById("add-popup");
    addPopup.style.display = "flex";

    const cardGallery = document.getElementById("card-gallery");
    cardGallery.innerHTML = "";

    cards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.className = `card ${card.color}`;
        cardElement.textContent = `${card.name} ${card.points}`;

        cardElement.addEventListener("click", () => {
            addCardToDistrict(card);
            addPopup.style.display = "none"; // Close popup
        });

        cardGallery.appendChild(cardElement);
    });
});

// Close add popup
document.getElementById("close-popup").addEventListener("click", () => {
    document.getElementById("add-popup").style.display = "none";
});

// Back to Dashboard Button
document.getElementById("back-button").addEventListener("click", () => {
    window.location.href = "index.html";
});
