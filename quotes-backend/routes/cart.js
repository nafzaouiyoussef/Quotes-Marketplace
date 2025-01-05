const express = require('express');
const db = require('../database');
const router = express.Router();

const cart = []; // Temporary cart (use DB for persistence)

// Add quote to cart
router.post('/cart', (req, res) => {
  const { quote_id } = req.body;
  cart.push(quote_id);
  res.json({ message: 'Quote added to cart.', cart });
});

// View cart
router.get('/cart', (req, res) => {
  db.all(`SELECT * FROM quotes WHERE id IN (${cart.join(',')})`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ cart: rows });
  });
});

// Purchase quotes in cart
router.post('/purchase', (req, res) => {
  const { user_id } = req.body;

  db.get(`SELECT credits FROM users WHERE id = ?`, [user_id], (err, user) => {
    if (err || !user) return res.status(404).json({ error: 'User not found.' });

    let totalCost = 0;
    db.all(`SELECT * FROM quotes WHERE id IN (${cart.join(',')})`, [], (err, quotes) => {
      if (err) return res.status(500).json({ error: err.message });

      totalCost = quotes.reduce((sum, quote) => sum + quote.price, 0);

      if (user.credits < totalCost) {
        return res.status(400).json({ error: 'Not enough credits.' });
      }

      db.run(`UPDATE users SET credits = credits - ? WHERE id = ?`, [totalCost, user_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        quotes.forEach((quote) => {
          db.run(`INSERT INTO purchases (user_id, quote_id) VALUES (?, ?)`, [user_id, quote.id]);
        });

        cart.length = 0;
        res.json({ message: 'Purchase successful.', remaining_credits: user.credits - totalCost });
      });
    });
  });
});

module.exports = router;
