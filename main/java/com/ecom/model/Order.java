package com.ecommerce.model;

import java.time.LocalDateTime;
import java.util.List;

public class Order {
    private String orderId;
    private User user;
    private List<CartItem> items;
    private double totalAmount;
    private LocalDateTime orderDate;

    public Order(String orderId, User user, List<CartItem> items, double totalAmount) {
        this.orderId = orderId;
        this.user = user;
        this.items = items;
        this.totalAmount = totalAmount;
        this.orderDate = LocalDateTime.now();
    }

    // Getters
    public String getOrderId() { return orderId; }
    public double getTotalAmount() { return totalAmount; }
    public LocalDateTime getOrderDate() { return orderDate; }
}