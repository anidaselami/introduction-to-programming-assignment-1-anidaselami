.headers on
.mode column

-- 5.1
SELECT *
FROM students
WHERE gpa > (SELECT AVG(gpa) FROM students);

-- 5.2
SELECT *
FROM students
WHERE id IN (
    SELECT student_id
    FROM enrollments
    WHERE course_id = (
        SELECT id
        FROM courses
        WHERE code = 'CS50'
    )
);

-- 5.3
SELECT *
FROM students
WHERE id NOT IN (
    SELECT student_id
    FROM enrollments
    WHERE course_id = (
        SELECT id
        FROM courses
        WHERE code = 'CS50'
    )
);

-- 5.4
SELECT *
FROM courses
WHERE teacher_id = (
    SELECT id
    FROM teachers
    WHERE salary = (SELECT MAX(salary) FROM teachers)
);

-- 5.5
SELECT student_id, course_count
FROM (
    SELECT student_id, COUNT(*) AS course_count
    FROM enrollments
    GROUP BY student_id
)
WHERE course_count >= 3;

-- 5.6
SELECT member_id, book_count
FROM (
    SELECT member_id, COUNT(*) AS book_count
    FROM loans
    GROUP BY member_id
)
WHERE book_count > 2;

-- 5.7
SELECT *
FROM books
WHERE pages > (SELECT AVG(pages) FROM books);

-- 5.8
SELECT *
FROM students
WHERE EXISTS (
    SELECT 1
    FROM enrollments
    WHERE enrollments.student_id = students.id
      AND enrollments.letter_grade IS NOT NULL
);

-- 5.9
SELECT *
FROM courses
WHERE NOT EXISTS (
    SELECT 1
    FROM enrollments
    WHERE enrollments.course_id = courses.id
      AND enrollments.letter_grade IS NOT NULL
);

-- 5.10
SELECT course_id, enrollment_count
FROM (
    SELECT course_id, COUNT(*) AS enrollment_count
    FROM enrollments
    GROUP BY course_id
)
WHERE enrollment_count = (
    SELECT MAX(course_count)
    FROM (
        SELECT COUNT(*) AS course_count
        FROM enrollments
        GROUP BY course_id
    )
);