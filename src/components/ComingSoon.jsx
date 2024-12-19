import React, { useState, useEffect } from "react";

export default function ComingSoon() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to fetch movies when the component mounts
  useEffect(() => {
    // Async function to fetch movies from IMDb API
    const fetchMovies = async () => {
      try {
        // API call to fetch coming soon movies
        const response = await fetch(
          "https://online-movie-database.p.rapidapi.com/title/v2/get-coming-soon?comingSoonType=MOVIE&first=20&country=US&language=en-US",
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": "11356e5d0bmsh653865409d5be73p1e9de0jsna08674456008",
              "x-rapidapi-host": "online-movie-database.p.rapidapi.com",
            },
          }
        );

        // Throw an error if the response is not OK
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        // Parse the JSON response
        const data = await response.json();
        console.log(data); // Log the full response to verify the structure

        // Assuming the response structure is something like `data.comingSoon.edges`
        if (data?.comingSoon?.edges) {
          const transformedMovies = data.comingSoon.edges.map((edge, index) => ({
            id: edge.node.id || `movie-${index}`,
            name: edge.node.titleText?.text || "Unknown Title",
            rating: edge.node.ratingsSummary?.aggregateRating || 0,
            image: edge.node.primaryImage?.url || "/images/Dark.png",
            genres: edge.node.titleGenres?.genres
              ? edge.node.titleGenres.genres.slice(0, 4).map((g) => g.genre.text)
              : [],
          }));

          // Update state with transformed movies
          setMovies(transformedMovies);
        } else {
          throw new Error("Invalid response structure");
        }

        // Set loading to false once movies are fetched
        setIsLoading(false);
      } catch (err) {
        // Handle any errors during fetching
        console.error("Error fetching data:", err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    // Call the fetch function
    fetchMovies();
  }, []); // Empty dependency array means this effect runs once on mount

  // Render loading state if movies are being fetched
  if (isLoading) {
    return (
      <div className="p-6 text-white min-h-screen mt-10 text-center">
        <h1 className="text-3xl font-bold">Loading Movies...</h1>
      </div>
    );
  }

  // Render error state if there was a problem fetching movies
  if (error) {
    return (
      <div className="p-6 text-white min-h-screen mt-10 text-center">
        <h1 className="text-3xl font-bold text-red-500">Error: {error}</h1>
      </div>
    );
  }

  // Render the list of movies
  return (
    <div className="p-6 text-white min-h-screen mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Coming Soon</h1>
      {/* Responsive grid layout for movie cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Map through movies and create a card for each */}
        {movies.map((movie) => (
          <div
            key={movie.id}
            // Hover effects for interactive card
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
                  {movie.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Add to Cart button */}
                <div className="mt-4 flex justify-between items-center">
                  <button
                    // Calls the addToCart function passed as a prop
                    onClick={() => addToCart(movie)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
