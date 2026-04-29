
CREATE TABLE actors (
    actor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    age INTEGER CHECK (age >= 0), -- Added comma here
    number_oscars SMALLINT NOT NULL CHECK (number_oscars >= 0) -- This now works!
);

--1. Count how many actors are in the table
SELECT COUNT(*) FROM actors;

--2. Try to add a new actor with some blank fields. What do you think the outcome will be ?
INSERT INTO actors (first_name, last_name) VALUES ('', 'Smith');