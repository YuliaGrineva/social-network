const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const db = require("../database/db");

app.use(compression());

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.get("/user/id.json", (req, res) => {
    res.json({ userId: req.session.userId });
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

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
