import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [address, setAddress] = useState(null);

  const addToCart = (product, size, qty = 1) => {
    setItems(prev => {
      const key = `${product.id}-${size}`;
      const existing = prev.find(i => i.key === key);
      if (existing) return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, size, qty, key }];
    });
  };

  const removeFromCart = (key) => setItems(prev => prev.filter(i => i.key !== key));

  const updateQty = (key, qty) => {
    if (qty < 1) return removeFromCart(key);
    setItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const discount = items.reduce((sum, i) => sum + (i.originalPrice - i.price) * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, total, count, discount, address, setAddress }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);