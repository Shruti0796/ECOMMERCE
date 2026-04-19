package com.ecommerce.model;

public abstract class Product {   // Abstract class → Abstraction
    private String productId;
    private String name;
    private double price;
    private int stock;

    public Product(String productId, String name, double price, int stock) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    // Encapsulation
    public String getProductId() { return productId; }
    public String getName() { return name; }
    public double getPrice() { return price; }
    public int getStock() { return stock; }

    public void reduceStock(int quantity) {
        if (quantity <= stock) stock -= quantity;
    }

    // Abstract method → forces subclasses to implement (Polymorphism)
    public abstract String getCategory();
}