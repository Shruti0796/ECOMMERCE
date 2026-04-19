package com.ecommerce.service;

public interface PaymentService {
    boolean processPayment(double amount, String userEmail);
}