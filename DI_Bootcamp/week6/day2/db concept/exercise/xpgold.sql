--ex1
--1.
SELECT rating, COUNT(*) AS film_count
FROM film
GROUP BY rating;

--2.
SELECT title, rating, length, rental_rate
FROM film
WHERE rating IN ('G', 'PG-13')
  AND length < 120
  AND rental_rate < 3.00
ORDER BY title ASC;

--3.
-- Update customer details (Example: ID 1)
UPDATE customer
SET first_name = 'YourFirstName', 
    last_name = 'YourLastName', 
    email = 'your.email@example.com'
WHERE customer_id = 1;

-- Update the address associated with that customer
UPDATE address
SET address = '123 AI Boulevard', 
    district = 'Tech District', 
    postal_code = '12345'
WHERE address_id = (SELECT address_id FROM customer WHERE customer_id = 1);


--ex2
-- Update twins' birthdates
UPDATE students 
SET birth_date = '1998-11-02' 
WHERE first_name IN ('Lea', 'Marc') AND last_name = 'Benichou';

-- Fix David's last name
UPDATE students SET last_name = 'Guez' WHERE first_name = 'David' AND last_name = 'Grez';

-- Delete Lea
DELETE FROM students WHERE first_name = 'Lea' AND last_name = 'Benichou';

--count and grade
-- Basic counts
SELECT COUNT(*) FROM students;
SELECT COUNT(*) FROM students WHERE birth_date > '2000-01-01';

-- Adding and updating grades
ALTER TABLE students ADD COLUMN math_grade INT;

UPDATE students SET math_grade = 80 WHERE id = 1;
UPDATE students SET math_grade = 90 WHERE id IN (2, 4);
UPDATE students SET math_grade = 40 WHERE id = 6;

-- Count high achievers
SELECT COUNT(*) FROM students WHERE math_grade > 83;

-- Add Homer Simpson (using a subquery for birth_date)
INSERT INTO students (first_name, last_name, birth_date, math_grade)
SELECT 'Omer', 'Simpson', birth_date, 70 
FROM students 
WHERE first_name = 'Omer' AND last_name = 'Simpson' LIMIT 1;

--bonus and sum
-- Bonus: Count grades per student
SELECT first_name, last_name, COUNT(math_grade) AS total_grade
FROM students
GROUP BY first_name, last_name;

-- Sum of all grades
SELECT SUM(math_grade) FROM students;

--ex3
--part1
CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id),
    item_id INT REFERENCES items(id),
    quantity_purchased INT
);

-- Inserting using subqueries
INSERT INTO purchases (customer_id, item_id, quantity_purchased) VALUES 
((SELECT id FROM customers WHERE first_name='Scott' AND last_name='Scott'), (SELECT id FROM items WHERE item_name='Fan'), 1),
((SELECT id FROM customers WHERE first_name='Melanie' AND last_name='Johnson'), (SELECT id FROM items WHERE item_name='Large Desk'), 10),
((SELECT id FROM customers WHERE first_name='Greg' AND last_name='Jones'), (SELECT id FROM items WHERE item_name='Small Desk'), 2);

--part2
-- Joining with customers
SELECT * FROM purchases 
JOIN customers ON purchases.customer_id = customers.id;

-- Customer ID 5
SELECT * FROM purchases WHERE customer_id = 5;

-- Large or Small Desks
SELECT * FROM purchases 
JOIN items ON purchases.item_id = items.id
WHERE items.item_name IN ('Large Desk', 'Small Desk');

-- Customers who made a purchase
SELECT customers.first_name, customers.last_name, items.item_name
FROM purchases
JOIN customers ON purchases.customer_id = customers.id
JOIN items ON purchases.item_id = items.id;