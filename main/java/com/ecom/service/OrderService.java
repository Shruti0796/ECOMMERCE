package com.ecommerce.service;

import com.ecommerce.model.*;
import java.util.List;
import java.util.UUID;

public class OrderService {
    public Order placeOrder(User user, CartService cartService) {
        List<CartItem> items = cartService.getCartItems();
        double total = cartService.getTotalAmount();
        String orderId = "ORD-" + UUID.randomUUID().toString().substring(0, 8);

        Order order = new Order(orderId, user, items, total);
        user.addOrder(order);

        cartService.clearCart();
        System.out.println("🎉 Order placed successfully! Order ID: " + orderId);
        return order;
    }
}