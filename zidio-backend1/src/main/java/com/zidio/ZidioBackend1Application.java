package com.zidio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.zidio")
public class ZidioBackend1Application {
    public static void main(String[] args) {
        SpringApplication.run(ZidioBackend1Application.class, args);
        System.out.println("✅ Zidio backend is running...");
    }
}
