import React from "react";

// CartItems Component: Displays the user's selected movies in a cart
export default function CartItems({ cart, removeFromCart }) {
  return (
    // Container for cart items with full-screen height and padding
    <div className="p-6 text-white min-h-screen mt-10">
      {/* Page title for the cart */}
      <h1 className="text-3xl font-bold text-center mb-6">Cart</h1>
      
      {/* Conditional rendering based on cart contents */}
      {cart.length > 0 ? (
        // Responsive grid layout for cart items when cart is not empty
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Map through cart items and create a card for each */}
          {cart.map((movie) => (
            <div
              // Use movie ID as the unique key
              key={movie.id}
              // Hover effect for interactive card
              className="relative group rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:z-10"
            >
              {/* Movie card container with styling */}
              <div className="relative bg-black text-white rounded-lg shadow-lg border-2 border-yellow-500 hover:border-yellow-400">
                {/* Movie poster image */}
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-56 object-contain rounded-t-lg"
                />
                
                {/* Movie details section */}
                <div className="p-4">
                  {/* Movie title */}
                  <h2 className="text-lg font-semibold">{movie.name}</h2>
                  
                  {/* Movie rating */}
                  <p className="text-gray-400">Rating: {movie.rating}/10</p>
                  
                  {/* Genres display */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {/* Create genre tags for each movie genre */}
                    {movie.genres.map((genre, index) => (
                      <span
                        key={index}
                        // Styling for genre tags
                        className="px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  
                  {/* Remove from Cart section */}
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      // Call removeFromCart function with the movie's ID when clicked
                      onClick={() => removeFromCart(movie.id)}
                      // Styling for remove button with hover effect
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
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
        // Display message when cart is empty
        <p className="text-center text-gray-400">Your cart is empty!</p>
      )}
    </div>
  );
}
