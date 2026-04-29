--ex1.
SELECT first_name, last_name, birth_date 
FROM students 
ORDER BY last_name ASC 
LIMIT 4;

--ex2.
SELECT first_name, last_name, birth_date 
FROM students
ORDER BY birth_date DESC
LIMIT 1;

--ex3.
SELECT first_name, last_name, birth_date 
FROM students 
LIMIT 3 OFFSET 2;

