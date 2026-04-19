package com.ecommerce.repository;

import com.ecommerce.model.User;
import java.util.HashMap;
import java.util.Map;

public class UserRepository {
    private Map<String, User> users = new HashMap<>();

    public void save(User user) {
        users.put(user.getEmail(), user);
    }

    public User findByEmail(String email) {
        return users.get(email);
    }
}