.headers on
.mode column

-- 4.1
SELECT COUNT(*) AS total_students
FROM students;

-- 4.2
SELECT enrollment_year, COUNT(*) AS student_count
FROM students
GROUP BY enrollment_year;

-- 4.3
SELECT ROUND(AVG(gpa), 2) AS average_gpa
FROM students;

-- 4.4
SELECT MAX(gpa) AS highest_gpa,
       MIN(gpa) AS lowest_gpa,
       AVG(gpa) AS average_gpa
FROM students;

-- 4.5
SELECT department_id, COUNT(*) AS course_count
FROM courses
GROUP BY department_id;

-- 4.6
SELECT courses.title, COUNT(enrollments.student_id) AS student_count
FROM courses
LEFT JOIN enrollments ON courses.id = enrollments.course_id
GROUP BY courses.id, courses.title
ORDER BY student_count DESC;

-- 4.7
SELECT courses.title, COUNT(enrollments.student_id) AS student_count
FROM courses
JOIN enrollments ON courses.id = enrollments.course_id
GROUP BY courses.id, courses.title
HAVING COUNT(enrollments.student_id) > 3;

-- 4.8
SELECT courses.title,
       ROUND(AVG(enrollments.final_exam), 1) AS average_final_exam
FROM courses
JOIN enrollments ON courses.id = enrollments.course_id
GROUP BY courses.id, courses.title;

-- 4.9
SELECT department_id,
       COUNT(*) AS teacher_count,
       AVG(salary) AS average_salary,
       MAX(salary) AS max_salary
FROM teachers
GROUP BY department_id;

-- 4.10
SELECT SUM(fine) AS total_fines,
       AVG(fine) AS average_fine
FROM loans
WHERE fine > 0;

-- 4.11
SELECT genre_id, COUNT(*) AS book_count
FROM books
GROUP BY genre_id;

-- 4.12
SELECT department_id,
       AVG(salary) AS average_salary
FROM teachers
GROUP BY department_id
HAVING AVG(salary) > 75000;