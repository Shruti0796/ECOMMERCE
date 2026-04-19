import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { getProductById, PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./ProductPage.css";

export default function ProductPage({ navigate, params }) {
  const product = getProductById(params.id);
  const { addToCart } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState("description");
  const [toast, setToast] = useState("");
  const [sizeError, setSizeError] = useState(false);

  if (!product) return <div className="container" style={{padding:"60px 24px", textAlign:"center"}}><h2>Product not found</h2><button className="btn btn-primary" onClick={() => navigate("home")}>Go Home</button></div>;

  const related = PRODUCTS.filter(p => p.gender === product.gender && p.id !== product.id && p.subcategory === product.subcategory).slice(0, 4);
  const images = [product.img, product.img, product.img];

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    addToCart(product, selectedSize, qty);
    setToast("Added to bag!");
    setTimeout(() => setToast(""), 2500);
  };

  const handleBuyNow = () => {
    if (!selectedSize) { setSizeError(true); return; }
    addToCart(product, selectedSize, qty);
    navigate("cart");
  };

  return (
    <div className="product-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <button onClick={() => navigate("home")}>Home</button><span>/</span>
          <button onClick={() => navigate("category", { gender: product.gender })}>{product.gender}</button><span>/</span>
          <button onClick={() => navigate("category", { gender: product.gender, sub: product.subcategory })}>{product.subcategory}</button><span>/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>

        <div className="product-layout">
          {/* IMAGE GALLERY */}
          <div className="product-gallery">
            <div className="gallery-thumbs">
              {images.map((img, i) => (
                <button key={i} className={`thumb ${activeImg === i ? "active" : ""}`} onClick={() => setActiveImg(i)}>
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
            <div className="gallery-main">
              <img src={images[activeImg]} alt={product.name} />
              {product.discount > 0 && <span className="product-badge">{product.discount}% OFF</span>}
              <button className={`wishlist-fab ${isWishlisted(product.id) ? "active" : ""}`} onClick={() => toggle(product)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted(product.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="product-info">
            <div className="info-brand">{product.brand}</div>
            <h1 className="info-name">{product.name}</h1>

            <div className="info-rating">
              <div className="rating-pill">
                <span>{product.rating}</span>
                <span className="star-icon">★</span>
              </div>
              <span className="rating-reviews">{product.reviews.toLocaleString()} ratings</span>
              <span className="badge badge-success">In Stock</span>
            </div>

            <div className="divider" />

            <div className="info-price">
              <span className="info-price-main">₹{product.price.toLocaleString()}</span>
              <span className="price-original" style={{fontSize:18}}>₹{product.originalPrice.toLocaleString()}</span>
              <span className="price-discount" style={{fontSize:16}}>({product.discount}% off)</span>
            </div>
            <p style={{color:'var(--success)', fontSize:13, marginBottom:8}}>Inclusive of all taxes</p>

            <div className="divider" />

            {/* SIZE SELECTOR */}
            <div className="size-section">
              <div className="size-header">
                <span className="size-label">Select Size</span>
                <button className="size-guide-btn">Size Guide</button>
              </div>
              <div className="size-options">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    className={`size-btn ${selectedSize === s ? "active" : ""}`}
                    onClick={() => { setSelectedSize(s); setSizeError(false); }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeError && <p className="form-error">Please select a size</p>}
            </div>

            {/* QTY */}
            <div className="qty-section">
              <span className="size-label">Quantity</span>
              <div className="qty-control">
                <button onClick={() => setQty(q => Math.max(1, q-1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => Math.min(10, q+1))}>+</button>
              </div>
            </div>

            {/* CTA */}
            <div className="info-ctas">
              <button className="btn btn-primary btn-lg" style={{flex:1}} onClick={handleAddToCart}>
                🛒 Add to Bag
              </button>
              <button className="btn btn-secondary btn-lg" style={{flex:1}} onClick={handleBuyNow}>
                ⚡ Buy Now
              </button>
              <button className={`btn btn-icon btn-secondary ${isWishlisted(product.id) ? "wishlisted" : ""}`} onClick={() => toggle(product)}>
                ♥
              </button>
            </div>

            {/* DELIVERY INFO */}
            <div className="delivery-info">
              <div className="delivery-item">
                <span>🚚</span>
                <div>
                  <strong>Free Delivery</strong>
                  <p>Enter pincode for delivery details</p>
                  <div className="pincode-row">
                    <input type="text" placeholder="Enter Pincode" maxLength={6} />
                    <button>Check</button>
                  </div>
                </div>
              </div>
              <div className="delivery-item">
                <span>↩️</span>
                <div><strong>30 Days Return</strong><p>Easy hassle-free returns</p></div>
              </div>
              <div className="delivery-item">
                <span>✅</span>
                <div><strong>Authentic Product</strong><p>100% genuine product guaranteed</p></div>
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="product-tabs">
          {["description","specifications","reviews"].map(t => (
            <button key={t} className={`tab-btn ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {tab === "description" && (
            <div>
              <p style={{marginBottom:16}}>{product.description}</p>
              <ul style={{paddingLeft:20, display:'flex', flexDirection:'column', gap:8}}>
                <li>Material: Premium quality fabric</li>
                <li>Care: Machine wash cold, tumble dry low</li>
                <li>Country of Origin: India</li>
                <li>Brand: {product.brand}</li>
                <li>Category: {product.subcategory}</li>
              </ul>
            </div>
          )}
          {tab === "specifications" && (
            <table className="specs-table">
              <tbody>
                {[["Brand", product.brand], ["Category", product.subcategory], ["Gender", product.gender], ["Available Sizes", product.sizes.join(", ")], ["Rating", `${product.rating} / 5`], ["Total Reviews", product.reviews.toLocaleString()]].map(([k,v]) => (
                  <tr key={k}><td className="spec-key">{k}</td><td>{v}</td></tr>
                ))}
              </tbody>
            </table>
          )}
          {tab === "reviews" && (
            <div className="reviews-section">
              <div className="rating-overview">
                <div className="big-rating">{product.rating}<span>/5</span></div>
                <div>
                  <div style={{fontSize:24, color:'#f59e0b'}}>{"★".repeat(Math.round(product.rating))}{"☆".repeat(5-Math.round(product.rating))}</div>
                  <div style={{color:'var(--text-muted)', fontSize:14}}>{product.reviews.toLocaleString()} verified ratings</div>
                </div>
              </div>
              <div className="review-bars">
                {[[5,72],[4,16],[3,7],[2,3],[1,2]].map(([star, pct]) => (
                  <div className="review-bar-row" key={star}>
                    <span>{star}★</span>
                    <div className="review-bar"><div className="review-bar-fill" style={{width:`${pct}%`}} /></div>
                    <span>{pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <div className="section">
            <h2 className="section-title">You May Also Like</h2>
            <div className="product-grid">
              {related.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
            </div>
          </div>
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}