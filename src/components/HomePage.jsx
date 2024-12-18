import React from "react";
import Hero from "./Hero";
import MovieList from "./MovieList";

export default function HomePage({ addToCart }) {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Movie List Section */}
      <MovieList addToCart={addToCart} />
    </div>
  );
}
