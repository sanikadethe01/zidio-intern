package com.zidio.controller;

import com.zidio.model.JobApplication;
import com.zidio.repository.ApplicationRepository;
import com.zidio.repository.JobRepository;
import com.zidio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationRepository appRepo;

    @Autowired
    private JobRepository jobRepo;

    @Autowired
    private UserRepository userRepo;

    // ---------------- Apply for a job ----------------
    @PostMapping("/apply")
    public ResponseEntity<?> apply(@RequestHeader("X-USER-ID") Long studentId,
                                   @RequestParam Long jobId) {

        var userOpt = userRepo.findById(studentId);
        if (userOpt.isEmpty()) return ResponseEntity.badRequest().body("Invalid user");

        var jobOpt = jobRepo.findById(jobId);
        if (jobOpt.isEmpty()) return ResponseEntity.badRequest().body("Invalid jobId");

        JobApplication application = JobApplication.builder()
                .jobId(jobId)
                .studentId(studentId)
                .studentName(userOpt.get().getName())
                .status("APPLIED")
                .build();

        JobApplication savedApplication = appRepo.save(application);
        return ResponseEntity.ok(savedApplication);
    }

    // ---------------- Get all applications by student ----------------
    @GetMapping("/by-student/{studentId}")
    public ResponseEntity<List<JobApplication>> byStudent(@PathVariable Long studentId) {
        List<JobApplication> applications = appRepo.findByStudentId(studentId);
        if (applications.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(applications);
    }

    // ---------------- Get all applications by job ----------------
    @GetMapping("/by-job/{jobId}")
    public ResponseEntity<List<JobApplication>> byJob(@PathVariable Long jobId) {
        List<JobApplication> applications = appRepo.findByJobId(jobId);
        if (applications.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(applications);
    }

    // ---------------- Update status ----------------
    @PostMapping("/{id}/update-status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
        var opt = appRepo.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();
        var app = opt.get();
        app.setStatus(status);
        return ResponseEntity.ok(appRepo.save(app));
    }
}
