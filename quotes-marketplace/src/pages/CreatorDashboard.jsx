import React, { useState, useEffect } from "react";
import axios from "axios";

const CreatorDashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState({
    quote: "",
    author: "",
    year: "",
    price: 0,
  });
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/quotes", {
        params: { created_by: user.user_id },
      });
      setQuotes(response.data.data);
    } catch (error) {
      console.error("Error fetching quotes:", error.message);
    }
  };

  const handleAddQuote = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/quotes", {
        ...newQuote,
        created_by: user.user_id,
      });
      fetchQuotes();
      setNewQuote({ quote: "", author: "", year: "", price: 0 });
    } catch (error) {
      console.error("Error adding quote:", error.message);
    }
  };

  return (
    <div>
      <h1>Creator Dashboard</h1>
      <form onSubmit={handleAddQuote}>
        <input
          type="text"
          placeholder="Quote"
          value={newQuote.quote}
          onChange={(e) => setNewQuote({ ...newQuote, quote: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={newQuote.author}
          onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Year"
          value={newQuote.year}
          onChange={(e) => setNewQuote({ ...newQuote, year: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price (0 for free)"
          value={newQuote.price}
          onChange={(e) => setNewQuote({ ...newQuote, price: e.target.value })}
          required
        />
        <button type="submit">Add Quote</button>
      </form>
      <h2>Your Quotes</h2>
      <ul>
        {quotes.map((quote) => (
          <li key={quote.id}>
            {quote.quote} - {quote.price === 0 ? "Free" : `${quote.price} credits`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreatorDashboard;
