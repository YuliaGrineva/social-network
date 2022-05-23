
DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS passwordReset;
DROP TABLE IF EXISTS users;





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

CREATE TABLE chat (
    id              SERIAL PRIMARY KEY,
    sender_id        INT REFERENCES users(id) NOT NULL,
    text              TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (firstname, lastname, email, bio, password_hash) 
VALUES ('Yulia', 'Grineva', 'grineva@grineva.com', 'I am sexy and you know it', 'hifhibwhebihbfc');

INSERT INTO users (firstname, lastname, email, bio, password_hash) 
VALUES ('Angela', 'Merkel', 'merkel@merkel.com', 'I like to cook, draw, listen to music','hifhiddbwhebihbfc');

INSERT INTO users (firstname, lastname, email, bio, password_hash) 
VALUES ('Olaf', 'Sholz', 'sholz@sholz.com', 'Dream of buying an expensive yacht', 'hifhikjsbwhebimfmhbfc');

INSERT INTO users (firstname, lastname, email, bio, password_hash) 
VALUES ('Klausi', 'Mausi', 'mausi@mausi.com', 'I am the best programmer in the world', 'hifhikjsbwhebihbfc');

INSERT INTO users (firstname, lastname, email, bio, password_hash) 
VALUES ('Three', 'Beauties', 'beauties@beauties.com', 'We are small but we are very cool!!', 'hifhikjsbcbbwhebihbfc');


INSERT INTO users (firstname, lastname, email, bio, password_hash) 
VALUES ('Big', 'Deal', 'deal@deal.com', 'I am a big deal
I am a big deal
I am a big deal
Big deal big deal', 'hifhikjsbcbbwhebihbfc');




-- // SELECT text, users.firstname, users.lastname, users.profile_picture_url FROM chat JOIN users ON users.id = chat.sender_id ORDER BY chat.created_at DESC LIMIT $1;