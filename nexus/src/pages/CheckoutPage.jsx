import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./CheckoutPage.css";

const STATES = ["Andhra Pradesh","Assam","Bihar","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu & Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];

const SAVED_ADDRESSES = [
  { id: 1, name: "Rahul Sharma", phone: "9876543210", line1: "42, Green Park Society", line2: "Near City Mall", city: "Mumbai", state: "Maharashtra", pincode: "400001", type: "Home" },
  { id: 2, name: "Rahul Sharma", phone: "9876543210", line1: "Office Block B, Tech Park", line2: "Powai", city: "Mumbai", state: "Maharashtra", pincode: "400076", type: "Work" },
];

export default function CheckoutPage({ navigate }) {
  const { items, total, discount, setAddress } = useCart();
  const [selectedAddress, setSelectedAddress] = useState(SAVED_ADDRESSES[0].id);
  const [showNewForm, setShowNewForm] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "", phone: "", email: "", line1: "", line2: "",
    city: "", state: "", pincode: "", addressType: "Home",
  });

  const deliveryCharge = total >= 999 ? 0 : 99;
  const finalTotal = total + deliveryCharge;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.phone.match(/^\d{10}$/)) e.phone = "Enter a valid 10-digit phone number";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email";
    if (!form.line1.trim()) e.line1 = "Address line 1 is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state) e.state = "Please select a state";
    if (!form.pincode.match(/^\d{6}$/)) e.pincode = "Enter a valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); if (errors[k]) setErrors(e => ({ ...e, [k]: "" })); };

  const handleContinue = () => {
    if (showNewForm) {
      if (!validate()) return;
      setAddress(form);
    } else {
      const addr = SAVED_ADDRESSES.find(a => a.id === selectedAddress);
      setAddress(addr);
    }
    navigate("payment", { total: finalTotal });
  };

  if (items.length === 0) {
    return (
      <div style={{textAlign:"center", padding:"80px 24px"}}>
        <h2>No items in bag</h2>
        <button className="btn btn-primary" onClick={() => navigate("home")}>Shop Now</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        {/* STEPS */}
        <div className="checkout-steps">
          {[["1","BAG"],["2","ADDRESS"],["3","PAYMENT"],["4","SUMMARY"]].map(([n,l], i) => (
            <div key={l} className={`step ${i <= 1 ? "active" : ""} ${i === 1 ? "current" : ""}`}>
              <div className="step-circle">{i < 1 ? "✓" : n}</div>
              <span>{l}</span>
              {i < 3 && <div className="step-line" />}
            </div>
          ))}
        </div>

        <div className="checkout-layout">
          {/* ADDRESS SECTION */}
          <div className="checkout-main">
            <h2 className="checkout-section-title">Delivery Address</h2>

            {/* SAVED ADDRESSES */}
            {!showNewForm && (
              <div className="saved-addresses">
                {SAVED_ADDRESSES.map(addr => (
                  <div
                    key={addr.id}
                    className={`address-card ${selectedAddress === addr.id ? "selected" : ""}`}
                    onClick={() => setSelectedAddress(addr.id)}
                  >
                    <div className="address-card-header">
                      <input type="radio" checked={selectedAddress === addr.id} onChange={() => setSelectedAddress(addr.id)} />
                      <span className="address-name">{addr.name}</span>
                      <span className="badge badge-brand">{addr.type}</span>
                    </div>
                    <div className="address-details">
                      <p>{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                      <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p>📞 {addr.phone}</p>
                    </div>
                    {selectedAddress === addr.id && (
                      <div className="address-actions">
                        <button className="btn btn-sm btn-secondary">Edit</button>
                        <button className="btn btn-sm btn-secondary">Remove</button>
                        <button className="btn btn-sm btn-primary" onClick={handleContinue}>
                          Deliver Here
                        </button>
                      </div>
                    )}
                  </div>
                ))}

                <button className="add-address-btn" onClick={() => setShowNewForm(true)}>
                  + Add New Address
                </button>
              </div>
            )}

            {/* NEW ADDRESS FORM */}
            {showNewForm && (
              <div className="new-address-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input className={errors.name ? "error" : ""} value={form.name} onChange={e => set("name", e.target.value)} placeholder="Enter your full name" />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input className={errors.phone ? "error" : ""} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="10-digit mobile number" maxLength={10} />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input className={errors.email ? "error" : ""} value={form.email} onChange={e => set("email", e.target.value)} placeholder="yourname@email.com" />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label>Address Line 1 * (House No., Building, Street)</label>
                  <input className={errors.line1 ? "error" : ""} value={form.line1} onChange={e => set("line1", e.target.value)} placeholder="e.g. 42, Green Park Society, MG Road" />
                  {errors.line1 && <span className="form-error">{errors.line1}</span>}
                </div>

                <div className="form-group">
                  <label>Address Line 2 (Area, Colony, Landmark)</label>
                  <input value={form.line2} onChange={e => set("line2", e.target.value)} placeholder="e.g. Near City Mall, Andheri West" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City / District *</label>
                    <input className={errors.city ? "error" : ""} value={form.city} onChange={e => set("city", e.target.value)} placeholder="City" />
                    {errors.city && <span className="form-error">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label>Pincode *</label>
                    <input className={errors.pincode ? "error" : ""} value={form.pincode} onChange={e => set("pincode", e.target.value)} placeholder="6-digit pincode" maxLength={6} />
                    {errors.pincode && <span className="form-error">{errors.pincode}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>State *</label>
                  <select className={errors.state ? "error" : ""} value={form.state} onChange={e => set("state", e.target.value)}>
                    <option value="">Select State</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.state && <span className="form-error">{errors.state}</span>}
                </div>

                <div className="form-group">
                  <label>Address Type</label>
                  <div className="address-type-options">
                    {["Home","Work","Other"].map(t => (
                      <button
                        key={t}
                        type="button"
                        className={`type-btn ${form.addressType === t ? "active" : ""}`}
                        onClick={() => set("addressType", t)}
                      >
                        {t === "Home" ? "🏠" : t === "Work" ? "🏢" : "📍"} {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-actions">
                  <button className="btn btn-secondary" onClick={() => setShowNewForm(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={handleContinue}>Save & Continue</button>
                </div>
              </div>
            )}
          </div>

          {/* ORDER SUMMARY SIDEBAR */}
          <div className="checkout-sidebar">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="divider" />
              <div className="checkout-items">
                {items.map(item => (
                  <div className="checkout-item" key={item.key}>
                    <img src={item.img} alt={item.name} />
                    <div>
                      <p className="checkout-item-name">{item.name}</p>
                      <p className="checkout-item-meta">Size: {item.size} &bull; Qty: {item.qty}</p>
                      <p className="price">₹{(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="divider" />
              <div className="summary-rows">
                <div className="summary-row"><span>Subtotal</span><span>₹{(total + discount).toLocaleString()}</span></div>
                <div className="summary-row discount"><span>Discount</span><span>− ₹{discount.toLocaleString()}</span></div>
                <div className="summary-row"><span>Delivery</span><span className={deliveryCharge === 0 ? "free" : ""}>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</span></div>
              </div>
              <div className="divider" />
              <div className="summary-row total"><span>Total</span><span>₹{finalTotal.toLocaleString()}</span></div>
              <p className="savings-text">You save ₹{discount.toLocaleString()} 🎉</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}