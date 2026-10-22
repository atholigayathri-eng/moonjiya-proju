package com.educycle.controller;

import com.educycle.repository.ResourceRepository;
import com.educycle.repository.SkillRepository;
import com.educycle.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private SkillRepository skillRepository;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getLivePlatformStats() {
        Map<String, Object> stats = new HashMap<>();

        long usersCount = userRepository.count();
        long totalResources = resourceRepository.count();
        long approvedResources = resourceRepository.countByApproved(true);
        long totalSkills = skillRepository.count();
        long approvedSkills = skillRepository.countByApproved(true);

        // Active students registered on the platform
        stats.put("activeStudents", usersCount);
        stats.put("totalUsers", usersCount);

        // Resources shared
        stats.put("resourcesShared", approvedResources > 0 ? approvedResources : totalResources);
        stats.put("totalResources", totalResources);
        stats.put("approvedResources", approvedResources);

        // Skills offered
        stats.put("skillsOffered", approvedSkills > 0 ? approvedSkills : totalSkills);
        stats.put("skillSessions", approvedSkills > 0 ? approvedSkills : totalSkills);
        stats.put("totalSkills", totalSkills);
        stats.put("approvedSkills", approvedSkills);

        return ResponseEntity.ok(stats);
    }
}
