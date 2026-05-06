/**
 * Exercise 5: Forms & Validation
 * ================================
 */

const form = document.querySelector('#registration-form');
const submitBtn = document.querySelector('#submit-btn');

// ============================================================
// HELPER: Show or clear an error on a field
// ============================================================
function showError(inputId, message) {
    const input = document.querySelector(`#${inputId}`);
    const error = document.querySelector(`#error-${inputId}`);

    input.classList.add('invalid');
    input.classList.remove('valid');
    error.textContent = message;
}

function clearError(inputId) {
    const input = document.querySelector(`#${inputId}`);
    const error = document.querySelector(`#error-${inputId}`);

    input.classList.remove('invalid');
    input.classList.add('valid');
    error.textContent = '';
}


// ============================================================
// TASK 2: Individual Field Validators
// ============================================================

function validateName() {
    const name = document.querySelector('#full-name').value.trim();

    if (name.length < 2) {
        showError('full-name', 'Name must be at least 2 characters.');
        return false;
    }

    clearError('full-name');
    return true;
}

function validateEmail() {
    const email = document.querySelector('#email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        showError('email', 'Please enter a valid email address.');
        return false;
    }

    clearError('email');
    return true;
}

function validatePassword() {
    const password = document.querySelector('#password').value;
    updatePasswordStrength(password);

    if (password.length < 8 || !/\d/.test(password)) {
        showError('password', 'Password must be at least 8 characters and include a number.');
        return false;
    }

    clearError('password');
    return true;
}

function validateConfirmPassword() {
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirm-password').value;

    if (confirmPassword !== password || confirmPassword === '') {
        showError('confirm-password', 'Passwords must match.');
        return false;
    }

    clearError('confirm-password');
    return true;
}

function validateAge() {
    const age = Number(document.querySelector('#age').value);

    if (age < 18 || age > 120 || !age) {
        showError('age', 'Age must be between 18 and 120.');
        return false;
    }

    clearError('age');
    return true;
}

function validateCountry() {
    const country = document.querySelector('#country').value;

    if (country === '') {
        showError('country', 'Please select a country.');
        return false;
    }

    clearError('country');
    return true;
}

function validateBio() {
    const bio = document.querySelector('#bio').value.trim();

    if (bio.length < 10) {
        showError('bio', 'Bio must be at least 10 characters.');
        return false;
    }

    if (bio.length > 200) {
        showError('bio', 'Bio must be 200 characters or fewer.');
        return false;
    }

    clearError('bio');
    return true;
}

function validateAccountType() {
    const accountType = document.querySelector('#account-type').value;

    if (accountType === '') {
        showError('account-type', 'Please choose an account type.');
        return false;
    }

    clearError('account-type');
    return true;
}

function validateTerms() {
    const terms = document.querySelector('#terms');

    if (!terms.checked) {
        showError('terms', 'You must agree to the terms.');
        return false;
    }

    clearError('terms');
    return true;
}


// ============================================================
// TASK 4: Password Strength Indicator
// ============================================================
function updatePasswordStrength(password) {
    const strength = document.querySelector('#password-strength');

    if (!strength) return;

    strength.className = 'strength-bar';

    if (password.length === 0) {
        strength.textContent = '';
    } else if (password.length < 8) {
        strength.textContent = 'Weak password';
        strength.classList.add('weak');
    } else if (password.length >= 8 && /\d/.test(password)) {
        strength.textContent = 'Strong password';
        strength.classList.add('strong');
    } else {
        strength.textContent = 'Fair password';
        strength.classList.add('fair');
    }
}


// ============================================================
// TASK 5: Bio Character Counter
// ============================================================
const bioTextarea = document.querySelector('#bio');
const charCount = document.querySelector('#char-count');

bioTextarea.addEventListener('input', function () {
    const length = bioTextarea.value.length;

    charCount.textContent = `${length} / 200 characters`;

    if (length > 200) {
        charCount.classList.add('over-limit');
        submitBtn.disabled = true;
    } else {
        charCount.classList.remove('over-limit');
        submitBtn.disabled = false;
    }
});


// ============================================================
// TASK 2: Attach real-time listeners
// ============================================================
document.querySelector('#full-name').addEventListener('blur', validateName);
document.querySelector('#email').addEventListener('blur', validateEmail);
document.querySelector('#password').addEventListener('input', validatePassword);
document.querySelector('#confirm-password').addEventListener('input', validateConfirmPassword);
document.querySelector('#age').addEventListener('blur', validateAge);
document.querySelector('#country').addEventListener('change', validateCountry);
document.querySelector('#bio').addEventListener('blur', validateBio);
document.querySelector('#account-type').addEventListener('change', validateAccountType);
document.querySelector('#terms').addEventListener('change', validateTerms);


// ============================================================
// TASK 3: Submit Handler
// ============================================================
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const results = [
        validateName(),
        validateEmail(),
        validatePassword(),
        validateConfirmPassword(),
        validateAge(),
        validateCountry(),
        validateBio(),
        validateAccountType(),
        validateTerms()
    ];

    if (results.every(result => result === true)) {
        document.querySelector('#success-message').classList.remove('hidden');
        form.classList.add('hidden');
    } else {
        const firstInvalid = document.querySelector('.invalid');

        if (firstInvalid) {
            firstInvalid.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            firstInvalid.focus();
        }
    }
});