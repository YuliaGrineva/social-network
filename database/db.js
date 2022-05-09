const spicedPg = require("spiced-pg");

var dbUrl =
    process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/network";
const db = spicedPg(dbUrl);
const bcrypt = require("bcryptjs");

function hashPassword(password) {
    return bcrypt.genSalt().then((salt) => {
        return bcrypt.hash(password, salt);
    });
}

module.exports.addUser = ({ firstname, lastname, email, password }) => {
    return hashPassword(password).then((password_hash) => {
        const query = `
       INSERT INTO users (firstname, lastname, email, password_hash)
       VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
        const params = [firstname, lastname, email, password_hash];
        return db.query(query, params);
    });
};
