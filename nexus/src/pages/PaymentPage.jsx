import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./PaymentPage.css";

const BANKS = ["State Bank of India","HDFC Bank","ICICI Bank","Axis Bank","Kotak Mahindra Bank","Punjab National Bank","Bank of Baroda","Canara Bank","Union Bank","Yes Bank"];
const WALLETS = [
  { id: "paytm", name: "Paytm", icon: "💙", balance: "₹450" },
  { id: "phonepe", name: "PhonePe", icon: "💜", balance: "₹1,200" },
  { id: "gpay", name: "Google Pay", icon: "🔵", balance: "Linked" },
  { id: "amazon", name: "Amazon Pay", icon: "🟠", balance: "₹0" },
];

export default function PaymentPage({ navigate, params }) {
  const { total, clearCart } = useCart();
  const [method, setMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  // UPI
  const [upiId, setUpiId] = useState("");
  const [upiVerified, setUpiVerified] = useState(false);
  const [upiChecking, setUpiChecking] = useState(false);

  // Card
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [showCvv, setShowCvv] = useState(false);
  const [saveCard, setSaveCard] = useState(false);

  // Net Banking
  const [bank, setBank] = useState("");

  // Wallet
  const [wallet, setWallet] = useState("paytm");

  // COD
  const finalTotal = params?.total || total;

  const setCardField = (k, v) => {
    let val = v;
    if (k === "number") val = v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    if (k === "expiry") {
      val = v.replace(/\D/g, "").slice(0, 4);
      if (val.length >= 2) val = val.slice(0, 2) + "/" + val.slice(2);
    }
    if (k === "cvv") val = v.replace(/\D/g, "").slice(0, 4);
    setCard(c => ({ ...c, [k]: val }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: "" }));
  };

  const verifyUpi = () => {
    if (!upiId.includes("@")) { setErrors({ upiId: "Enter a valid UPI ID (e.g. name@upi)" }); return; }
    setUpiChecking(true);
    setTimeout(() => { setUpiChecking(false); setUpiVerified(true); }, 1500);
  };

  const validateCard = () => {
    const e = {};
    const rawNum = card.number.replace(/\s/g, "");
    if (rawNum.length !== 16) e.number = "Enter a valid 16-digit card number";
    if (!card.name.trim()) e.name = "Enter cardholder name";
    if (!card.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = "Enter valid expiry (MM/YY)";
    if (card.cvv.length < 3) e.cvv = "Enter valid CVV";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = () => {
    if (method === "card" && !validateCard()) return;
    if (method === "upi" && !upiVerified) { setErrors({ upiId: "Please verify your UPI ID first" }); return; }
    if (method === "netbanking" && !bank) { setErrors({ bank: "Please select a bank" }); return; }

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      clearCart();
      const orderId = "NX" + Math.random().toString(36).slice(2, 10).toUpperCase();
      navigate("order-confirm", { orderId, total: finalTotal, method });
    }, 2500);
  };

  const getCardType = () => {
    const n = card.number.replace(/\s/g, "");
    if (n.startsWith("4")) return "💳 VISA";
    if (n.startsWith("5")) return "💳 Mastercard";
    if (n.startsWith("6")) return "💳 RuPay";
    if (n.startsWith("3")) return "💳 Amex";
    return "";
  };

  return (
    <div className="payment-page">
      <div className="container">
        {/* STEPS */}
        <div className="checkout-steps">
          {[["1","BAG"],["2","ADDRESS"],["3","PAYMENT"],["4","SUMMARY"]].map(([n,l], i) => (
            <div key={l} className={`step ${i <= 2 ? "active" : ""} ${i === 2 ? "current" : ""}`}>
              <div className="step-circle">{i < 2 ? "✓" : n}</div>
              <span>{l}</span>
              {i < 3 && <div className="step-line" />}
            </div>
          ))}
        </div>

        <div className="payment-layout">
          {/* PAYMENT METHODS */}
          <div className="payment-main">
            <h2 className="checkout-section-title">Payment Options</h2>

            <div className="payment-options">
              {/* UPI */}
              <div className={`payment-option ${method === "upi" ? "active" : ""}`}>
                <div className="payment-option-header" onClick={() => setMethod("upi")}>
                  <input type="radio" checked={method === "upi"} onChange={() => setMethod("upi")} />
                  <div className="payment-option-title">
                    <span className="method-icon">📱</span>
                    <div>
                      <strong>UPI</strong>
                      <p>Pay via any UPI app</p>
                    </div>
                  </div>
                  <div className="upi-app-icons">
                    <span title="PhonePe">💜</span>
                    <span title="Google Pay">🔵</span>
                    <span title="Paytm">💙</span>
                    <span title="BHIM">🟢</span>
                  </div>
                </div>

                {method === "upi" && (
                  <div className="payment-option-body">
                    <div className="upi-input-row">
                      <div className="form-group" style={{flex:1, marginBottom:0}}>
                        <label>Enter UPI ID</label>
                        <input
                          value={upiId}
                          onChange={e => { setUpiId(e.target.value); setUpiVerified(false); setErrors({}); }}
                          placeholder="yourname@upi or mobile@paytm"
                          className={errors.upiId ? "error" : ""}
                        />
                        {errors.upiId && <span className="form-error">{errors.upiId}</span>}
                      </div>
                      <button
                        className="btn btn-outline verify-btn"
                        onClick={verifyUpi}
                        disabled={upiChecking || upiVerified}
                      >
                        {upiChecking ? "Checking..." : upiVerified ? "✓ Verified" : "Verify"}
                      </button>
                    </div>
                    {upiVerified && (
                      <div className="upi-verified-msg">
                        ✅ UPI ID verified — <strong>{upiId}</strong>
                      </div>
                    )}
                    <p className="payment-note">You will be redirected to your UPI app to complete the payment.</p>
                  </div>
                )}
              </div>

              {/* CARD */}
              <div className={`payment-option ${method === "card" ? "active" : ""}`}>
                <div className="payment-option-header" onClick={() => setMethod("card")}>
                  <input type="radio" checked={method === "card"} onChange={() => setMethod("card")} />
                  <div className="payment-option-title">
                    <span className="method-icon">💳</span>
                    <div>
                      <strong>Credit / Debit Card</strong>
                      <p>Visa, Mastercard, RuPay, Amex</p>
                    </div>
                  </div>
                  <div className="card-scheme-icons">
                    {["VISA","MC","Rupay"].map(s => <span key={s} className="scheme-tag">{s}</span>)}
                  </div>
                </div>

                {method === "card" && (
                  <div className="payment-option-body">
                    {/* CARD PREVIEW */}
                    <div className={`card-preview ${card.number ? "has-number" : ""}`}>
                      <div className="card-preview-top">
                        <div className="card-chip">▬▬</div>
                        <span className="card-type-label">{getCardType()}</span>
                      </div>
                      <div className="card-preview-number">
                        {(card.number || "•••• •••• •••• ••••").split("").map((c,i) => <span key={i}>{c}</span>)}
                      </div>
                      <div className="card-preview-bottom">
                        <div><div className="card-preview-label">CARDHOLDER</div><div>{card.name || "YOUR NAME"}</div></div>
                        <div><div className="card-preview-label">EXPIRES</div><div>{card.expiry || "MM/YY"}</div></div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Card Number *</label>
                      <input
                        value={card.number}
                        onChange={e => setCardField("number", e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className={errors.number ? "error" : ""}
                        inputMode="numeric"
                      />
                      {errors.number && <span className="form-error">{errors.number}</span>}
                    </div>

                    <div className="form-group">
                      <label>Name on Card *</label>
                      <input
                        value={card.name}
                        onChange={e => setCardField("name", e.target.value.toUpperCase())}
                        placeholder="As printed on card"
                        className={errors.name ? "error" : ""}
                      />
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Expiry Date *</label>
                        <input
                          value={card.expiry}
                          onChange={e => setCardField("expiry", e.target.value)}
                          placeholder="MM/YY"
                          className={errors.expiry ? "error" : ""}
                          inputMode="numeric"
                        />
                        {errors.expiry && <span className="form-error">{errors.expiry}</span>}
                      </div>
                      <div className="form-group">
                        <label>
                          CVV *
                          <span className="cvv-info" title="3-digit code on the back of your card">ⓘ</span>
                        </label>
                        <div className="cvv-input-wrap">
                          <input
                            type={showCvv ? "text" : "password"}
                            value={card.cvv}
                            onChange={e => setCardField("cvv", e.target.value)}
                            placeholder="•••"
                            className={errors.cvv ? "error" : ""}
                            inputMode="numeric"
                          />
                          <button className="cvv-toggle" type="button" onClick={() => setShowCvv(s => !s)}>
                            {showCvv ? "Hide" : "Show"}
                          </button>
                        </div>
                        {errors.cvv && <span className="form-error">{errors.cvv}</span>}
                      </div>
                    </div>

                    <label className="save-card-check">
                      <input type="checkbox" checked={saveCard} onChange={e => setSaveCard(e.target.checked)} />
                      <span>Securely save this card for future payments</span>
                    </label>

                    <p className="payment-note">🔒 Your card details are encrypted with 256-bit SSL. We never store your CVV.</p>
                  </div>
                )}
              </div>

              {/* NET BANKING */}
              <div className={`payment-option ${method === "netbanking" ? "active" : ""}`}>
                <div className="payment-option-header" onClick={() => setMethod("netbanking")}>
                  <input type="radio" checked={method === "netbanking"} onChange={() => setMethod("netbanking")} />
                  <div className="payment-option-title">
                    <span className="method-icon">🏦</span>
                    <div>
                      <strong>Net Banking</strong>
                      <p>All major Indian banks</p>
                    </div>
                  </div>
                </div>

                {method === "netbanking" && (
                  <div className="payment-option-body">
                    <div className="popular-banks">
                      <p className="popular-label">Popular Banks</p>
                      {BANKS.slice(0, 5).map(b => (
                        <label key={b} className="bank-option">
                          <input type="radio" name="bank" checked={bank === b} onChange={() => { setBank(b); setErrors({}); }} />
                          <span>🏛 {b}</span>
                        </label>
                      ))}
                    </div>
                    <div className="form-group" style={{marginTop:12}}>
                      <label>Other Banks</label>
                      <select value={bank} onChange={e => { setBank(e.target.value); setErrors({}); }} className={errors.bank ? "error" : ""}>
                        <option value="">Select Bank</option>
                        {BANKS.slice(5).map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                      {errors.bank && <span className="form-error">{errors.bank}</span>}
                    </div>
                    <p className="payment-note">You will be redirected to your bank's secure portal to complete the payment.</p>
                  </div>
                )}
              </div>

              {/* WALLET */}
              <div className={`payment-option ${method === "wallet" ? "active" : ""}`}>
                <div className="payment-option-header" onClick={() => setMethod("wallet")}>
                  <input type="radio" checked={method === "wallet"} onChange={() => setMethod("wallet")} />
                  <div className="payment-option-title">
                    <span className="method-icon">👛</span>
                    <div>
                      <strong>Wallets</strong>
                      <p>Paytm, PhonePe, Amazon Pay and more</p>
                    </div>
                  </div>
                </div>

                {method === "wallet" && (
                  <div className="payment-option-body">
                    <div className="wallet-options">
                      {WALLETS.map(w => (
                        <label key={w.id} className={`wallet-option ${wallet === w.id ? "selected" : ""}`}>
                          <input type="radio" name="wallet" checked={wallet === w.id} onChange={() => setWallet(w.id)} />
                          <span className="wallet-icon">{w.icon}</span>
                          <div className="wallet-info">
                            <strong>{w.name}</strong>
                            <span>Balance: {w.balance}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                    <p className="payment-note">You will be redirected to {WALLETS.find(w2 => w2.id === wallet)?.name} to complete the payment.</p>
                  </div>
                )}
              </div>

              {/* COD */}
              <div className={`payment-option ${method === "cod" ? "active" : ""}`}>
                <div className="payment-option-header" onClick={() => setMethod("cod")}>
                  <input type="radio" checked={method === "cod"} onChange={() => setMethod("cod")} />
                  <div className="payment-option-title">
                    <span className="method-icon">💵</span>
                    <div>
                      <strong>Cash on Delivery</strong>
                      <p>Pay when your order arrives</p>
                    </div>
                  </div>
                  <span className="cod-badge">+₹40 COD Fee</span>
                </div>
                {method === "cod" && (
                  <div className="payment-option-body">
                    <p className="payment-note">💡 Keep exact change ready. A COD fee of ₹40 will be added to your order total.</p>
                    <p className="payment-note" style={{color:'var(--text-muted)'}}>Total payable at delivery: <strong>₹{(finalTotal + 40).toLocaleString()}</strong></p>
                  </div>
                )}
              </div>
            </div>

            {/* PAY BUTTON */}
            <div className="pay-btn-wrap">
              {processing ? (
                <div className="processing-screen">
                  <div className="spinner" />
                  <p>Processing your payment securely...</p>
                  <p className="processing-sub">Please do not press back or refresh</p>
                </div>
              ) : (
                <button className="btn btn-primary btn-lg btn-block" onClick={handlePay}>
                  🔒 Pay ₹{method === "cod" ? (finalTotal + 40).toLocaleString() : finalTotal.toLocaleString()}
                </button>
              )}
              <div className="pay-icons">
                <span>🔒 256-bit SSL</span>
                <span>|</span>
                <span>🛡 Secure Checkout</span>
                <span>|</span>
                <span>✅ Buyer Protection</span>
              </div>
            </div>
          </div>

          {/* PAYMENT SIDEBAR */}
          <div className="payment-sidebar">
            <div className="summary-card">
              <h3>Amount to Pay</h3>
              <div className="divider" />
              <div className="pay-total">
                <span>₹{finalTotal.toLocaleString()}</span>
                {method === "cod" && <p className="cod-note">+₹40 COD fee = ₹{(finalTotal + 40).toLocaleString()}</p>}
              </div>
              <div className="payment-assurance">
                <div className="assurance-item"><span>🔒</span><span>100% Secure</span></div>
                <div className="assurance-item"><span>↩️</span><span>Easy Returns</span></div>
                <div className="assurance-item"><span>✅</span><span>Genuine Products</span></div>
                <div className="assurance-item"><span>🚚</span><span>Fast Delivery</span></div>
              </div>
            </div>

            <div className="payup-logo-box">
              <p style={{fontSize:12, color:'var(--text-muted)', marginBottom:8}}>Payments powered by</p>
              <div className="payup-logo">
                <span className="pay-p">Pay</span><span className="pay-up">UP</span>
              </div>
              <p style={{fontSize:11, color:'var(--text-muted)', marginTop:4}}>India's most trusted payment gateway</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}