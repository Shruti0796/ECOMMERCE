package com.ecommerce.model;

import java.util.ArrayList;
import java.util.List;

public class User {
    private String userId;
    private String name;
    private String email;
    private String password;
    private List<Order> orders = new ArrayList<>();

    // Constructor
    public User(String userId, String name, String email, String password) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    // Getters & Setters (Encapsulation)
    public String getUserId() { return userId; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public List<Order> getOrders() { return orders; }

    public void addOrder(Order order) {
        orders.add(order);
    }
}