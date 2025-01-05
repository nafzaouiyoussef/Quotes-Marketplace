const express = require('express');
const db = require('../database');
const router = express.Router();

// Add a new quote (Creators only)
router.post('/quotes', (req, res) => {
  const { quote, author, year, price, created_by } = req.body;

  // Input validation
  if (!quote || !author || !year || price === undefined || !created_by) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  

  // Validate `created_by` foreign key
  db.get('SELECT id FROM users WHERE id = ?', [created_by], (err, row) => {
    if (err) {
      console.error('Database Error:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!row) {
      console.error(`User ID ${created_by} not found in the users table.`);
      return res.status(400).json({ error: `User ID ${created_by} does not exist.` });
    }

    // Insert the quote after validation
    db.run(
      `INSERT INTO quotes (quote, author, year, price, created_by) VALUES (?, ?, ?, ?, ?)`,
      [quote, author, year, price, created_by],
      function (err) {
        if (err) {
          console.error('Database Error:', err.message);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json({ message: 'Quote added!', quote_id: this.lastID });
      }
    );
  });
});

// Get quotes (with optional filters)
router.get('/quotes', (req, res) => {
  const { page = 1, limit = 5, filter = 'all', keyword = '' } = req.query;
  const offset = (page - 1) * limit;

  let query = `SELECT * FROM quotes WHERE 1=1`;
  if (filter === 'free') query += ` AND price = 0`;
  if (filter === 'paid') query += ` AND price > 0`;
  if (keyword) query += ` AND quote LIKE ?`;

  query += ` LIMIT ? OFFSET ?`;

  // Fetch filtered quotes
  db.all(query, [`%${keyword}%`, limit, offset], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    // Count total rows with the same filters
    let countQuery = `SELECT COUNT(*) AS total FROM quotes WHERE 1=1`;
    if (filter === 'free') countQuery += ` AND price = 0`;
    if (filter === 'paid') countQuery += ` AND price > 0`;
    if (keyword) countQuery += ` AND quote LIKE ?`;

    db.get(countQuery, [`%${keyword}%`], (err, countResult) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        data: rows,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: countResult.total,
        },
      });
    });
  });
});

module.exports = router;
