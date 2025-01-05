# Quotes Marketplace 📝

A modern and visually stunning **Quotes Marketplace** web application for discovering, purchasing, and adding inspiring quotes. Built using **React**, **Material-UI**, **Node.js**, and **SQLite3**.

---

## 🌟 Features

- **Search & Filter**: Easily search for quotes by keywords, authors, or price.
- **User-Friendly UI**: Intuitive and modern interface 
- **Add Your Quotes**: Users can contribute their favorite quotes to the marketplace.
- **Pagination**: Seamlessly browse through pages of quotes with next/previous controls.
- **Credits System**: Users can purchase or earn credits to unlock premium quotes.

---

## 🛠️ Tech Stack

- **Frontend**: React (with Hooks), Material-UI (MUI), Axios
- **Backend**: Node.js (Express.js), SQLite3
- **Build Tool**: Vite for fast development and bundling

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- SQLite3 installed locally

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/nafzaouiyoussef/Quotes-Marketplace.git

#### 2. Install Dependencies
**Front-End:**
```bash
cd quotes-marketplace
npm install
```

**Back-End:**
```bash
cd ../quotes-backend
npm install
```

#### 3. Configure the Database
- Ensure SQLite3 is installed.
- In the `quotes-backend` directory, run:
```bash
node scripts/setupDatabase.js
```
This will create the required tables and seed the database with sample data.

#### 4. Start the Application
**Back-End:**
```bash
cd quotes-backend
npm start
```
This starts the API server on `http://localhost:5000`.

**Front-End:**
```bash
cd quotes-marketplace
npm run dev
```
Visit `http://localhost:5173` in your browser to see the app.

---

## API Endpoints

### Quotes
- **`GET /quotes`**: Fetch paginated quotes with filters.
- **`POST /quotes`**: Add a new quote.
- **`GET /quotes/search`**: Search quotes by keyword.

### Purchases
- **`POST /purchase`**: Simulate a quote purchase.
- **`POST /recharge`**: Recharge user credits.

### Users
- **`GET /user/:id`**: Fetch user details and purchase history.

