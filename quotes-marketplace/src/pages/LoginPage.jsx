import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("buyer");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Register the user (mock login)
      const response = await axios.post("http://localhost:5000/auth/register", {
        username,
        role,
      });

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      // Navigate to the correct dashboard
      if (role === "buyer") {
        navigate("/buyer-dashboard");
      } else if (role === "creator") {
        navigate("/creator-dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed! Please check the console for details.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="buyer">Buyer</option>
          <option value="creator">Creator</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
