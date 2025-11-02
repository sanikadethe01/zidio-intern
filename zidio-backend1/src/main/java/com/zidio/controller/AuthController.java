package com.zidio.controller;

import com.zidio.model.User;
import com.zidio.repository.UserRepository;
import com.zidio.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    // ---------- Register new user ----------
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User u) {
        if (u.getRole() == null) {
            u.setRole("STUDENT");
        }

        if (userRepository.findByEmail(u.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        User saved = userService.register(u);
        return ResponseEntity.ok(saved);
    }

    // ---------- Login ----------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        User loggedInUser = userService.login(req.getEmail(), req.getPassword());

        if (loggedInUser == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        return ResponseEntity.ok(loggedInUser);
    }

    // ---------- Inner class for login request ----------
    static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() {
            return email;
        }
        public void setEmail(String email) {
            this.email = email;
        }
        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
    }
}
