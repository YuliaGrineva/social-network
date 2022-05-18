const spicedPg = require("spiced-pg");

function sendEmailWithCode({ email, code }) {
    console.log("[social:email] sending email with code", email, code);
    // here you'll put the SES stuff
}

function getCode(code) {
    const query = `
    SELECT * FROM passwordReset 
    WHERE code = $1
    `;
    const params = [code];
    return db.query(query, params);
}

function updatePasswordByUserEmail({ email, password }) {
    console.log("email", email);
    return hashPassword(password).then((password_hash) => {
        const query = `
        UPDATE users 
        SET password_hash = $2 
        WHERE email = $1
        RETURNING *
`;
        const params = [email, password_hash];
        return db.query(query, params);
    });
}

function createResetPasswordCode({ code, email }) {
    console.log("USE THIS CODE", code);
    const query = `
    INSERT INTO passwordReset (code, email)
    VALUES ($1, $2)
    RETURNING *`;
    const params = [code, email];
    return db.query(query, params).then((result) => result.rows[0]);
}

module.exports = {
    updatePasswordByUserEmail,
    getCode,
    createResetPasswordCode,
    sendEmailWithCode,
    getUserByEmail,
};

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
        console.log("HERE FOUNDUSER", foundUser, !foundUser);
        if (!foundUser) {
            console.log("HERE NULLLL");
            return null;
        }
        return bcrypt
            .compare(password, foundUser.password_hash)
            .then(function (match) {
                console.log("match !!!!!", match);
                console.log("foundUser !!!!!", foundUser);
                
                if (!match) {
                    return null;
                }
                console.log("foundUserrrRRRR", foundUser);
                return foundUser;
           
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

module.exports.updateUserBio = (bio, id) => {
    const query = `
        UPDATE users 
        SET bio=$1
        WHERE id=$2
        RETURNING *
    `;
    const params = [bio, id];
    return db.query(query, params);
};

module.exports.mostRecent = (id) => {
    const query = `
        SELECT firstname, lastname ,profile_picture_url, id FROM users
        WHERE id <> $1
        ORDER BY id DESC 
        LIMIT 3;
    `;
    const params = [id];
    return db.query(query, params);
};

module.exports.matchingUsers = (val) => {
    const query = `
        SELECT firstname, lastname ,profile_picture_url, id
        FROM users
        WHERE firstname ILIKE $1;
    `;
    const params = [val + "%"];
    return db.query(query, params);
};

module.exports.getFriendshipStatus = async (recipient_id, sender_id) => {
    console.log("HEREEE", recipient_id, sender_id);
    const query = `
       SELECT * FROM friendships
  WHERE (recipient_id = $1 AND sender_id = $2)
  OR (recipient_id = $2 AND sender_id = $1);
    `;
    const params = [recipient_id, sender_id];
    const status = await db.query(query, params);
    console.log("status", status);
    return status.rows[0];
};

module.exports.requestFriend = (recipient_id, sender_id) => {
    console.log("HEREEE", recipient_id, sender_id);
    const query = `
       INSERT INTO friendships
       (recipient_id, sender_id)
  VALUES($1, $2)
  RETURNING *
    `;
    const params = [recipient_id, sender_id];
    const req = db.query(query, params);
    console.log("RESULT DB", req);
    return req;
};

module.exports.updateFriend = async (recipient_id, sender_id) => {
    const query = `
       UPDATE friendships
       SET accepted = TRUE
       WHERE (recipient_id = $1 AND sender_id = $2)
                    OR
                    (recipient_id =$2 AND sender_id =$1)
    `;
    const params = [recipient_id, sender_id];
    const update = await db.query(query, params);

    return update.rows;
};

module.exports.deleteFriend = async (recipient_id, sender_id) => {
    const query = `
       DELETE FROM friendships
       WHERE (recipient_id = $1 AND sender_id = $2)
                    OR
                    (recipient_id =$2 AND sender_id =$1)
    `;
    const params = [recipient_id, sender_id];
    const deleted = await db.query(query, params);

    return deleted.rows;
};

module.exports.cancelRequest = async (recipient_id, sender_id) => {
    const query = `
       DELETE from friendships
       WHERE (recipient_id = $1 AND sender_id = $2)
                    OR
                    (recipient_id =$2 AND sender_id =$1)
                    RETURNING *
    `;
    const params = [recipient_id, sender_id];
    const cancel = await db.query(query, params);

    return cancel.rows;
};

module.exports.getFriendsAndWannabes = async (userId) => {
    const query = `
    SELECT users.id, firstname, lastname, profile_picture_url, accepted
  FROM friendships
JOIN users
ON (accepted = false AND recipient_id = $1 AND sender_id = users.id)
 OR (accepted = true AND recipient_id = $1 AND sender_id = users.id)
OR (accepted = true AND sender_id = $1 AND recipient_id = users.id)

    `;
    const params = [userId];
    const friends = await db.query(query, params);

    return friends;
};
