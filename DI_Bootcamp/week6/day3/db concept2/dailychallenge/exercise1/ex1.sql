CREATE TABLE Customer (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE Customer_profile (
    id SERIAL PRIMARY KEY,
    isLoggedIn BOOLEAN DEFAULT false,
    customer_id INTEGER UNIQUE REFERENCES Customer(id) ON DELETE CASCADE
);

INSERT INTO Customer (first_name, last_name) VALUES 
('John', 'Doe'),
('Jerome', 'Lalu'),
('Lea', 'Rive');

INSERT INTO Customer_profile (isLoggedIn, customer_id) 
VALUES (true, (SELECT id FROM Customer WHERE first_name = 'John'));

INSERT INTO Customer_profile (isLoggedIn, customer_id) 
VALUES (false, (SELECT id FROM Customer WHERE first_name = 'Jerome'));

-- The first_name of the LoggedIn customers
SELECT c.first_name 
FROM Customer c
JOIN Customer_profile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn = true;

-- All customers first_name and isLoggedIn columns (including those without a profile)
SELECT c.first_name, COALESCE(cp.isLoggedIn, false) AS isLoggedIn
FROM Customer c
LEFT JOIN Customer_profile cp ON c.id = cp.customer_id;

-- The number of customers that are NOT LoggedIn
SELECT COUNT(*) 
FROM Customer c
LEFT JOIN Customer_profile cp ON c.id = cp.customer_id
WHERE cp.isLoggedIn IS NOT true;

