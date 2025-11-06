package com.zidio.controller;

import com.zidio.model.Job;
import com.zidio.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:5173")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    // 🔹 Test API
    @GetMapping("/test")
    public String testApi() {
        return "✅ JobController is working fine!";
    }


    // 🔹 Add new job
    @PostMapping("/add")
    public ResponseEntity<Job> addJob(@RequestBody Job job) {
        Job savedJob = jobRepository.save(job);
        return ResponseEntity.ok(savedJob);
    }

    // 🔹 Get all jobs
    @GetMapping("/all")
    public ResponseEntity<List<Job>> getAllJobs() {
        return ResponseEntity.ok(jobRepository.findAll());
    }

    // 🔹 Get job by ID
    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        return jobRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
