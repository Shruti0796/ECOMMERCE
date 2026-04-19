import { useCart } from "../context/CartContext";
import "./CartPage.css";

export default function CartPage({ navigate }) {
  const { items, removeFromCart, updateQty, total, discount, count } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <h2>Your bag is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate("home")}>
          Start Shopping
        </button>
      </div>
    );
  }

  const deliveryCharge = total >= 999 ? 0 : 99;
  const finalTotal = total + deliveryCharge;

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">My Bag <span>({count} items)</span></h1>

        <div className="cart-layout">
          {/* ITEMS */}
          <div className="cart-items">
            {items.map(item => (
              <div className="cart-item" key={item.key}>
                <div className="cart-item-img" onClick={() => navigate("product", { id: item.id })}>
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <p className="cart-item-brand">{item.brand}</p>
                  <h3 className="cart-item-name" onClick={() => navigate("product", { id: item.id })}>
                    {item.name}
                  </h3>
                  <p className="cart-item-meta">Size: <strong>{item.size}</strong></p>
                  <div className="cart-item-price">
                    <span className="price">₹{(item.price * item.qty).toLocaleString()}</span>
                    <span className="price-original">₹{(item.originalPrice * item.qty).toLocaleString()}</span>
                    <span className="badge badge-success">{item.discount}% off</span>
                  </div>
                  <div className="cart-item-actions">
                    <div className="qty-control">
                      <button onClick={() => updateQty(item.key, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.key)}>
                      🗑 Remove
                    </button>
                    <button className="wishlist-move-btn">♥ Move to Wishlist</button>
                  </div>
                </div>
              </div>
            ))}

            {/* COUPON */}
            <div className="coupon-box">
              <h3>🏷️ Apply Coupon</h3>
              <div className="coupon-row">
                <input type="text" placeholder="Enter coupon code" />
                <button className="btn btn-outline">Apply</button>
              </div>
              <div className="coupon-chips">
                {["NEXUS10", "FIRST50", "FLAT200"].map(c => (
                  <button key={c} className="coupon-chip">{c}</button>
                ))}
              </div>
            </div>
          </div>

          {/* PRICE SUMMARY */}
          <div className="cart-summary">
            <div className="summary-card">
              <h3>Price Details</h3>
              <div className="divider" />
              <div className="summary-rows">
                <div className="summary-row">
                  <span>Price ({count} items)</span>
                  <span>₹{(total + discount).toLocaleString()}</span>
                </div>
                <div className="summary-row discount">
                  <span>Discount</span>
                  <span>− ₹{discount.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Charges</span>
                  <span className={deliveryCharge === 0 ? "free" : ""}>
                    {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                  </span>
                </div>
                {deliveryCharge > 0 && (
                  <p className="free-delivery-tip">
                    Add items worth ₹{(999 - total).toLocaleString()} more for FREE delivery
                  </p>
                )}
              </div>
              <div className="divider" />
              <div className="summary-row total">
                <span>Total Amount</span>
                <span>₹{finalTotal.toLocaleString()}</span>
              </div>
              <p className="savings-text">
                🎉 You will save ₹{discount.toLocaleString()} on this order!
              </p>
              <button className="btn btn-primary btn-lg btn-block" onClick={() => navigate("checkout")}>
                Proceed to Checkout
              </button>
            </div>

            {/* SAFE PAYMENT */}
            <div className="safe-payment">
              <div className="safe-icon">🔒</div>
              <div>
                <strong>Safe and Secure Payments</strong>
                <p>100% Authentic Products &bull; Easy Returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}