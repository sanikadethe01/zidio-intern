package com.zidio.service;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zidio.model.User;
import com.zidio.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Register new user
    public User register(User user) {
        // Optional check: avoid duplicate emails
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        return userRepository.save(user);
    }

    // ✅ Proper login logic
    public Optional<User> login(String email, String password) {
        Optional<User> foundUser = userRepository.findByEmail(email);
        if (foundUser.isPresent()) {
            User user = foundUser.get();
            if (user.getPassword().equals(password)) {
                return Optional.of(user); // ✅ Return this exact user
            }
        }
        return Optional.empty(); // ❌ Wrong email or password
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
