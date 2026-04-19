import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import OrderConfirmPage from "./pages/OrderConfirmPage";
import WishlistPage from "./pages/WishlistPage";
import SearchPage from "./pages/SearchPage";
import "./styles/global.css";

export default function App() {
  const [page, setPage] = useState("home");
  const [pageParams, setPageParams] = useState({});

  const navigate = (to, params = {}) => {
    setPage(to);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (page) {
      case "home":          return <HomePage navigate={navigate} />;
      case "category":      return <CategoryPage navigate={navigate} params={pageParams} />;
      case "product":       return <ProductPage navigate={navigate} params={pageParams} />;
      case "cart":          return <CartPage navigate={navigate} />;
      case "checkout":      return <CheckoutPage navigate={navigate} />;
      case "payment":       return <PaymentPage navigate={navigate} params={pageParams} />;
      case "order-confirm": return <OrderConfirmPage navigate={navigate} params={pageParams} />;
      case "wishlist":      return <WishlistPage navigate={navigate} />;
      case "search":        return <SearchPage navigate={navigate} params={pageParams} />;
      default:              return <HomePage navigate={navigate} />;
    }
  };

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="app">
          <Navbar navigate={navigate} currentPage={page} />
          <main className="main-content">{renderPage()}</main>
          <Footer navigate={navigate} />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}