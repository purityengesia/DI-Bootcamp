-- ex1.Create the database (Note: In many SQL tools, you run 'CREATE DATABASE bootcamp;' first)
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    birth_date DATE NOT NULL
);

-- Efficient multi-row insertion
INSERT INTO students (first_name, last_name, birth_date) VALUES 
('Marc', 'Benichou', '1998-11-02'),
('Yoan', 'Cohen', '2010-12-03'),
('Lea', 'Benichou', '1987-07-27'),
('Amelia', 'Dux', '1996-04-07'),
('David', 'Grez', '2003-06-14'),
('Omer', 'Simpson', '1980-10-03');

-- Inserting your own record (ID will auto-increment to 7)
INSERT INTO students (first_name, last_name, birth_date) 
VALUES ('YourFirstName', 'YourLastName', '1995-01-01');

-- ex2.Fetch all data
SELECT * FROM students;

-- Fetch only first and last names
SELECT first_name, last_name FROM students;

--ex3. Student with ID 2
SELECT first_name, last_name FROM students WHERE id = 2;

-- Last name Benichou AND first name Marc
SELECT first_name, last_name FROM students WHERE last_name = 'Benichou' AND first_name = 'Marc';

-- Last name Benichou OR first name Marc
SELECT first_name, last_name FROM students WHERE last_name = 'Benichou' OR first_name = 'Marc';
-- Contain the letter 'a'
SELECT first_name, last_name FROM students WHERE first_name LIKE '%a%';

-- Start with the letter 'a'
SELECT first_name, last_name FROM students WHERE first_name LIKE 'a%';

-- End with the letter 'a'
SELECT first_name, last_name FROM students WHERE first_name LIKE '%a';

-- Second to last letter is 'a'
SELECT first_name, last_name FROM students WHERE first_name LIKE '%a_';

-- IDs equal to 1 AND 3 (Note: This logic is usually 'id IN (1, 3)')
SELECT first_name, last_name FROM students WHERE id = 1 OR id = 3;

-- ex4.Students born on or after 1/01/2000
SELECT * FROM students WHERE birth_date >= '2000-01-01';