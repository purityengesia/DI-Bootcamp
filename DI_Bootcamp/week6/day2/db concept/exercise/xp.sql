-- 1. All items, ordered by price (lowest to highest)
SELECT * FROM items ORDER BY price ASC;

-- 2. Items with a price above 80 (80 included), ordered by price (highest to lowest)
SELECT * FROM items WHERE price >= 80 ORDER BY price DESC;

-- 3. First 3 customers alphabetically by first name (exclude primary key)
SELECT first_name, last_name FROM customers ORDER BY first_name ASC LIMIT 3;

-- 4. All last names in reverse alphabetical order
SELECT last_name FROM customers ORDER BY last_name DESC;

--ex2
-- Select all from customer
SELECT * FROM customer;

-- Names with an alias "full_name"
SELECT first_name || ' ' || last_name AS full_name FROM customer;

-- Unique account creation dates
SELECT DISTINCT create_date FROM customer;

--sorted and filter
-- Customer details descending by first name
SELECT * FROM customer ORDER BY first_name DESC;

-- Film details ordered by rental rate (cheapest first)
SELECT film_id, title, description, release_year, rental_rate 
FROM film 
ORDER BY rental_rate ASC;

-- Customers in Texas (from address table)
SELECT address, phone FROM address WHERE district = 'Texas';

-- Movie ID 15 or 150
SELECT * FROM film WHERE film_id = 15 OR film_id = 150;

--searching for movies 
-- Search for a specific movie (e.g., 'Inception')
SELECT film_id, title, description, length, rental_rate 
FROM film 
WHERE title = 'Inception';

-- Search by the first two letters (e.g., 'In%')
SELECT film_id, title, description, length, rental_rate 
FROM film 
WHERE title LIKE 'In%';

--pignation
-- 10 cheapest movies
SELECT title, rental_rate FROM film ORDER BY rental_rate ASC LIMIT 10;

-- The next 10 cheapest movies (using OFFSET)
SELECT title, rental_rate FROM film ORDER BY rental_rate ASC LIMIT 10 OFFSET 10;

-- Bonus: Next 10 without LIMIT (Using FETCH)
SELECT title, rental_rate FROM film 
ORDER BY rental_rate ASC 
OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;

--joins and relationships
-- Customer details with their city (joining customer and address)
SELECT c.first_name, c.last_name, a.city
FROM customer c
JOIN address a ON c.address_id = a.address_id;

--You need to check your inventory. Write a query to get all the movies which are not in inventory.
SELECT f.title
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
WHERE i.inventory_id IS NULL;

--Write a query to find which city is in which country
SELECT ci.city, co.country
FROM city ci
JOIN country co ON ci.country_id = co.country_id;

--Bonus You want to be able to see how your sellers have been doing? Write a query to get the customer’s id, names (first and last), the amount and the date of payment ordered by the id of the staff member who sold them the dvd.
SELECT c.customer_id, c.first_name, c.last_name, p.amount, p.payment_date, s.staff_id
FROM payment p
JOIN customer c ON p.customer_id = c.customer_id
JOIN staff s ON p.staff_id = s.staff_id
ORDER BY s.staff_id;
