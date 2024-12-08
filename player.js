// Use the globally available `db` from firebase-init.js
const urlParams = new URLSearchParams(window.location.search);
const playerId = urlParams.get("id");

// Firebase reference to the specific player
const playerRef = db.ref(`players/${playerId}`);

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
        player.district.forEach((card, index) => {
            const cardElement = document.createElement("div");
            cardElement.className = `card ${card.color}`;
            cardElement.textContent = `${card.name} (${card.points})`;

            // Add click-to-delete functionality in delete mode
            cardElement.addEventListener("click", () => {
                if (deleteMode) {
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
        district.push(card);

        const newScore = district.reduce((sum, card) => sum + card.points, 0);

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

        const newScore = district.reduce((sum, card) => sum + card.points, 0);

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

    // Complete list of district cards
    const cards = [
        { name: "Manor", points: 3, color: "yellow" },
        { name: "Castle", points: 4, color: "yellow" },
        { name: "Palace", points: 5, color: "yellow" },
        { name: "Temple", points: 1, color: "blue" },
        { name: "Church", points: 2, color: "blue" },
        { name: "Cathedral", points: 5, color: "blue" },
        { name: "Market", points: 2, color: "green" },
        { name: "Trading Post", points: 3, color: "green" },
        { name: "Docks", points: 3, color: "green" },
        { name: "Fortress", points: 5, color: "red" },
        { name: "Battlefield", points: 3, color: "red" },
        { name: "Prison", points: 2, color: "red" },
        { name: "Graveyard", points: 5, color: "purple" },
        { name: "School of Magic", points: 6, color: "purple" },
        { name: "Laboratory", points: 5, color: "purple" },
        { name: "Library", points: 6, color: "purple" },
        { name: "Observatory", points: 5, color: "purple" },
        { name: "University", points: 8, color: "purple" },
        { name: "Dragon Gate", points: 8, color: "purple" },
        { name: "Haunted Quarter", points: 5, color: "purple" },
    ];

    cards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.className = `card ${card.color}`;
        cardElement.textContent = `${card.name} (${card.points})`;

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
