--ex1. Create the items table
CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100),
    price INT
);

-- Create the customers table
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);  

-- ex2.Populate items
INSERT INTO items (item_name, price) VALUES 
('Small Desk', 100),
('Large Desk', 300),
-- Unique account creation dates
SELECT DISTINCT create_date FROM customer;RIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);  

-- ex2.Populate items
INSERT INTO items (item_name, price) VALUES 
('Small Desk', 100),
('Large Desk', 300),
('Fan', 80);

-- Populate customers
INSERT INTO customers (first_name, last_name) VALUES 
('Greg', 'Jones'),
('Sandra', 'Jones'),
('Scott', 'Scott'),
('Trevor', 'Green'),
('Melanie', 'Johnson');


--ex3.Use SQL to fetch the following data from the database
-- 1. All items
SELECT * FROM items;
-- 2. All the items with a price above 80 (80 not included)
SELECT * FROM items WHERE price > 80;
-- 3. All the items with a price below 300. (300 included)
SELECT * FROM items WHERE price <= 300;
-- 4. All customers whose last name is ‘Smith’ (What will be your outcome?).
SELECT * FROM customers WHERE last_name = 'Smith';
-- 5. All customers whose last name is ‘Jones’ (What will be your outcome?).
SELECT * FROM customers WHERE last_name = 'Jones';
-- 6. All customers whose firstname is not ‘Scott’.
SELECT * FROM customers WHERE first_name != 'Scott';    

