const spicedPg = require("spiced-pg");

// const cryptoRandomString = require("crypto-random-string");
// const secretCode = cryptoRandomString({
//     length: 6,
// });

// function sendEmailWithCode({ email, code }) {
//     console.log("[social:email] sending email with code", email, code);
//     // here you'll put the SES stuff
// }

// function getCode(code){}

// function updatePassword(password, email){}

// function createPasswordResetCode(code, email) {}

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

module.exports.checkLogin = ({ email, password }) => {
    return getUserByEmail(email).then((result) => {
        const foundUser = result.rows[0];
        console.log("HERE", foundUser);
        if (!foundUser) {
            return null;
        }
        return bcrypt
            .compare(password, foundUser.password_hash)
            .then(function (match) {
                if (match) {
                    return foundUser;
                } else {
                    return null;
                }
            });
    });
};
function getUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1`;
    const params = [email];
    const foundUser = db.query(query, params);
    return foundUser;
}

module.exports.getUserById = (id) => {
    const query = `SELECT * FROM users WHERE id = $1`;
    const params = [id];
    const foundUser = db.query(query, params);
    return foundUser;
};

module.exports.uploadProfilePic = (url, id) => {
    const query = `
        UPDATE users 
        SET profile_picture_url=$1
        WHERE id=$2
        RETURNING *
    `;
    const params = [url, id];
    const newPic = db.query(query, params);

    return newPic;
};
