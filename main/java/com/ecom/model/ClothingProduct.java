package com.ecommerce.model;

public class ClothingProduct extends Product {
    private String size;
    private String color;

    public ClothingProduct(String id, String name, double price, int stock, String size, String color) {
        super(id, name, price, stock);
        this.size = size;
        this.color = color;
    }

    @Override
    public String getCategory() {
        return "Clothing";
    }
}