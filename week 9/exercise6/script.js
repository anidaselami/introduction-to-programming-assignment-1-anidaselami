/**
 * Exercise 6: Fetch & APIs
 * =========================
 */

// ============================================================
// UTILITY: Show a loading spinner inside an element
// ============================================================
function showLoading(element) {
    element.innerHTML = '<div class="spinner"></div>';
}

function showError(element, message) {
    element.innerHTML = `<p class="error-text">❌ ${message}</p>`;
}


// ============================================================
// TASK 1 — Random Quote
// ============================================================
const quoteDisplay = document.querySelector('#quote-display');
const btnNewQuote = document.querySelector('#btn-new-quote');

async function fetchQuote() {
    showLoading(quoteDisplay);

    try {
        const response = await fetch('https://api.quotable.io/random');

        if (!response.ok) {
            throw new Error('Quote request failed');
        }

        const data = await response.json();

        quoteDisplay.innerHTML = `
      <blockquote>"${data.content}"</blockquote>
      <p class="quote-author">— ${data.author}</p>
    `;

    } catch (error) {
        showError(quoteDisplay, 'Could not load quote. Check your connection.');
        console.error(error);
    }
}

fetchQuote();
btnNewQuote.addEventListener('click', fetchQuote);


// ============================================================
// TASK 2 — GitHub User Search
// ============================================================
const githubInput = document.querySelector('#github-input');
const btnSearch = document.querySelector('#btn-search-user');
const githubResult = document.querySelector('#github-result');

async function searchUser() {
    const username = githubInput.value.trim();

    if (!username) {
        showError(githubResult, 'Please enter a GitHub username.');
        return;
    }

    showLoading(githubResult);

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (response.status === 404) {
            showError(githubResult, 'User not found.');
            return;
        }

        if (!response.ok) {
            throw new Error('Search failed. Try again.');
        }

        const user = await response.json();

        githubResult.innerHTML = `
      <div class="github-card">
        <img src="${user.avatar_url}" alt="${user.login} avatar" />
        <div class="github-info">
          <h3>${user.name || user.login}</h3>
          <p>@${user.login}</p>
          <p>${user.bio || 'No bio available.'}</p>

          <div class="github-stats">
            <span>Followers: ${user.followers}</span>
            <span>Repos: ${user.public_repos}</span>
          </div>

          <p>
            <a href="${user.html_url}" target="_blank">View GitHub Profile</a>
          </p>
        </div>
      </div>
    `;

    } catch (error) {
        showError(githubResult, error.message || 'Search failed. Try again.');
    }
}

btnSearch.addEventListener('click', searchUser);

githubInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchUser();
    }
});


// ============================================================
// TASK 3 — Posts Feed with Pagination
// ============================================================
const postsContainer = document.querySelector('#posts-container');
const btnLoadMore = document.querySelector('#btn-load-more');

let currentPage = 1;
const postsPerPage = 10;

async function loadPosts() {
    const start = (currentPage - 1) * postsPerPage;

    btnLoadMore.textContent = 'Loading...';
    btnLoadMore.disabled = true;

    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${postsPerPage}`
        );

        if (!response.ok) {
            throw new Error('Could not load posts.');
        }

        const posts = await response.json();

        posts.forEach(function (post) {
            const card = document.createElement('div');
            card.classList.add('post-card');

            card.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      `;

            card.addEventListener('click', function () {
                loadComments(post.id, card);
            });

            postsContainer.appendChild(card);
        });

        currentPage++;

    } catch (error) {
        showError(postsContainer, 'Could not load posts.');
        console.error(error);

    } finally {
        btnLoadMore.textContent = 'Load More Posts';
        btnLoadMore.disabled = false;
    }
}

async function loadComments(postId, cardElement) {
    const existingComments = cardElement.querySelector('.comments-list');

    if (existingComments) {
        existingComments.remove();
        return;
    }

    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );

        if (!response.ok) {
            throw new Error('Could not load comments.');
        }

        const comments = await response.json();

        const commentsList = document.createElement('div');
        commentsList.classList.add('comments-list');

        comments.forEach(function (comment) {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');

            commentDiv.innerHTML = `
        <strong>${comment.email}</strong>
        <p>${comment.body}</p>
      `;

            commentsList.appendChild(commentDiv);
        });

        cardElement.appendChild(commentsList);

    } catch (error) {
        console.error(error);
    }
}

loadPosts();
btnLoadMore.addEventListener('click', loadPosts);


// ============================================================
// TASK 5 — Promise.all: Parallel Fetches
// ============================================================
const btnFetchAll = document.querySelector('#btn-fetch-all');
const multiResult = document.querySelector('#multi-result');

async function fetchAllParallel() {
    showLoading(multiResult);

    try {
        const [quoteRes, userRes, todoRes] = await Promise.all([
            fetch('https://api.quotable.io/random'),
            fetch('https://jsonplaceholder.typicode.com/users/1'),
            fetch('https://jsonplaceholder.typicode.com/todos/1')
        ]);

        if (!quoteRes.ok || !userRes.ok || !todoRes.ok) {
            throw new Error('One or more requests failed.');
        }

        const [quote, user, todo] = await Promise.all([
            quoteRes.json(),
            userRes.json(),
            todoRes.json()
        ]);

        multiResult.innerHTML = `
      <div class="multi-grid">

        <div class="multi-card">
          <h4>Random Quote</h4>
          <p>"${quote.content}"</p>
          <p><strong>— ${quote.author}</strong></p>
        </div>

        <div class="multi-card">
          <h4>User</h4>
          <p><strong>${user.name}</strong></p>
          <p>${user.email}</p>
          <p>${user.company.name}</p>
        </div>

        <div class="multi-card">
          <h4>Todo</h4>
          <p>${todo.title}</p>
          <p>Status: ${todo.completed ? 'Completed' : 'Not completed'}</p>
        </div>

      </div>
    `;

    } catch (error) {
        showError(multiResult, 'One or more requests failed.');
        console.error(error);
    }
}

btnFetchAll.addEventListener('click', fetchAllParallel);