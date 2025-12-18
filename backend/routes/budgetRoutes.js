const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const connectDB = require("../db");

router.get("/budget", auth, async (req, res) => {
    const db = await connectDB();
    const userId = req.user.userId;

    const row = await db.get(
        "SELECT amount FROM budgets WHERE user_id = ?",
        [userId]
    );

    console.log("📥 Fetched budget for user:", userId, row?.amount);

    res.json({ amount: row ? row.amount : null });
});


router.post("/budget", auth, async (req, res) => {
    const db = await connectDB();
    const userId = req.user.userId;
    const { amount } = req.body;

    console.log("💰 Saving budget for user:", userId, "Amount:", amount);

    await db.run(
        `INSERT INTO budgets (user_id, amount)
     VALUES (?, ?)
     ON CONFLICT(user_id) DO UPDATE SET amount = excluded.amount`,
        [userId, amount]
    );

    res.json({ success: true });
});

module.exports = router;
