--ex1.
--create a table for all languages
CREATE TABLE language (
    language_id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Get list of all films joined with their languages – select the following details : film title, description, and language name.
--create a table for all films
CREATE TABLE film (
    film_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    language_id INTEGER REFERENCES language(language_id),
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO language (name) VALUES ('English'), ('French'), ('Japanese');
--1.
SELECT * FROM language;

--2.
SELECT f.title, f.description, l.name AS language_name
FROM film f
INNER JOIN language l ON f.language_id = l.language_id;

--3.
SELECT f.title, f.description, l.name AS language_name
FROM language l
LEFT JOIN film f ON l.language_id = f.language_id;

--4.
CREATE TABLE new_film (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO new_film (name) VALUES ('Inception'), ('The Matrix'), ('Interstellar');

--5.
CREATE TABLE customer_review (
    review_id SERIAL PRIMARY KEY NOT NULL,
    film_id INTEGER REFERENCES new_film(id) ON DELETE CASCADE,
    language_id INTEGER REFERENCES language(language_id),
    title VARCHAR(255),
    score INTEGER CHECK (score BETWEEN 1 AND 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--6.
INSERT INTO customer_review (film_id, language_id, title, score, review_text)
VALUES 
(1, 1, 'Amazing Sci-Fi', 10, 'A mind-bending masterpiece by Nolan.'),
(2, 1, 'Classic', 9, 'The best action movie of the 90s.');

ex2
--1
UPDATE film 
SET language_id = 2 
WHERE film_id IN (1, 2, 3);

--2Which foreign keys (references) are defined for the customer table? How does this affect the way in which we INSERT into the customer table?
-- The customer table has foreign keys referencing the address and store tables. This means that when inserting into the customer table, you must ensure that the address_id and store_id values you provide correspond to existing records in the address and store tables. If you try to insert a customer with an address_id or store_id that does not exist, the database will reject the insertion due to the foreign key constraint.

--3We created a new table called customer_review. Drop this table. Is this an easy step, or does it need extra checking?
DROP TABLE customer_review;
-- This step is straightforward if there are no other tables referencing customer_review through foreign keys. However, if there are any foreign key constraints referencing customer_review, you would need to either drop those constraints or the referencing tables before you can drop customer_review. Always check for dependencies before dropping a table to avoid errors. 

--4Find out how many rentals are still outstanding (ie. have not been returned to the store yet).
SELECT COUNT(*) AS outstanding_rentals
FROM rental
WHERE return_date IS NULL;

--5.Find the 30 most expensive movies which are outstanding (ie. have not been returned to the store yet)
SELECT f.title, f.rental_rate
FROM rental r
JOIN film f ON r.film_id = f.film_id
WHERE r.return_date IS NULL
ORDER BY f.rental_rate DESC
LIMIT 30;

--6finding the 4 movie
--a
SELECT f.title 
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
WHERE f.description ILIKE '%sumo wrestler%'
AND a.first_name = 'Penelope' AND a.last_name = 'Monroe';

--b
SELECT title 
FROM film 
WHERE length < 60 AND rating = 'R' 
AND film_id IN (SELECT film_id FROM film_category fc JOIN category c ON fc.category_id = c.category_id WHERE c.name = 'Documentary');

--c
SELECT f.title
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN customer c ON r.customer_id = c.customer_id
JOIN payment p ON r.rental_id = p.rental_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan'
AND p.amount > 4.00
AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';

--d
SELECT f.title, f.description, f.replacement_cost
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan'
AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC
LIMIT 1;