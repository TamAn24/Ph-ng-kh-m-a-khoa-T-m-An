// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

// Firebase configuration
export const firebaseConfig = { // <-- Exporting firebaseConfig
    apiKey: "AIzaSyBGIiBVQUnce8CbMa6Yj20hJHYOgwxA4L8",
    authDomain: "login-form-13a0b.firebaseapp.com",
    projectId: "login-form-13a0b",
    storageBucket: "login-form-13a0b.appspot.com",
    messagingSenderId: "1009975540463",
    appId: "1:1009975540463:web:10449e32126b3527c5f91a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dbRealtime = getDatabase(app);
export const db = getFirestore(app);

// Utility function to show messages
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    setTimeout(() => {
        messageDiv.innerHTML = "";
    }, 5000);
}

// Sign Up
async function handleSignUp(event) {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User signed up:', user);

        // Redirect after successful sign up
        window.location.href = 'confirmation.html';
    } catch (error) {
        console.error('Error during sign up:', error);
        showMessage('Unable to create account.', 'signUpMessage');
    }
}

// Sign In
async function handleSignIn(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User signed in:', user);

        // Save logged-in user's ID to localStorage
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = 'homepage.html';
    } catch (error) {
        console.error('Error during sign in:', error);
        showMessage('Invalid email or password.', 'signInMessage');
    }
}

// Add event listeners
const signUpButton = document.getElementById('submitSignUp');
const signInButton = document.getElementById('submitSignIn');

if (signUpButton) signUpButton.addEventListener('click', handleSignUp);
if (signInButton) signInButton.addEventListener('click', handleSignIn);
