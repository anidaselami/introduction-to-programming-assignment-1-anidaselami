/**
 * Exercise 4: JavaScript & the DOM
 * ==================================
 * Complete each task below. Read the README.md for full instructions.
 * Open the browser console (F12) to debug.
 */

// ============================================================
// TASK 1 — Console Warmup
// ============================================================

// TODO 1a
const mainTitle = document.querySelector('#main-title');
mainTitle.textContent = 'DOM Mastery 🚀';

// TODO 1b
const cards = document.querySelectorAll('.card');
console.log(cards.length);

// TODO 1c
const targetBox = document.querySelector('#target-box');
targetBox.style.backgroundColor = 'lightblue';


// ============================================================
// TASK 2 — Click Counter
// ============================================================

// Step 1
const countDisplay = document.querySelector('#count-display');

const btnIncrement = document.querySelector('#btn-increment');
const btnDecrement = document.querySelector('#btn-decrement');
const btnReset = document.querySelector('#btn-reset');

// Step 2
let count = 0;

// Helper function
function updateCountDisplay() {

    countDisplay.textContent = count;

    if (count === 0) {
        countDisplay.classList.add('zero');
        countDisplay.classList.remove('high');

    } else if (count > 5) {
        countDisplay.classList.add('high');
        countDisplay.classList.remove('zero');

    } else {
        countDisplay.classList.remove('zero');
        countDisplay.classList.remove('high');
    }
}

// Increment
btnIncrement.addEventListener('click', function () {
    count++;
    updateCountDisplay();
});

// Decrement
btnDecrement.addEventListener('click', function () {
    if (count > 0) {
        count--;
    }

    updateCountDisplay();
});

// Reset
btnReset.addEventListener('click', function () {
    count = 0;
    updateCountDisplay();
});

// Initialize
updateCountDisplay();


// ============================================================
// TASK 3 — Dynamic List Builder
// ============================================================

const listInput = document.querySelector('#list-input');
const dynamicList = document.querySelector('#dynamic-list');

const btnAddItem = document.querySelector('#btn-add-item');

btnAddItem.addEventListener('click', function () {

    const inputValue = listInput.value.trim();

    if (inputValue === '') {

        listInput.classList.add('shake');

        setTimeout(function () {
            listInput.classList.remove('shake');
        }, 300);

        return;
    }

    const li = document.createElement('li');

    li.innerHTML = `
    ${inputValue}
    <button class="delete-btn">×</button>
  `;

    dynamicList.appendChild(li);

    listInput.value = '';
    listInput.focus();
});

// Delete items
dynamicList.addEventListener('click', function (event) {

    if (event.target.classList.contains('delete-btn')) {

        event.target.parentElement.remove();
    }
});


// ============================================================
// TASK 4 — Show / Hide Toggle
// ============================================================

const toggleBtn = document.querySelector('#btn-toggle');
const detailsDiv = document.querySelector('.details');

toggleBtn.addEventListener('click', function () {

    detailsDiv.classList.toggle('hidden');

    if (detailsDiv.classList.contains('hidden')) {
        toggleBtn.textContent = 'Show Details';
    } else {
        toggleBtn.textContent = 'Hide Details';
    }
});


// ============================================================
// TASK 5 — Color Mixer
// ============================================================

const sliderR = document.querySelector('#slider-r');
const sliderG = document.querySelector('#slider-g');
const sliderB = document.querySelector('#slider-b');

const colorPreview = document.querySelector('#color-preview');
const hexDisplay = document.querySelector('#hex-display');

function updateColor() {

    const r = parseInt(sliderR.value);
    const g = parseInt(sliderG.value);
    const b = parseInt(sliderB.value);

    // Update displayed values
    document.querySelector('#val-r').textContent = r;
    document.querySelector('#val-g').textContent = g;
    document.querySelector('#val-b').textContent = b;

    // Update preview color
    colorPreview.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    // Convert to HEX
    const hex =
        '#' +
        r.toString(16).padStart(2, '0') +
        g.toString(16).padStart(2, '0') +
        b.toString(16).padStart(2, '0');

    // Display HEX
    hexDisplay.textContent = hex.toUpperCase();
}

// Slider listeners
sliderR.addEventListener('input', updateColor);
sliderG.addEventListener('input', updateColor);
sliderB.addEventListener('input', updateColor);

// Initialize color
updateColor();