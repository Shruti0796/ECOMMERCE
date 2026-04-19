import "./Footer.css";

export default function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo"><span>N</span>EXUS</div>
            <p>India's premium fashion and lifestyle destination. Shop the latest trends from top brands.</p>
            <div className="footer-social">
              {["📘","📸","🐦","▶️"].map((icon,i) => (
                <button key={i} className="social-btn">{icon}</button>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Shop</h4>
            <ul>
              {["Men","Women","Kids","New Arrivals","Sale","Brands"].map(item => (
                <li key={item}><button onClick={() => navigate("category", { gender: item.toLowerCase() })}>{item}</button></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Help</h4>
            <ul>
              {["Customer Service","Track Order","Returns & Refunds","Size Guide","FAQs","Contact Us"].map(item => (
                <li key={item}><button>{item}</button></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              {["About Us","Careers","Press","Sustainability","Terms of Use","Privacy Policy"].map(item => (
                <li key={item}><button>{item}</button></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>We Accept</h4>
            <div className="payment-methods">
              {["💳 Credit Card","🏦 Net Banking","📱 UPI","👛 Wallet","💵 COD"].map(m => (
                <span key={m} className="payment-tag">{m}</span>
              ))}
            </div>
            <h4 style={{marginTop: 20}}>Download App</h4>
            <div className="app-badges">
              <button className="app-badge">🍎 App Store</button>
              <button className="app-badge">🤖 Google Play</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 Nexus Fashion Pvt. Ltd. All rights reserved.</p>
          <p>Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  );
}