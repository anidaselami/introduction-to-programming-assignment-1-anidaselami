/**
 * script.js — Final Project
 * Task Manager
 */

const STORAGE_KEY = 'final_project_tasks';

const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const taskCount = document.querySelector('#task-count');
const clearCompletedBtn = document.querySelector('#clear-completed');
const filterButtons = document.querySelectorAll('.filter-btn');

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let currentFilter = 'all';

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';

    let filteredTasks = tasks;

    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    taskCount.textContent = `${filteredTasks.length} task(s)`;

    if (filteredTasks.length === 0) {
        taskList.innerHTML = `<li class="empty-state">No tasks to show.</li>`;
        return;
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'task-item completed' : 'task-item';

        li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
        <span class="task-text">${task.text}</span>
      </div>
      <button class="delete-btn" data-id="${task.id}">Delete</button>
    `;

        taskList.appendChild(li);
    });
}

function addTask(text) {
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(task => task.id === id);

    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

async function loadStarterTask() {
    try {
        if (tasks.length > 0) return;

        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');

        if (!response.ok) {
            throw new Error('Could not load starter task.');
        }

        const data = await response.json();

        tasks.push({
            id: Date.now(),
            text: data.title,
            completed: data.completed
        });

        saveTasks();
        renderTasks();

    } catch (error) {
        console.error(error);
    }
}

taskForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (!text) {
        taskInput.focus();
        return;
    }

    addTask(text);
    taskForm.reset();
    taskInput.focus();
});

taskList.addEventListener('click', function (event) {
    const id = Number(event.target.dataset.id);

    if (event.target.type === 'checkbox') {
        toggleTask(id);
    }

    if (event.target.classList.contains('delete-btn')) {
        deleteTask(id);
    }
});

filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        filterButtons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');
        currentFilter = button.dataset.filter;

        renderTasks();
    });
});

clearCompletedBtn.addEventListener('click', clearCompletedTasks);

renderTasks();
loadStarterTask();