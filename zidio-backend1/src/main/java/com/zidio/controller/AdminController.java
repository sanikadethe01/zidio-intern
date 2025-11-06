package com.zidio.controller;

import com.zidio.model.User;
import com.zidio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> allUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/users/{id}/block")
    public String block(@PathVariable Long id) {
        // Simple simulation for demo
        return "User " + id + " blocked (simulate)";
    }
}
