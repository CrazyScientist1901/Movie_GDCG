import { Search, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar({ cartCount }) {
  return (
    <nav className="bg-black text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Brand Logo and Links */}
        <div className="flex items-center gap-6">
          {/* Brand Logo */}
          <NavLink
            to="/"
            className="text-xl font-bold hover:text-gray-300 transition-colors"
          >
            GdgMovie
          </NavLink>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/movielist"
              className={({ isActive }) =>
                `hover:text-gray-300 transition-colors ${
                  isActive ? "text-blue-500 font-semibold" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/ComingSoon"
              className={({ isActive }) =>
                `hover:text-gray-300 transition-colors ${
                  isActive ? "text-blue-500 font-semibold" : ""
                }`
              }
            >
              Coming Soon
            </NavLink>
          </div>
        </div>

        {/* Search and Cart */}
        <div className="flex items-center space-x-4">
        
          {/* Cart Icon */}
          <NavLink to="/cart" aria-label="View cart">
            <button className="relative hover:text-gray-300 p-2">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2">
                  {cartCount}
                </span>
              )}
            </button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
