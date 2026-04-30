-- 1. Setup the Environment
DROP TABLE IF EXISTS FirstTab;
DROP TABLE IF EXISTS SecondTab;

CREATE TABLE FirstTab (
     id integer, 
     name VARCHAR(10)
);

INSERT INTO FirstTab (id, name) VALUES
(5,'Pawan'),
(6,'Sharlee'),
(7,'Krish'),
(NULL,'Avtaar');

CREATE TABLE SecondTab (
    id integer 
);

INSERT INTO SecondTab (id) VALUES
(5),
(NULL);

-- 2. Execute the Questions
-- Q1: Returns 0 (The NULL trap)
SELECT 'Q1' AS Question, COUNT(*) 
FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NULL );

-- Q2: Returns 2 (IDs 6 and 7)
SELECT 'Q2' AS Question, COUNT(*) 
FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id = 5 );

-- Q3: Returns 0 (The "Poisoned" list trap)
SELECT 'Q3' AS Question, COUNT(*) 
FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab );

-- Q4: Returns 2 (IDs 6 and 7 because NULL was filtered out of subquery)
SELECT 'Q4' AS Question, COUNT(*) 
FROM FirstTab AS ft WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NOT NULL );