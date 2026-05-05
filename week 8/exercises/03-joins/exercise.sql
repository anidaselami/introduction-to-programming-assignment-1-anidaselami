.headers on
.mode column

-- 3.1
SELECT students.first_name || ' ' || students.last_name AS student_name,
       courses.title AS course_title
FROM enrollments
JOIN students ON enrollments.student_id = students.id
JOIN courses ON enrollments.course_id = courses.id;


-- 3.2
SELECT courses.title AS course_title,
       teachers.first_name || ' ' || teachers.last_name AS teacher_name
FROM courses
JOIN teachers ON courses.teacher_id = teachers.id;


-- 3.3
SELECT teachers.first_name || ' ' || teachers.last_name AS teacher_name,
       departments.name AS department_name
FROM teachers
JOIN departments ON teachers.department_id = departments.id;


-- 3.4
SELECT students.first_name || ' ' || students.last_name AS student_name,
       courses.title AS course_title,
       teachers.first_name || ' ' || teachers.last_name AS teacher_name,
       enrollments.letter_grade
FROM enrollments
JOIN students ON enrollments.student_id = students.id
JOIN courses ON enrollments.course_id = courses.id
JOIN teachers ON courses.teacher_id = teachers.id;


-- 3.5
SELECT students.first_name, students.last_name
FROM students
LEFT JOIN enrollments ON students.id = enrollments.student_id
WHERE enrollments.id IS NULL;


-- 3.6
SELECT courses.title
FROM courses
LEFT JOIN enrollments ON courses.id = enrollments.course_id
WHERE enrollments.id IS NULL;


-- 3.7
SELECT books.title AS book_title,
       authors.first_name || ' ' || authors.last_name AS author_name
FROM books
JOIN authors ON books.author_id = authors.id;


-- 3.8
SELECT genres.name AS genre_name,
       books.title AS book_title
FROM genres
LEFT JOIN books ON genres.id = books.genre_id;


-- 3.9
SELECT members.first_name || ' ' || members.last_name AS member_name,
       books.title AS book_title
FROM members
LEFT JOIN loans ON members.id = loans.member_id
LEFT JOIN books ON loans.book_id = books.id;


-- 3.10
SELECT members.first_name || ' ' || members.last_name AS member_name,
       books.title AS book_title,
       loans.loan_date,
       COALESCE(loans.return_date, 'Not returned') AS return_date
FROM loans
JOIN members ON loans.member_id = members.id
JOIN books ON loans.book_id = books.id;