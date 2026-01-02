const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

// Open SQLite database and auto-create tables if they don't exist
async function connectDB() {
    const db = await open({
        filename: "./transactions.db",
        driver: sqlite3.Database
    });

    // Ensure required tables exist (runs on every startup safely)
    await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      reset_token TEXT,
      reset_token_expiry INTEGER
    );

    CREATE TABLE IF NOT EXISTS budgets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER UNIQUE NOT NULL,
      amount REAL NOT NULL
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

    return db;
}

module.exports = connectDB;

