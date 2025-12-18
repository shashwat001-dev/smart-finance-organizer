const connectDB = require("./db");

async function createTable() {
    const db = await connectDB();

    console.log("⏳ Creating budgets table...");

    await db.exec(`
    CREATE TABLE IF NOT EXISTS budgets (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       user_id INTEGER UNIQUE NOT NULL,
       amount REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       email TEXT UNIQUE NOT NULL,
       password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS transactions (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       title TEXT NOT NULL,
       amount REAL NOT NULL,
       category TEXT NOT NULL,
       date TEXT NOT NULL,
       user_id INTEGER NOT NULL
    );

  `);

    console.log("✅ Transactions table created successfully!");
    console.log("✅ Users table created");
    console.log("✅ Budgets table created successfully");
}

createTable();
