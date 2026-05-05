.headers on
.mode column

-- 7.1
CREATE INDEX IF NOT EXISTS idx_students_gpa
ON students(gpa);

EXPLAIN QUERY PLAN
SELECT *
FROM students
WHERE gpa > 3.5;


-- 7.2
CREATE VIEW IF NOT EXISTS enrollment_details AS
SELECT students.first_name || ' ' || students.last_name AS student_name,
       courses.title AS course_title,
       enrollments.letter_grade,
       enrollments.final_exam
FROM enrollments
JOIN students ON enrollments.student_id = students.id
JOIN courses ON enrollments.course_id = courses.id;

SELECT *
FROM enrollment_details
WHERE letter_grade = 'A';


-- 7.3
CREATE VIEW IF NOT EXISTS course_statistics AS
SELECT courses.id AS course_id,
       courses.title AS course_title,
       COUNT(enrollments.student_id) AS student_count,
       ROUND(AVG(enrollments.final_exam), 1) AS avg_final_score
FROM courses
LEFT JOIN enrollments ON courses.id = enrollments.course_id
GROUP BY courses.id, courses.title;

SELECT *
FROM course_statistics;


-- 7.4
INSERT INTO students (first_name, last_name, email, enrollment_year, gpa)
VALUES ('New', 'Student', 'newstudent@school.edu', 2024, NULL);


-- 7.5
UPDATE students
SET gpa = 3.22
WHERE id = 17;


-- 7.6
-- Step 1: SELECT to preview
SELECT *
FROM enrollments
WHERE letter_grade = 'F';

-- Step 2: DELETE
-- DELETE FROM enrollments
-- WHERE letter_grade = 'F';


-- 7.7
BEGIN TRANSACTION;

INSERT INTO enrollments (student_id, course_id, letter_grade, final_exam)
VALUES (1, 13, NULL, NULL);

COMMIT;


-- 7.8
BEGIN TRANSACTION;

UPDATE books
SET available_copies = available_copies - 1
WHERE id = 3;

INSERT INTO loans (book_id, member_id, loan_date, return_date, fine)
VALUES (3, 1, DATE('now'), NULL, 0);

COMMIT;


-- 7.9
-- Version A may not use index well:
EXPLAIN QUERY PLAN
SELECT *
FROM students
WHERE gpa + 0 > 3.5;

-- Version B is index-friendly:
EXPLAIN QUERY PLAN
SELECT *
FROM students
WHERE gpa > 3.5;

-- Explanation:
-- Version A applies an expression to gpa, so SQLite may not use the index efficiently.
-- Version B compares gpa directly, so the index on students(gpa) can be used.


-- 7.10
CREATE INDEX IF NOT EXISTS idx_enrollments_student_course
ON enrollments(student_id, course_id);