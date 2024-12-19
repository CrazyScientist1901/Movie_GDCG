// Importing necessary React hooks and components
import React, { useState, useEffect } from "react";

// Importing custom components for the application
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieList from "./components/MovieList";
import TopRatedMovies from "./components/ComingSoon";
import CartItems from "./components/CartItems";
import HomePage from "./components/HomePage"; // Added HomePage component
import toast from "react-hot-toast"; // For displaying notification toasts
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  // State for managing cart items
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Sync cart state with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add a movie to the cart
  const addToCart = (movie) => {
    const isMovieInCart = cart.some((item) => item.id === movie.id);

    if (isMovieInCart) {
      toast.error("Item is already in the cart.");
    } else {
      setCart((prevCart) => [...prevCart, movie]);
      toast.success("Item added to the cart.");
    }
  };

  // Function to remove a movie from the cart
  const removeFromCart = (movieId) => {
    const isMovieInCart = cart.some((movie) => movie.id === movieId);

    if (isMovieInCart) {
      setCart((prevCart) => prevCart.filter((movie) => movie.id !== movieId));
      toast.success("Item removed from the cart.");
    } else {
      toast.error("Item is not in the cart.");
    }
  };

  return (
    <BrowserRouter>
      <div className="bg-black text-white">
        <Navbar cartCount={cart.length} />
        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<HomePage addToCart={addToCart} />} />

          {/* Route for MovieList */}
          <Route path="/movielist" element={<MovieList addToCart={addToCart} />} />

          {/* Route for Top Rated Movies */}
          <Route path="/ComingSoon" element={<TopRatedMovies />} />

          {/* Route for Cart */}
          <Route
            path="/cart"
            element={<CartItems cart={cart} removeFromCart={removeFromCart} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
