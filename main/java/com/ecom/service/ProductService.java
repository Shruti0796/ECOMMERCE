package com.ecommerce.service;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import java.util.List;
import java.util.stream.Collectors;

public class ProductService {
    private ProductRepository repo = new ProductRepository();

    public List<Product> getAllProducts() {
        return repo.getAllProducts();
    }

    public List<Product> searchProducts(String keyword) {
        return repo.getAllProducts().stream()
                .filter(p -> p.getName().toLowerCase().contains(keyword.toLowerCase()))
                .collect(Collectors.toList());
    }
}