DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL primary key,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (firstname, lastname, email, password_hash) 
VALUES ('Yulia', 'Grineva', 'yu@gmail.com', 'hifhibwhebihbfc');

INSERT INTO users (firstname, lastname, email, password_hash) 
VALUES ('Angela', 'Merkel', 'merk@gmail.com', 'hifhiddbwhebihbfc');

INSERT INTO users (firstname, lastname, email, password_hash) 
VALUES ('Olaf', 'Sholz', 'sholz@gmail.com', 'hifhikjsbwhebihbfc');