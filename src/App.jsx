import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import TopRated from "./TopRated";
import Cart from "./Cart"; // Assuming Cart component exists or will be created
import HomePage from "./HomePage"; // Optional: separate HomePage component for better structure

function App() {
  const cartCount = 5; // Example cart item count, this can be fetched from state or context

  return (
    <Router>
      {/* Render the Navbar across all pages */}
      <Navbar cartCount={cartCount} />
      <main className="bg-gray-900 text-white min-h-screen">
        {/* Define routes for different pages */}
        <Switch>
          <Route path="/" exact>
            {/* Use a separate HomePage component for scalability */}
            <HomePage />
          </Route>
          <Route path="/top-rated">
            <TopRated />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          {/* Add a fallback route for 404 Not Found */}
          <Route>
            <div className="text-center p-6">
              <h1 className="text-4xl font-bold">404</h1>
              <p className="text-gray-400">Page Not Found</p>
            </div>
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
