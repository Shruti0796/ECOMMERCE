import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./ProductCard.css";

export default function ProductCard({ product, navigate }) {
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [toast, setToast] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const size = product.sizes[0];
    addToCart(product, size);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggle(product);
  };

  return (
    <div className="product-card" onClick={() => navigate("product", { id: product.id })}>
      <div className="product-card-img-wrap">
        <img src={product.img} alt={product.name} loading="lazy" />
        {product.discount > 0 && (
          <span className="product-discount-badge">{product.discount}% OFF</span>
        )}
        <button
          className={`product-wishlist-btn ${wishlisted ? "active" : ""}`}
          onClick={handleWishlist}
          title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button className="product-quick-add" onClick={handleAddToCart}>
          Quick Add
        </button>
      </div>

      <div className="product-card-body">
        <p className="product-brand">{product.brand}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <span className="star">★</span>
          <span className="rating-num">{product.rating}</span>
          <span className="rating-count">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="product-pricing">
          <span className="price">₹{product.price.toLocaleString()}</span>
          <span className="price-original">₹{product.originalPrice.toLocaleString()}</span>
          <span className="price-discount">({product.discount}% off)</span>
        </div>
      </div>

      {toast && (
        <div className="card-toast">Added to bag ✓</div>
      )}
    </div>
  );
}