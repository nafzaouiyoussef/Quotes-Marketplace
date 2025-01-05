import React, { useState, useEffect } from "react";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cart");
      setCart(response.data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error.message);
    }
  };

  const finalizePurchase = async () => {
    try {
      await axios.post("http://localhost:5000/api/purchase", { user_id: user.id });
      alert("Purchase successful!");
      fetchCart();
    } catch (error) {
      console.error("Error finalizing purchase:", error.message);
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.quote} - {item.price} credits
          </li>
        ))}
      </ul>
      <button onClick={finalizePurchase}>Purchase</button>
    </div>
  );
};

export default CartPage;
