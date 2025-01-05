import React, { useState, useEffect } from "react";
import axios from "axios";

const BuyerDashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/quotes");
      setQuotes(response.data.data);
    } catch (error) {
      console.error("Error fetching quotes:", error.message);
    }
  };

  const addToCart = async (quote_id) => {
    try {
      await axios.post("http://localhost:5000/api/cart", { quote_id });
      setCart((prev) => [...prev, quote_id]);
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  return (
    <div>
      <h1>Buyer Dashboard</h1>
      <div>
        {quotes.map((quote) => (
          <div key={quote.id}>
            <p>"{quote.quote}" - {quote.author}</p>
            <p>{quote.price === 0 ? "Free" : `${quote.price} credits`}</p>
            <button onClick={() => addToCart(quote.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerDashboard;
