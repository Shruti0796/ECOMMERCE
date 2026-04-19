import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../data/products";
import "./CategoryPage.css";

export default function CategoryPage({ navigate, params }) {
  const { gender, sub, sale } = params;
  const [activeSub, setActiveSub] = useState(sub || "");
  const [sort, setSort] = useState("popular");
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(true);

  const catConfig = gender ? CATEGORIES[gender] : null;
  const subs = catConfig ? catConfig.subcategories : [];

  const allBrands = useMemo(() => {
    const base = gender ? PRODUCTS.filter(p => p.gender === gender) : PRODUCTS;
    return [...new Set(base.map(p => p.brand))].sort();
  }, [gender]);

  const filtered = useMemo(() => {
    let list = PRODUCTS;
    if (gender) list = list.filter(p => p.gender === gender);
    if (activeSub) list = list.filter(p => p.subcategory === activeSub);
    if (sale) list = list.filter(p => p.discount >= 30);
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedBrands.length) list = list.filter(p => selectedBrands.includes(p.brand));
    if (minRating) list = list.filter(p => p.rating >= minRating);

    switch (sort) {
      case "price-low":    return [...list].sort((a,b) => a.price - b.price);
      case "price-high":   return [...list].sort((a,b) => b.price - a.price);
      case "rating":       return [...list].sort((a,b) => b.rating - a.rating);
      case "discount":     return [...list].sort((a,b) => b.discount - a.discount);
      case "newest":       return [...list].reverse();
      default:             return [...list].sort((a,b) => b.reviews - a.reviews);
    }
  }, [gender, activeSub, sale, sort, priceRange, selectedBrands, minRating]);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const pageTitle = sale ? "Sale" : catConfig ? catConfig.label : "All Products";

  return (
    <div className="category-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <button onClick={() => navigate("home")}>Home</button>
          <span>/</span>
          {gender && <><button onClick={() => navigate("category", { gender })}>{catConfig?.label}</button><span>/</span></>}
          <span className="breadcrumb-current">{activeSub || pageTitle}</span>
        </div>

        {/* Sub-category tabs */}
        {subs.length > 0 && (
          <div className="subcategory-tabs">
            <button className={`sub-tab ${!activeSub ? "active" : ""}`} onClick={() => setActiveSub("")}>
              All {catConfig.label}
            </button>
            {subs.map(s => (
              <button key={s} className={`sub-tab ${activeSub === s ? "active" : ""}`} onClick={() => setActiveSub(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="category-layout">
          {/* SIDEBAR FILTERS */}
          {showFilters && (
            <aside className="filter-sidebar">
              <div className="filter-header">
                <h3>Filters</h3>
                <button className="clear-btn" onClick={() => { setSelectedBrands([]); setPriceRange([0,20000]); setMinRating(0); }}>
                  Clear All
                </button>
              </div>

              {/* Price */}
              <div className="filter-section">
                <h4>Price Range</h4>
                <div className="price-range">
                  <input type="range" min="0" max="20000" step="500" value={priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], +e.target.value])} />
                  <div className="price-labels">
                    <span>₹0</span><span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="filter-section">
                <h4>Minimum Rating</h4>
                {[4, 3.5, 3].map(r => (
                  <label key={r} className="filter-check">
                    <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} />
                    <span>{"★".repeat(Math.floor(r))} {r}+</span>
                  </label>
                ))}
                {minRating > 0 && (
                  <button className="text-btn" onClick={() => setMinRating(0)}>Clear</button>
                )}
              </div>

              {/* Brands */}
              <div className="filter-section">
                <h4>Brand</h4>
                <div className="brand-list">
                  {allBrands.slice(0, 12).map(brand => (
                    <label key={brand} className="filter-check">
                      <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Discount */}
              <div className="filter-section">
                <h4>Discount</h4>
                {[50, 40, 30].map(d => (
                  <label key={d} className="filter-check">
                    <input type="checkbox" />
                    <span>{d}% and above</span>
                  </label>
                ))}
              </div>
            </aside>
          )}

          {/* MAIN CONTENT */}
          <div className="category-main">
            <div className="category-toolbar">
              <div className="result-count">
                <strong>{filtered.length}</strong> products found
                <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
                  {showFilters ? "Hide Filters" : "Show Filters"} ⚙️
                </button>
              </div>
              <div className="sort-wrap">
                <label>Sort by:</label>
                <select value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="popular">Popularity</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters</p>
                <button className="btn btn-primary" onClick={() => { setSelectedBrands([]); setPriceRange([0,20000]); setMinRating(0); }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {filtered.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}