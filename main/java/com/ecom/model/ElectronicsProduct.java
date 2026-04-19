package com.ecommerce.model;

public class ElectronicsProduct extends Product {
    private String brand;
    private String warranty;

    public ElectronicsProduct(String id, String name, double price, int stock, String brand, String warranty) {
        super(id, name, price, stock);
        this.brand = brand;
        this.warranty = warranty;
    }

    @Override
    public String getCategory() {
        return "Electronics";
    }

    public String getBrand() { return brand; }
}