import "./OrderConfirmPage.css";

const METHOD_LABELS = {
  upi: "UPI Payment",
  card: "Credit/Debit Card",
  netbanking: "Net Banking",
  wallet: "Wallet",
  cod: "Cash on Delivery",
};

export default function OrderConfirmPage({ navigate, params }) {
  const { orderId, total, method } = params || {};
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);
  const dateStr = deliveryDate.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="confirm-page">
      <div className="container">
        <div className="confirm-card">
          {/* SUCCESS ANIMATION */}
          <div className="success-circle">
            <div className="checkmark">✓</div>
          </div>

          <h1>Order Placed Successfully!</h1>
          <p className="confirm-sub">Thank you for shopping with NEXUS. Your order has been confirmed.</p>

          <div className="order-details-grid">
            <div className="order-detail-item">
              <span className="detail-label">Order ID</span>
              <span className="detail-value">{orderId || "NX0000000"}</span>
            </div>
            <div className="order-detail-item">
              <span className="detail-label">Amount Paid</span>
              <span className="detail-value">₹{(total || 0).toLocaleString()}</span>
            </div>
            <div className="order-detail-item">
              <span className="detail-label">Payment Method</span>
              <span className="detail-value">{METHOD_LABELS[method] || "Online Payment"}</span>
            </div>
            <div className="order-detail-item">
              <span className="detail-label">Expected Delivery</span>
              <span className="detail-value delivery">{dateStr}</span>
            </div>
          </div>

          {/* DELIVERY STEPS */}
          <div className="delivery-timeline">
            <h3>Order Journey</h3>
            <div className="timeline">
              {[
                { icon: "✅", label: "Order Confirmed", time: "Just now", done: true },
                { icon: "📦", label: "Being Packed", time: "Within 24 hours", done: false },
                { icon: "🚚", label: "Out for Delivery", time: "In 4-5 days", done: false },
                { icon: "🏠", label: "Delivered", time: dateStr, done: false },
              ].map((step, i) => (
                <div key={i} className={`timeline-step ${step.done ? "done" : ""}`}>
                  <div className="timeline-icon">{step.icon}</div>
                  <div className="timeline-info">
                    <strong>{step.label}</strong>
                    <span>{step.time}</span>
                  </div>
                  {i < 3 && <div className="timeline-connector" />}
                </div>
              ))}
            </div>
          </div>

          <div className="confirm-actions">
            <button className="btn btn-secondary btn-lg" onClick={() => navigate("home")}>
              Continue Shopping
            </button>
            <button className="btn btn-primary btn-lg" onClick={() => navigate("home")}>
              Track Order
            </button>
          </div>

          <div className="confirm-footer">
            <p>📧 Order confirmation sent to your email</p>
            <p>📞 Need help? Call us at <strong>1800-123-NEXUS</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}