DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS passwordReset;
DROP TABLE IF EXISTS friendschips;


CREATE TABLE users (
    id SERIAL primary key,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    profile_picture_url TEXT,
    bio TEXT,
    password_hash VARCHAR(255) NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (firstname, lastname, email, password_hash) 
VALUES ('Yulia', 'Grineva', 'yu@gmail.com', 'hifhibwhebihbfc');

INSERT INTO users (firstname, lastname, email, password_hash) 
VALUES ('Angela', 'Merkel', 'merk@gmail.com', 'hifhiddbwhebihbfc');

INSERT INTO users (firstname, lastname, email, password_hash) 
VALUES ('Olaf', 'Sholz', 'sholz@gmail.com', 'hifhikjsbwhebihbfc');

CREATE TABLE passwordReset (
    id              SERIAL PRIMARY KEY,
    code            VARCHAR(6) NOT NULL,
    email           VARCHAR(50) NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships (
    id              SERIAL PRIMARY KEY,
    sender_id        INT REFERENCES users(id) NOT NULL,
    recipient_id     INT REFERENCES users(id) NOT NULL,
    accepted boolean DEFAULT false
);


