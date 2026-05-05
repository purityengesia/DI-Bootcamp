CREATE DATABASE quiz_db;
\c quiz_db

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    correct_answer TEXT NOT NULL
);

CREATE TABLE options (
    id SERIAL PRIMARY KEY,
    option_text TEXT NOT NULL
);

CREATE TABLE questions_options (
    question_id INT REFERENCES questions(id),
    option_id INT REFERENCES options(id),
    PRIMARY KEY (question_id, option_id)
);

-- Seed Data
INSERT INTO questions (question, correct_answer) VALUES ('What is the capital of France?', 'Paris');
INSERT INTO options (option_text) VALUES ('Paris'), ('London'), ('Berlin'), ('Madrid');
INSERT INTO questions_options VALUES (1, 1), (1, 2), (1, 3), (1, 4);