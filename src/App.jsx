// Importing necessary React hooks and components
import React, { useState, useEffect } from "react";

// Importing custom components for the application
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieList from "./components/MovieList";
import TopRatedMovies from "./components/TopRatedMovies"; // Added TopRatedMovies component
import CartItems from "./components/CartItems";
import HomePage from "./components/HomePage"; // Added HomePage component
import toast from "react-hot-toast"; // For displaying notification toasts
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Corrected import for routing

export default function App() {
  // State management for cart items
  // Initialize cart from localStorage if exists, otherwise start with an empty array
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Effect to synchronize cart state with localStorage
  // Runs every time cart state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add a movie to the cart
  const addToCart = async (movie) => {
    const movieInCart = cart.find((item) => item.id === movie.id);

    if (movieInCart) {
      toast.error("Item is already in the cart.");
    } else {
      try {
        setCart([...cart, movie]);
        toast.success("Item added to the cart.");
      } catch (error) {
        console.error("Error while fetching recommendations:", error);
        toast.error("Failed to fetch recommendations.");
      }
    }
  };

  // Function to remove a movie from the cart
  const removeFromCart = (movieId) => {
    const movieInCart = cart.find((movie) => movie.id === movieId);

    if (movieInCart) {
      setCart(cart.filter((movie) => movie.id !== movieId));
      toast.success("Item removed from the cart.");
    } else {
      toast.error("Item is not in the cart.");
    }
  };

  return (
    <BrowserRouter>
      <div className="bg-black text-white">
        {/* Navbar with cart item count */}
        <Navbar cartCount={cart.length} />

        {/* Define application routes */}
        <Routes>
          {/* Home route */}
          <Route
            path="/HomePage"
            element={<HomePage addToCart={addToCart} />}
          />

          {/* Top Rated Movies route */}
          <Route path="/top-rated" element={<TopRatedMovies />} />

          {/* Cart route */}
          <Route
            path="/cart"
            element={<CartItems cart={cart} removeFromCart={removeFromCart} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
