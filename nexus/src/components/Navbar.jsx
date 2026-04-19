import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { CATEGORIES } from "../data/products";
import "./Navbar.css";

export default function Navbar({ navigate, currentPage }) {
  const { count } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("search", { query: searchQuery.trim() });
      setSearchQuery("");
    }
  };

  return (
    <header className="navbar">
      {/* Top strip */}
      <div className="navbar-top">
        <div className="container navbar-top-inner">
          <span>🚀 Free shipping on orders above ₹999</span>
          <span>📦 Easy 30-day returns &nbsp;|&nbsp; 🔒 Secure payments</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="navbar-main">
        <div className="container navbar-main-inner">
          {/* Logo */}
          <button className="navbar-logo" onClick={() => navigate("home")}>
            <span className="logo-n">N</span>EXUS
          </button>

          {/* Search */}
          <form className="navbar-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </form>

          {/* Actions */}
          <div className="navbar-actions">
            <button className="nav-icon-btn" onClick={() => navigate("wishlist")}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishlistItems.length > 0 && <span className="badge-count">{wishlistItems.length}</span>}
              <span className="nav-label">Wishlist</span>
            </button>

            <button className="nav-icon-btn cart-btn" onClick={() => navigate("cart")}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {count > 0 && <span className="badge-count">{count}</span>}
              <span className="nav-label">Bag</span>
            </button>

            <button className="nav-icon-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span className="nav-label">Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <nav className="navbar-cats">
        <div className="container navbar-cats-inner">
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <div
              key={key}
              className={`cat-item ${activeDropdown === key ? "active" : ""}`}
              onMouseEnter={() => setActiveDropdown(key)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="cat-btn" onClick={() => navigate("category", { gender: key })}>
                {cat.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>

              {activeDropdown === key && (
                <div className="dropdown">
                  <div className="dropdown-header">Shop {cat.label}</div>
                  <div className="dropdown-grid">
                    {cat.subcategories.map(sub => (
                      <button
                        key={sub}
                        className="dropdown-item"
                        onClick={() => { navigate("category", { gender: key, sub }); setActiveDropdown(null); }}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                  <button
                    className="dropdown-all"
                    onClick={() => { navigate("category", { gender: key }); setActiveDropdown(null); }}
                  >
                    View All {cat.label} →
                  </button>
                </div>
              )}
            </div>
          ))}

          <button className="cat-btn sale-btn" onClick={() => navigate("category", { sale: true })}>
            🔥 Sale
          </button>
        </div>
      </nav>
    </header>
  );
}