require("dotenv").config();
const financeRoutes = require('./routes/financeRoutes');
const express = require('express'); // import Express
const cors = require('cors');
const app = express();              // create Express app
const PORT = process.env.PORT || 3000; // server port

// Enable CORS
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api", require("./routes/budgetRoutes"));

// Connect routes
app.use('/api', financeRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});