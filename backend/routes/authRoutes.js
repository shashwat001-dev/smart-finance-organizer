const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
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

// FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    const db = await connectDB();

    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

    if (!user) {
        return res.json({ message: "If user exists, reset link generated" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 15 * 60 * 1000; // 15 mins

    await db.run(
        "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
        [resetToken, expiry, email]
    );

    // For now: just log reset link
    console.log(
           `🔑 Password reset link: http://127.0.0.1:5500/reset-password.html?token=${resetToken}`  
    );

    res.json({ message: "Reset link generated" });
});

// RESET PASSWORD
router.post("/reset-password", async (req, res) => {
    const { token, newPassword } = req.body;
    const db = await connectDB();

    const user = await db.get(
        "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?",
        [token, Date.now()]
    );

    if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.run(
        `UPDATE users
         SET password = ?, reset_token = NULL, reset_token_expiry = NULL
         WHERE id = ?`,
        [hashedPassword, user.id]
    );

    res.json({ message: "Password reset successful" });
});

module.exports = router;



