-- 6.1 — Social Media Schema

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE follows (
    follower_id INTEGER NOT NULL,
    following_id INTEGER NOT NULL,
    followed_at TEXT DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES users(id),
    FOREIGN KEY (following_id) REFERENCES users(id)
);

CREATE TABLE likes (
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    liked_at TEXT DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);

CREATE TABLE comments (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
);


-- 6.2 — Movie Rental Schema

CREATE TABLE genres (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE movies (
    id INTEGER PRIMARY KEY,
    genre_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    release_year INTEGER,
    FOREIGN KEY (genre_id) REFERENCES genres(id)
);

CREATE TABLE copies (
    id INTEGER PRIMARY KEY,
    movie_id INTEGER NOT NULL,
    status TEXT DEFAULT 'available',
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);

CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE
);

CREATE TABLE rentals (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    copy_id INTEGER NOT NULL,
    rental_date TEXT NOT NULL,
    return_date TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (copy_id) REFERENCES copies(id)
);

CREATE TABLE reviews (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    movie_id INTEGER NOT NULL,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);


-- 6.3 — E-Commerce Schema

CREATE TABLE categories (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    category_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER DEFAULT 0,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE ecommerce_customers (
    id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    order_date TEXT DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'pending',
    FOREIGN KEY (customer_id) REFERENCES ecommerce_customers(id)
);

CREATE TABLE order_items (
    id INTEGER PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price_each REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


-- 6.4 — Fix the Bad Schema

-- Problems identified:
-- 1. Multiple pieces of information are stored in one column.
-- 2. Courses should not be stored as one text field.
-- 3. GPA and salary should be numeric, not TEXT.
-- 4. Student, course, and teacher data should be separated into different tables.

CREATE TABLE fixed_students (
    id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE,
    gpa REAL
);

CREATE TABLE fixed_teachers (
    id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    salary REAL
);

CREATE TABLE fixed_courses (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    teacher_id INTEGER,
    FOREIGN KEY (teacher_id) REFERENCES fixed_teachers(id)
);

CREATE TABLE fixed_enrollments (
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES fixed_students(id),
    FOREIGN KEY (course_id) REFERENCES fixed_courses(id)
);


-- 6.5 — Seed Your Social Media Database

INSERT INTO users (id, username, email) VALUES
(1, 'anida', 'anida@example.com'),
(2, 'lisa', 'lisa@example.com'),
(3, 'mark', 'mark@example.com');

INSERT INTO posts (id, user_id, content) VALUES
(1, 1, 'Hello world!'),
(2, 1, 'Learning SQL.'),
(3, 2, 'Nice day today.');

INSERT INTO follows (follower_id, following_id) VALUES
(1, 2),
(1, 3),
(2, 1);

INSERT INTO likes (user_id, post_id) VALUES
(2, 1),
(3, 1),
(1, 3);

INSERT INTO comments (user_id, post_id, comment_text) VALUES
(2, 1, 'Nice post!'),
(3, 2, 'Good luck!');


-- Verification queries:

-- Q1: Who does user 1 follow?
SELECT users.username
FROM follows
JOIN users ON follows.following_id = users.id
WHERE follows.follower_id = 1;

-- Q2: Most liked posts?
SELECT posts.id, posts.content, COUNT(likes.user_id) AS like_count
FROM posts
LEFT JOIN likes ON posts.id = likes.post_id
GROUP BY posts.id, posts.content
ORDER BY like_count DESC;

-- Q3: User who posted the most?
SELECT users.username, COUNT(posts.id) AS post_count
FROM users
LEFT JOIN posts ON users.id = posts.user_id
GROUP BY users.id, users.username
ORDER BY post_count DESC
LIMIT 1;