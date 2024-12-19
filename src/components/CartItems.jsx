import React from "react";

// CartItems Component: Displays the user's selected movies in a cart
export default function CartItems({ cart = [], removeFromCart }) {
  return (
    <div className="p-6 text-white min-h-screen mt-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

      {/* Check if cart has items */}
      {cart && cart.length > 0 ? (
        // Grid for cart items if the cart is not empty
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cart.map((movie) => (
            <div
              key={movie.id}
              className="relative group rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:z-10"
            >
              {/* Movie Card */}
              <div className="relative bg-black text-white rounded-lg shadow-lg border-2 border-yellow-500 hover:border-yellow-400">
                {/* Movie Poster */}
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-56 object-cover rounded-t-lg"
                />

                {/* Movie Details */}
                <div className="p-4">
                  {/* Title */}
                  <h2 className="text-lg font-semibold">{movie.name}</h2>
                  {/* Rating */}
                  <p className="text-gray-400">Rating: {movie.rating}/10</p>
                  {/* Genres */}
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

                  {/* Remove Button */}
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
        // Message for empty cart
        <div className="flex flex-col items-center mt-10">
          <p className="text-lg text-gray-400 mb-4">Your cart is empty!</p>
          <button
            onClick={() => window.location.href = "/"} // Update the path to your home or movie list route
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Browse Movies
          </button>
        </div>
      )}
    </div>
  );
}
