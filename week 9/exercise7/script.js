/**
 * Exercise 7: Local Storage — Notes App
 * =======================================
 */

const STORAGE_KEY = 'week9_notes';

let notes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let editingId = null;

function saveNotes() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// ============================================================
// Render Notes
// ============================================================

const notesContainer = document.querySelector('#notes-container');
const notesCount = document.querySelector('#notes-count');

function renderNotes(filter = '') {
    notesContainer.innerHTML = '';

    let filtered = notes.filter(function (note) {
        return (
            note.title.toLowerCase().includes(filter.toLowerCase()) ||
            note.body.toLowerCase().includes(filter.toLowerCase())
        );
    });

    filtered.sort(function (a, b) {
        return b.pinned - a.pinned;
    });

    notesCount.textContent = `${filtered.length} note(s)`;

    if (filtered.length === 0) {
        notesContainer.innerHTML = `
      <div class="empty-state">
        <p>${filter ? `No results for "${filter}"` : 'No notes yet. Create your first one!'}</p>
      </div>
    `;
        return;
    }

    filtered.forEach(function (note) {
        const card = document.createElement('div');
        card.classList.add('note-card');

        if (note.pinned) {
            card.classList.add('pinned');
        }

        const preview =
            note.body.length > 100 ? note.body.slice(0, 100) + '...' : note.body;

        const date = new Date(note.createdAt).toLocaleDateString();

        card.innerHTML = `
      <h3>${note.pinned ? '📌 ' : ''}${note.title}</h3>
      <p class="note-body">${preview || 'No content'}</p>

      <div class="note-meta">
        <span>${date}</span>

        <div class="note-actions">
          <button class="btn-edit" data-action="edit" data-id="${note.id}">Edit</button>
          <button class="btn-pin" data-action="pin" data-id="${note.id}">
            ${note.pinned ? 'Unpin' : 'Pin'}
          </button>
          <button class="btn-delete" data-action="delete" data-id="${note.id}">Delete</button>
        </div>
      </div>
    `;

        notesContainer.appendChild(card);
    });
}

// ============================================================
// Create / Update Notes
// ============================================================

const noteForm = document.querySelector('#note-form');
const titleInput = document.querySelector('#note-title');
const bodyInput = document.querySelector('#note-body');
const submitBtn = document.querySelector('#btn-submit');
const cancelBtn = document.querySelector('#btn-cancel');
const formTitle = document.querySelector('#form-title');

noteForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (!title) {
        titleInput.focus();
        return;
    }

    if (editingId !== null) {
        const note = notes.find(function (note) {
            return note.id === editingId;
        });

        if (note) {
            note.title = title;
            note.body = body;
        }

        editingId = null;
        formTitle.textContent = 'New Note';
        submitBtn.textContent = '💾 Save Note';
        cancelBtn.classList.add('hidden');

    } else {
        const newNote = {
            id: Date.now(),
            title: title,
            body: body,
            createdAt: new Date().toISOString(),
            pinned: false
        };

        notes.push(newNote);
    }

    saveNotes();
    renderNotes(searchInput.value);
    noteForm.reset();
});

cancelBtn.addEventListener('click', function () {
    editingId = null;
    noteForm.reset();
    formTitle.textContent = 'New Note';
    submitBtn.textContent = '💾 Save Note';
    cancelBtn.classList.add('hidden');
});

// ============================================================
// Edit, Pin, Delete
// ============================================================

notesContainer.addEventListener('click', function (event) {
    const btn = event.target.closest('button[data-action]');
    if (!btn) return;

    const id = parseInt(btn.dataset.id);
    const action = btn.dataset.action;

    if (action === 'delete') {
        const confirmDelete = confirm('Are you sure you want to delete this note?');

        if (confirmDelete) {
            notes = notes.filter(function (note) {
                return note.id !== id;
            });

            saveNotes();
            renderNotes(searchInput.value);
        }
    }

    if (action === 'pin') {
        const note = notes.find(function (note) {
            return note.id === id;
        });

        if (note) {
            note.pinned = !note.pinned;
            saveNotes();
            renderNotes(searchInput.value);
        }
    }

    if (action === 'edit') {
        const note = notes.find(function (note) {
            return note.id === id;
        });

        if (note) {
            editingId = note.id;
            titleInput.value = note.title;
            bodyInput.value = note.body;

            formTitle.textContent = 'Edit Note';
            submitBtn.textContent = 'Update Note';
            cancelBtn.classList.remove('hidden');

            titleInput.focus();
        }
    }
});

// ============================================================
// Search Filter
// ============================================================

const searchInput = document.querySelector('#search-input');

searchInput.addEventListener('input', function () {
    renderNotes(searchInput.value);
});

// ============================================================
// Initialize
// ============================================================

renderNotes();