import React from "react";
import { Link } from "react-router-dom"; // Use Link for routing

export default function CartItems({ cart, removeFromCart }) {
  // Debugging: Log the cart prop
  console.log("Cart Items:", cart);

  return (
    <div className="p-6 text-white min-h-screen mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cart.map((movie) => (
            <div
              key={movie.id}
              className="relative group rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:z-10"
            >
              <div className="relative bg-black text-white rounded-lg shadow-lg border-2 border-yellow-500 hover:border-yellow-400">
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-56 object-contain rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{movie.name}</h2>
                  <p className="text-gray-400">Rating: {movie.rating}/10</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {movie.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => removeFromCart(movie.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <p className="text-lg text-gray-400 mb-4">Your cart is currently empty!</p>
          <Link
            to="/MovieList" // Ensure this path is correct
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Browse Movies
          </Link>
        </div>
      )}
    </div>
  );
}
