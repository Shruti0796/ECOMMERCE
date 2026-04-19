import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

export default function WishlistPage({ navigate }) {
  const { items, toggle } = useWishlist();

  if (items.length === 0) {
    return (
      <div style={{textAlign:"center", padding:"80px 24px"}}>
        <div style={{fontSize:72, marginBottom:16}}>♥</div>
        <h2 style={{marginBottom:8}}>Your wishlist is empty</h2>
        <p style={{color:"var(--text-muted)", marginBottom:28}}>Save items you love to your wishlist.</p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate("home")}>
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{padding:"32px 0 60px"}}>
      <div className="container">
        <h1 style={{fontFamily:"var(--font-display)", fontSize:28, marginBottom:8}}>
          My Wishlist{" "}
          <span style={{fontSize:18, fontFamily:"var(--font-body)", color:"var(--text-muted)"}}>
            ({items.length} items)
          </span>
        </h1>
        <p style={{color:"var(--text-muted)", marginBottom:28}}>Items you've saved for later</p>
        <div className="product-grid">
          {items.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
        </div>
      </div>
    </div>
  );
}