package com.educycle.service;

import com.educycle.entity.ResourceRequest;
import com.educycle.entity.SkillRequest;
import com.educycle.entity.User;
import com.educycle.entity.enums.RequestStatus;
import com.educycle.repository.ResourceRequestRepository;
import com.educycle.repository.SkillRequestRepository;
import com.educycle.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RequestService {

    @Autowired
    private ResourceRequestRepository resourceRequestRepository;

    @Autowired
    private SkillRequestRepository skillRequestRepository;

    @Autowired
    private UserRepository userRepository;

    public ResourceRequest createResourceRequest(ResourceRequest request) {
        return resourceRequestRepository.save(request);
    }

    public Optional<ResourceRequest> getResourceRequest(Long id) {
        return resourceRequestRepository.findById(id);
    }

    public ResourceRequest updateResourceRequestStatus(Long id, String statusStr) {
        ResourceRequest req = resourceRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource request not found"));
        try {
            req.setStatus(RequestStatus.valueOf(statusStr.toUpperCase()));
        } catch (IllegalArgumentException ignored) {}
        return resourceRequestRepository.save(req);
    }

    public void cancelResourceRequest(Long id) {
        resourceRequestRepository.deleteById(id);
    }

    public SkillRequest createSkillRequest(SkillRequest request) {
        return skillRequestRepository.save(request);
    }

    public Optional<SkillRequest> getSkillRequest(Long id) {
        return skillRequestRepository.findById(id);
    }

    public SkillRequest updateSkillRequestStatus(Long id, String statusStr) {
        SkillRequest req = skillRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Skill request not found"));
        try {
            req.setStatus(RequestStatus.valueOf(statusStr.toUpperCase()));
        } catch (IllegalArgumentException ignored) {}
        return skillRequestRepository.save(req);
    }

    public void cancelSkillRequest(Long id) {
        skillRequestRepository.deleteById(id);
    }

    public List<Object> getMyIncomingRequests(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        List<Object> incoming = new ArrayList<>();
        if (user != null) {
            incoming.addAll(resourceRequestRepository.findByOwner(user));
            incoming.addAll(skillRequestRepository.findByTutor(user));
        }
        return incoming;
    }

    public List<Object> getMySentRequests(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        List<Object> sent = new ArrayList<>();
        if (user != null) {
            sent.addAll(resourceRequestRepository.findByRequester(user));
            sent.addAll(skillRequestRepository.findByLearner(user));
        }
        return sent;
    }
}
