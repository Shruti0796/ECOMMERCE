package com.ecommerce.service;

import com.ecommerce.model.CartItem;
import com.ecommerce.model.Product;
import java.util.ArrayList;
import java.util.List;

public class CartService {
    private List<CartItem> cart = new ArrayList<>();

    public void addToCart(Product product, int quantity) {
        cart.add(new CartItem(product, quantity));
        product.reduceStock(quantity);
        System.out.println("✅ Added to cart!");
    }

    public List<CartItem> getCartItems() {
        return cart;
    }

    public double getTotalAmount() {
        return cart.stream().mapToDouble(CartItem::getTotalPrice).sum();
    }

    public void clearCart() {
        cart.clear();
    }
}