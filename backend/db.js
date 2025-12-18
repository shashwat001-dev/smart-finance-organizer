const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

// Open SQLite database with async/await support
async function connectDB() {
    return open({
        filename: "./transactions.db",
        driver: sqlite3.Database
    });
}

module.exports = connectDB;
