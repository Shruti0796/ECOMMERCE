package com.ecommerce.repository;

import com.ecommerce.model.*;

import java.util.ArrayList;
import java.util.List;

public class ProductRepository {
    private List<Product> products = new ArrayList<>();

    public ProductRepository() {
        // Sample data
        products.add(new ElectronicsProduct("E001", "Samsung Galaxy S24", 79999, 10, "Samsung", "1 Year"));
        products.add(new ElectronicsProduct("E002", "Sony Headphones", 2999, 15, "Sony", "6 Months"));
        products.add(new ClothingProduct("C001", "Nike T-Shirt", 1499, 20, "L", "Black"));
        products.add(new ClothingProduct("C002", "Levi's Jeans", 2499, 8, "32", "Blue"));
    }

    public List<Product> getAllProducts() { return products; }

    public Product findById(String id) {
        return products.stream().filter(p -> p.getProductId().equals(id)).findFirst().orElse(null);
    }
}