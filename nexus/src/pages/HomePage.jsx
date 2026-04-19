import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../data/products";
import "./HomePage.css";

const HERO_SLIDES = [
  { title: "New Season Arrivals", sub: "Explore the latest trends in fashion", cta: "Shop Women", gender: "women", bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600" },
  { title: "Men's Edit 2024", sub: "Sharp looks for every occasion", cta: "Shop Men", gender: "men", bg: "linear-gradient(135deg, #2d1b00 0%, #4a2d00 50%, #6b4000 100%)", img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600" },
  { title: "Kids Collection", sub: "Adorable styles for little ones", cta: "Shop Kids", gender: "kids", bg: "linear-gradient(135deg, #0d2e1a 0%, #1a4d2e 50%, #2d6b45 100%)", img: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600" },
];

export default function HomePage({ navigate }) {
  const [slide, setSlide] = useState(0);
  const featured = PRODUCTS.filter(p => p.rating >= 4.5).slice(0, 8);
  const newArrivals = PRODUCTS.slice(-8);
  const topDeals = PRODUCTS.filter(p => p.discount >= 40).slice(0, 8);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const current = HERO_SLIDES[slide];

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero" style={{ background: current.bg }}>
        <div className="container hero-inner">
          <div className="hero-text">
            <span className="hero-eyebrow">New Collection</span>
            <h1 className="hero-title">{current.title}</h1>
            <p className="hero-sub">{current.sub}</p>
            <div className="hero-btns">
              <button className="btn btn-primary btn-lg" onClick={() => navigate("category", { gender: current.gender })}>
                {current.cta}
              </button>
              <button className="btn btn-secondary btn-lg" style={{color:'white', borderColor:'rgba(255,255,255,0.4)'}} onClick={() => navigate("category", {})}>
                View All
              </button>
            </div>
          </div>
          <div className="hero-img">
            <img src={current.img} alt={current.title} />
          </div>
        </div>
        <div className="hero-dots">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className={`dot ${i === slide ? "active" : ""}`} onClick={() => setSlide(i)} />
          ))}
        </div>
      </section>

      {/* OFFER STRIP */}
      <section className="offer-strip">
        <div className="container offer-grid">
          {[
            { icon: "🚚", title: "Free Delivery", desc: "On orders above ₹999" },
            { icon: "↩️", title: "Easy Returns", desc: "30-day hassle-free returns" },
            { icon: "🔒", title: "Secure Payment", desc: "100% safe & encrypted" },
            { icon: "💬", title: "24/7 Support", desc: "Dedicated customer care" },
          ].map(o => (
            <div className="offer-item" key={o.title}>
              <span className="offer-icon">{o.icon}</span>
              <div>
                <div className="offer-title">{o.title}</div>
                <div className="offer-desc">{o.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP BY GENDER */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Shop by Gender</h2>
          <p className="section-subtitle">Curated collections for everyone</p>
          <div className="gender-grid">
            {[
              { key: "men", label: "Men", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400", sub: "Clothing, Shoes & More" },
              { key: "women", label: "Women", img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400", sub: "Fashion & Accessories" },
              { key: "kids", label: "Kids", img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400", sub: "Boys, Girls & Babies" },
            ].map(g => (
              <div className="gender-card" key={g.key} onClick={() => navigate("category", { gender: g.key })}>
                <img src={g.img} alt={g.label} />
                <div className="gender-card-overlay">
                  <h3>{g.label}</h3>
                  <p>{g.sub}</p>
                  <span className="btn btn-primary btn-sm">Shop Now</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES QUICK LINKS */}
      <section className="section" style={{paddingTop: 0}}>
        <div className="container">
          <h2 className="section-title">Popular Categories</h2>
          <p className="section-subtitle">Find what you love</p>
          <div className="cat-chips">
            {[
              { label: "👗 Dresses", g: "women", s: "Clothing" },
              { label: "👟 Sneakers", g: "men", s: "Shoes" },
              { label: "👜 Handbags", g: "women", s: "Handbags" },
              { label: "🕶️ Accessories", g: "men", s: "Accessories" },
              { label: "💄 Beauty", g: "women", s: "Perfumes" },
              { label: "🧸 Toys", g: "kids", s: "Toys" },
              { label: "⌚ Watches", g: "men", s: "Watches" },
              { label: "💍 Jewelry", g: "women", s: "Jewelry" },
            ].map(c => (
              <button key={c.label} className="cat-chip" onClick={() => navigate("category", { gender: c.g, sub: c.s })}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section" style={{background: 'var(--white)'}}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Top Rated</h2>
              <p className="section-subtitle">Loved by thousands of customers</p>
            </div>
            <button className="btn btn-outline" onClick={() => navigate("category", {})}>View All</button>
          </div>
          <div className="product-grid">
            {featured.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
          </div>
        </div>
      </section>

      {/* SALE BANNER */}
      <section className="sale-banner">
        <div className="container sale-inner">
          <div>
            <span className="sale-eyebrow">Limited Time</span>
            <h2>Up to 60% OFF 🔥</h2>
            <p>Massive discounts on fashion & accessories. Don't miss out!</p>
            <button className="btn btn-primary btn-lg" onClick={() => navigate("category", { sale: true })}>
              Shop the Sale
            </button>
          </div>
          <div className="sale-counters">
            {[["12", "Hours"], ["43", "Minutes"], ["57", "Seconds"]].map(([n, l]) => (
              <div className="sale-counter" key={l}>
                <span className="counter-num">{n}</span>
                <span className="counter-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">New Arrivals</h2>
              <p className="section-subtitle">Fresh styles just dropped</p>
            </div>
            <button className="btn btn-outline" onClick={() => navigate("category", {})}>View All</button>
          </div>
          <div className="product-grid">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
          </div>
        </div>
      </section>

      {/* TOP DEALS */}
      <section className="section" style={{background: 'var(--white)'}}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Best Deals</h2>
              <p className="section-subtitle">Maximum savings on top picks</p>
            </div>
            <button className="btn btn-outline" onClick={() => navigate("category", { sale: true })}>View All Deals</button>
          </div>
          <div className="product-grid">
            {topDeals.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <div className="container newsletter-inner">
          <div>
            <h2>Get Style Updates</h2>
            <p>Subscribe for exclusive deals, new arrivals and style inspiration.</p>
          </div>
          <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}