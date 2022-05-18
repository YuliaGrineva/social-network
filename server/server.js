const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const db = require("../database/db");
const cryptoRandomString = require("crypto-random-string");
const s3 = require("./s3");
const multer = require("multer");
const uidSafe = require("uid-safe");

app.use(compression());

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "uploads"));
    },
    filename: (req, file, callback) => {
        uidSafe(24).then((randomId) => {
            callback(null, `${randomId}${path.extname(file.originalname)}`);
        });
    },
});
const uploader = multer({
    storage: storage,
});

app.get("/user/id.json", (req, res) => {
    res.json({ userId: req.session.userId });
});

app.get("/api/users/me", (req, res) => {
    const { userId } = req.session;

    db.getUserById(userId).then((results) => {
        res.json(results);
    });
});

app.get("/api/findusers/:search", (req, res) => {
    console.log("req params", req.params);
    const { search } = req.params;
    console.log("val", search);
    db.matchingUsers(search)
        .then((results) => {
            console.log("results of matchingUsers!!!!!: ", results);

            res.json(results.rows);
        })
        .catch((e) => console.log("error uploading!!!: ", e));
});

app.get("/api/recentUsers", (req, res) => {
    console.log("no searcH");
    const sessionId = req.session.userId;
    db.mostRecent(sessionId)
        .then((results) => {
            console.log("results of mostRedent: ", results);

            res.json(results.rows);
        })
        .catch((e) => console.log("error uploading: ", e));
});

app.get("/api/users/:otherUserId", (req, res) => {
    console.log("no searH");
    const otherUserId = req.params.otherUserId;
    db.getUserById(otherUserId)
        .then((results) => {
            console.log("results of: ", results);

            res.json(results.rows[0]);
        })
        .catch((e) => console.log("error uploading: ", e));
});

app.get("/friendship-status/:otherUserId", (req, res) => {
    const { userId } = req.session;
    const otherUserId = req.params.otherUserId;

    db.getFriendshipStatus(userId, otherUserId)

        .then((results) => {
            console.log("results of checkFriendshipStatus: ", results);

            res.json(results || null);
        })
        .catch((e) =>
            console.log("error uploading checkFriendshipStatus: ", e)
        );
});

app.post("/friendships", (req, res) => {
    const sender_id = req.session.userId;
    const recipient_id = req.body.otherUserId;
    const btnText = req.body.btnText;
    console.log(
        "sender_id, recipient_id, btnText ",
        sender_id,
        recipient_id,
        btnText
    );

    if (btnText === "Make Request") {
        db.requestFriend(recipient_id, sender_id)
            .then((rows) => {
                console.log("results of request friend: ", rows);

                res.json(rows[0]);
            })
            .catch((e) => console.log("error request friend: ", e));
    }

    if (btnText === "Accept Request") {
        db.updateFriend(recipient_id, sender_id)
            .then((rows) => {
                console.log("results of accept friend: ", rows);

                res.json(rows);
            })
            .catch((e) => console.log("error accept friend: ", e));
    }

    if (btnText === "Cancel Request") {
        db.cancelRequest(recipient_id, sender_id)
            .then((rows) => {
                console.log("results of cancelRequest: ", rows);

                res.json(rows[0]);
            })
            .catch((e) => console.log("error cancelRequest ", e));
    }

    if (btnText === "Unfriend") {
        db.deleteFriend(recipient_id, sender_id)
            .then((rows) => {
                console.log("results of deleteFriend friend: ", rows);

                res.json(rows);
            })
            .catch((e) => console.log("error deleteFriend: ", e));
    }
});

app.post(
    "/user/profile/picture",
    uploader.single("image"),
    s3.upload,
    (req, res) => {
        const { userId } = req.session;
        let url = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;
        console.log("IDDDDD: ", userId);
        if (req.file) {
            db.uploadProfilePic(url, userId)
                .then((results) => {
                    console.log("results of upload: ", results);

                    res.json(results.rows[0]);
                })
                .catch((e) => console.log("error uploading: ", e));
        } else {
            res.json({
                succes: false,
            });
        }
    }
);

app.get("/logout", (req, res) => {
    // console.log("HERREEE", req.session.users.id);
    req.session.userId = null;
    res.json({ success: true });
    return;
});

app.post("/api/users/bio", (req, res) => {
    const { bio } = req.body;
    const { userId } = req.session;
    // if (req.bio) {
    //     console.log("REQUESTED bio: ", bio);
    db.updateUserBio(bio, userId).then((results) => {
        // console.log("results of upload bio: ", results);

        res.json(results.rows[0]);
    });
    //         .catch((e) => console.log("error uploading bio: ", e));
    // } else {
    //     res.json({
    //         succes: false,
    //     });
    // }
});

app.post("/register", (req, res) => {
    console.log("POST request made to /register route");
    const { firstname, lastname, email, password } = req.body;
    console.log(firstname, lastname, email, password);

    // if (!firstname || !lastname || !email || !password) {
    //     res.render("signup", { err: true });
    //     return;
    // }
    db.addUser(req.body)
        .then((newUser) => {
            req.session.userId = newUser.rows[0].id;
            console.log("HEREEEE", newUser.rows[0].id);
            res.json({ success: true });
        })
        .catch((error) => {
            console.log(error);
            res.json({
                success: false,
            });
        });
});

app.post("/login", (req, res) => {
    console.log("POST request made to /login route");
    console.log("BODYY", req.body);

    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
        res.status(400).json({ error: "OOOPSI 1" });
        return;
    }
    db.checkLogin(req.body)
        .then((foundUser) => {
            console.log("USERRR", foundUser);
            if (!foundUser.id) {
                res.status(400).json({ error: "OOOPSI 222" });
                return;
            }
            // console.log("USERID", founduser.id);
            req.session.userId = foundUser.id;

            res.json({ success: true });
            console.log("res.json", res.json());
        })
        .catch((error) => {
            console.log(error);
            res.json({
                success: false,
            });
        });
});

app.post("/api/password", (req, res) => {
    const code = cryptoRandomString({ length: 6 });
    const { email } = req.body;

    if (!email) {
        res.status(400).json({
            message: "email missing",
        });
        return;
    }

    db.getUserByEmail(email).then((user) => {
        console.log("do you see me?", user);
        if (!user) {
            res.status(400).json({
                message: "no user found",
            });
            return;
        }
        db.createResetPasswordCode({ email, code }).then(() => {
            db.sendEmailWithCode({ code, email });
            res.json({ message: "CODE SENT" });
        });
    });
});

app.put("/api/password", (req, res) => {
    console.log("req.body in reset", req.body);
    const { code, password } = req.body;
    db.getCode(code).then((data) => {
        console.log("DATAAA", data);
        if (!data) {
            res.status(400).json({
                message: "WRONG CODE",
            });
            return;
        }

        db.updatePasswordByUserEmail({
            email: data.rows[0].email,
            password,
        }).then(() => {
            res.json({
                message: "OK",
            });
        });
    });
});

app.post("/logout", function (req, res) {
    // res.render("login");
    console.log("LOGGING OUT USER");
    req.session = null;
    res.json({ success: true });
});

app.get("/friendsAndWannabes", function (req, res) {
    console.log("RESUULTSS YULIAAAA");
    let { userId } = req.session;

    db.getFriendsAndWannabes(userId).then((results) => {
        console.log("RESUULTSS YULIAAAA", results.rows);
        res.json(results.rows);
    });
});

app.post("/friendship/accept", function (req, res) {});

app.post("/friendship/unfriend", function (req, res) {});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
