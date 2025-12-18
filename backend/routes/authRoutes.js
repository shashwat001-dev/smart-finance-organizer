const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDB = require("../db");

const router = express.Router();
const SECRET = "jwt_secret_key"; // later move to .env

// REGISTER
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const db = await connectDB();

    const hashed = await bcrypt.hash(password, 10);

    try {
        await db.run(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            [email, hashed]
        );
        res.json({ success: true });
    } catch {
        res.status(400).json({ error: "User already exists" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const db = await connectDB();

    const user = await db.get(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
        { userId: user.id },
        SECRET,
        { expiresIn: "1d" }
    );

    res.json({ token });
});

module.exports = router;



