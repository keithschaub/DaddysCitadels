// Initialize Firebase
const firebaseConfig = {

  apiKey: "AIzaSyCzEORQtK1jPwQVGCf5smucXIuQFY1H6kQ",
  authDomain: "daddyscitadels.firebaseapp.com",
  databaseURL: "https://daddyscitadels-default-rtdb.firebaseio.com",
  projectId: "daddyscitadels",
  storageBucket: "daddyscitadels.firebasestorage.app",
  messagingSenderId: "291613245854",
  appId: "1:291613245854:web:9afdf2bc83a3ed7094968f",
  measurementId: "G-07D134EF4K"

};

// Initialize Firebase (if not already initialized)
if (!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized");
} else {
    console.log("Firebase already initialized");
}

// Make the Firebase app and database globally available
const db = firebase.database();