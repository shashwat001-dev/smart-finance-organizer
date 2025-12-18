const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const connectDB = require("../db");

// ===============================
// GET ALL TRANSACTIONS
// ===============================
router.get("/transactions", auth, async (req, res) => {
    try {
        const db = await connectDB();
        const rows = await db.all(
            "SELECT * FROM transactions WHERE user_id = ? ORDER BY id DESC",
            [req.user.userId]
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ===============================
// ADD NEW TRANSACTION
// ===============================
router.post("/transactions", auth, async (req, res) => {
    const userId = req.user.userId;
    const { title, amount, category, date } = req.body;

    try {
        const db = await connectDB();

        const result = await db.run(
            "INSERT INTO transactions (title, amount, category, date, user_id) VALUES (?, ?, ?, ?, ?)",
            [title, amount, category, date, userId]
        );

        res.json({
            success: true,
            id: result.lastID,
            title,
            amount,
            category,
            date
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ===============================
// DELETE TRANSACTION
// ===============================
router.delete("/transactions/:id", auth, async (req, res) => {
    const { id } = req.params;

    try {
        const db = await connectDB();

        await db.run("DELETE FROM transactions WHERE id = ? AND user_id = ?", [id, req.user.userId]);

        res.json({ success: true, message: "Transaction deleted!" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
