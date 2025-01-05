const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite
const dbPath = path.resolve(__dirname, './db/database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Enable foreign key support
db.run('PRAGMA foreign_keys = ON;', (err) => {
  if (err) {
    console.error('Failed to enable foreign keys:', err.message);
  } else {
    console.log('Foreign keys are enabled.');
  }
});

// Create tables
db.serialize(() => {
  // Users table
  db.run(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      role TEXT DEFAULT 'buyer',  -- 'buyer' or 'creator'
      credits INTEGER DEFAULT 20
    )
    `,
    (err) => {
      if (err) console.error('Error creating users table:', err.message);
    }
  );

  // Quotes table
  db.run(
    `
    CREATE TABLE IF NOT EXISTS quotes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quote TEXT,
      author TEXT,
      year INTEGER,
      price INTEGER DEFAULT 0,
      created_by INTEGER,
      FOREIGN KEY(created_by) REFERENCES users(id)
    )
    `,
    (err) => {
      if (err) console.error('Error creating quotes table:', err.message);
    }
  );

  // Purchases table
  db.run(
    `
    CREATE TABLE IF NOT EXISTS purchases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      quote_id INTEGER,
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(quote_id) REFERENCES quotes(id)
    )
    `,
    (err) => {
      if (err) console.error('Error creating purchases table:', err.message);
    }
  );

  // Seed the users table with a default user
  db.run(
    `
    INSERT INTO users (username, role, credits) 
    SELECT 'test_user', 'creator', 100 
    WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = 'test_user')
    `,
    (err) => {
      if (err) {
        console.error('Error seeding users table:', err.message);
      }
    }
  );
});

// Debug: Log all queries
db.on('trace', (sql) => {
  console.log('Executing SQL:', sql);
});

module.exports = db;
