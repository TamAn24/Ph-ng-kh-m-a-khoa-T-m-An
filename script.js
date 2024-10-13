// Sign in validation and error message
document.getElementById('submitSignIn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Check if email or password fields are empty
    if (email === '' || password === '') {
        alert('Không thể đăng nhập. Vui lòng nhập email và mật khẩu.'); // Show error message
    } else {
        // Proceed with your authentication logic
        // For example, you can call your Firebase login function here
    }
});

// Toggle between Sign In and Sign Up forms
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signup');

signUpButton.addEventListener('click', function() {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
});

signInButton.addEventListener('click', function() {
    signInForm.style.display = "block";
    signUpForm.style.display = "none";
});
