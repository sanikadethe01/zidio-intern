package com.zidio.service;

import com.zidio.model.JobApplication;
import com.zidio.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    // Apply for a job
    public JobApplication applyForJob(JobApplication jobApplication) {
        return applicationRepository.save(jobApplication);
    }

    // Get all applications for a specific job
    public List<JobApplication> getApplicationsByJobId(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    // Get all applications submitted by a specific student
    public List<JobApplication> getApplicationsByStudentId(Long studentId) {
        return applicationRepository.findByStudentId(studentId);
    }
}
