import { useMemo } from "react";
import { searchProducts } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function SearchPage({ navigate, params }) {
  const { query } = params || {};
  const results = useMemo(() => searchProducts(query || ""), [query]);

  return (
    <div style={{padding:"32px 0 60px"}}>
      <div className="container">
        <h1 style={{fontFamily:"var(--font-display)", fontSize:28, marginBottom:4}}>
          Search Results
        </h1>
        <p style={{color:"var(--text-muted)", marginBottom:28}}>
          {results.length} results for <strong>"{query}"</strong>
        </p>

        {results.length === 0 ? (
          <div style={{textAlign:"center", padding:"60px 24px"}}>
            <div style={{fontSize:60, marginBottom:16}}>🔍</div>
            <h2 style={{marginBottom:8}}>No results found</h2>
            <p style={{color:"var(--text-muted)", marginBottom:24}}>Try different keywords or browse our categories</p>
            <button className="btn btn-primary" onClick={() => navigate("home")}>Go Home</button>
          </div>
        ) : (
          <div className="product-grid">
            {results.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
          </div>
        )}
      </div>
    </div>
  );
}