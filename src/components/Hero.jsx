import React from "react";
import { ArrowRightCircle, Star } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('/images/hero.jpg')" }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-75"></div>

      {/* Hero content */}
      <div className="relative z-10 text-center text-white px-4">
        {/* Hero heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Welcome to <span className="text-yellow-400">GdgMovie</span>
        </h1>

        {/* Subheading */}
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
          Dive into the world of your favorite movies. Explore, rate, and enjoy a personalized cinematic experience tailored just for you.
        </p>

        {/* Call-to-action buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#explore"
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <ArrowRightCircle className="h-5 w-5 mr-2" />
            Explore Now
          </a>
          <a
            href="#top-rated"
            className="flex items-center bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <Star className="h-5 w-5 mr-2" />
            Top Rated
          </a>
        </div>
      </div>
    </section>
  );
}
