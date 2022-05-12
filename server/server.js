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
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
        res.status(400).json({ error: "OOOPSI 1" });
        return;
    }
    db.checkLogin(req.body)
        .then((user) => {
            if (!user) {
                res.status(400).json({ error: "OOOPSI 2" });
                return;
            }
            req.session.userId = user.id;
            res.json({ success: true });
        })
        .catch((error) => {
            console.log(error);
            res.json({
                success: false,
            });
        });
});

// app.post("/api/password", (req, res) => {
//     // remember to check if the email is present in the request.body!

//     const code = db.cryptoRandomString({ length: 6 });

//     db.createPasswordResetCode({ email, code }).then(() => {
//         db.sendEmailWithCode({ email, code });
//         res.json({ message: "ok" });
//     });
// });

// app.put("/api/password", (req, res) => {});

app.post("/logout", function (req, res) {
    // res.render("login");
    console.log("LOGGING OUT USER");
    req.session = null;
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
