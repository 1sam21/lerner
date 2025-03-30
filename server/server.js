const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Fetch all records from Monthly_Expence table
app.get("/expenses", (req, res) => {
  db.query("SELECT * FROM Monthly_Expence", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a new expense
app.post("/expenses", (req, res) => {
  const { sender, receiver, amount, reason, which_bank, to_which_bank, date } = req.body;
  const sql = `INSERT INTO Monthly_Expence (sender, receiver, amount, reason, which_bank, to_which_bank, date) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [sender, receiver, amount, reason, which_bank, to_which_bank, date], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Expense added successfully", id: result.insertId });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
