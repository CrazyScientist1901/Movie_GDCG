import React, { useState, useEffect } from "react";

export default function TopRated() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch(
          'https://imdb8.p.rapidapi.com/title/v2/get-top-rated-movies',
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': '11356e5d0bmsh653865409d5be73p1e9de0jsna08674456008',
              'x-rapidapi-host': 'imdb8.p.rapidapi.com'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch top-rated movies');
        }

        const data = await response.json();

        const transformedMovies = data.data.movies.edges.map((edge, index) => ({
          id: edge.node.id || `movie-${index}`,
          name: edge.node.titleText?.text || 'Unknown Title',
          rating: edge.node.ratingsSummary?.aggregateRating || 0,
          image: edge.node.primaryImage?.url || '/images/placeholder.png',
        }));

        setMovies(transformedMovies);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, []);

  if (isLoading) {
    return <div>Loading Top Rated Movies...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Top Rated Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <img
              src={movie.image}
              alt={movie.name}
              className="w-full h-56 object-contain mb-4"
            />
            <h2 className="text-lg font-bold">{movie.name}</h2>
            <p className="text-gray-400">Rating: {movie.rating}/10</p>
          </div>
        ))}
      </div>
    </div>
  );
}