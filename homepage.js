import { getFirestore, setDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { firebaseConfig } from './auth.js'; // Ensure this path is correct based on your file structure

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to generate a unique ID for the patient
function generateUniqueId() {
    return 'patient-' + Date.now(); // Generate a unique ID based on the current timestamp
}

// Function to fetch patient data by user ID
async function fetchPatientData(userID) {
    const docRef = doc(db, "patients", userID); // Assuming userID is used as document ID in patients collection
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
}


// Function to populate the form with patient data
async function populatePatientForm() {
    const userID = localStorage.getItem('loggedInUserId'); // Get the logged-in user ID
    if (userID) {
        const patientData = await fetchPatientData(userID);
        if (patientData) {
            document.getElementById('patientName').value = patientData.patientName || '';
            document.getElementById('cccd').value = patientData.cccd || '';
            document.getElementById('phoneNumber').value = patientData.phoneNumber || ''; // Populate phone number
            document.getElementById('gender').value = patientData.gender || 'other';
            document.getElementById('dob').value = patientData.dob || '';
            document.getElementById('occupation').value = patientData.occupation || '';
            document.getElementById('address').value = patientData.address || '';
            document.getElementById('medicalHistory').value = patientData.medicalHistory || '';
        }
    }
}

// Function to add a patient
async function addPatient(event) {
    event.preventDefault();

    const dob = document.getElementById('dob').value;
    const appointmentDate = document.getElementById('appointmentDate').value;
    const currentDate = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại

    // Kiểm tra ngày sinh
    if (dob >= currentDate) {
        showToast('Ngày sinh phải nhỏ hơn ngày hiện tại.');
        return;
    }

    // Kiểm tra ngày hẹn
    if (appointmentDate <= currentDate) {
        showToast('Ngày hẹn phải lớn hơn ngày hiện tại.');
        return;
    }

    const patientData = {
        idNumber: generateUniqueId(), // Automatically generate ID
        patientName: document.getElementById('patientName').value,
        gender: document.getElementById('gender').value,
        cccd: document.getElementById('cccd').value,
        phoneNumber: document.getElementById('phoneNumber').value, // Thêm số điện thoại
        dob: dob,
        occupation: document.getElementById('occupation').value,
        address: document.getElementById('address').value,
        medicalHistory: document.getElementById('medicalHistory').value,
        currentHealth: document.getElementById('currentHealth').value,
        appointmentDate: appointmentDate,
        startTime: document.getElementById('startTime').value,
        userID: localStorage.getItem('loggedInUserId'), // Get the logged-in user ID from localStorage
    };

    try {
        // Use the userID as the document ID to save patient data
        const docRef = doc(db, "patients", patientData.userID);
        await setDoc(docRef, patientData);
        showToast('Bệnh nhân đã được thêm thành công!'); // Success toast
    } catch (error) {
        console.error("Error adding patient: ", error);
        showToast('Có lỗi xảy ra, vui lòng thử lại!'); // Error toast
    }

    // Reset form
    document.getElementById("userInfoForm").reset();
}

// Function to show toast messages
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;

    document.body.appendChild(toast);
    
    // Show toast
    toast.style.display = 'block';
    
    // Fade in effect
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 100);

    // Fade out and remove toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500);
    }, 3000);
}


// Function to handle user logout 
function logout() {
    if (confirm('Bạn muốn đăng xuất phải không?')) { // Confirmation dialog
        localStorage.removeItem('loggedInUserId'); // Remove user ID from localStorage
        // Redirect to login page or home page
        window.location.href = 'index.html'; // Replace with your login page URL
    }
}


// Initialize event listeners
export function initEventListeners() {
    document.getElementById("submitInfo").addEventListener("click", addPatient);
    document.getElementById("logoutButton").addEventListener("click", logout); // Assuming your logout button has this ID
    populatePatientForm(); // Populate form when the page loads
}
