package com.educycle.service;

import com.educycle.dto.RequestDisplayDTO;
import com.educycle.dto.ResourceExchangeRequestDTO;
import com.educycle.dto.SkillExchangeRequestDTO;
import com.educycle.entity.*;
import com.educycle.entity.enums.RequestStatus;
import com.educycle.repository.*;
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
    private ResourceRepository resourceRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserRepository userRepository;

    public ResourceRequest createResourceRequestFromDTO(ResourceExchangeRequestDTO dto) {
        Long resId = dto.getResourceId();
        Resource resource = resourceRepository.findById(resId)
                .orElseThrow(() -> new RuntimeException("Resource not found with ID: " + resId));

        User owner = resource.getUser();
        if (owner == null) {
            throw new RuntimeException("Resource owner is not set.");
        }

        Long reqId = dto.getRequesterId() != null ? dto.getRequesterId() : 1L;
        User requester = userRepository.findById(reqId).orElseGet(() -> {
            return userRepository.findAll().stream().findFirst().orElseThrow(() -> new RuntimeException("No users found"));
        });

        ResourceRequest req = new ResourceRequest();
        req.setResource(resource);
        req.setOwner(owner);
        req.setRequester(requester);
        req.setMessage(dto.getMessage());
        req.setStatus(RequestStatus.PENDING);

        return resourceRequestRepository.save(req);
    }

    public SkillRequest createSkillRequestFromDTO(SkillExchangeRequestDTO dto) {
        Long sId = dto.getSkillId();
        Skill skill = skillRepository.findById(sId)
                .orElseThrow(() -> new RuntimeException("Skill not found with ID: " + sId));

        User tutor = skill.getUser();
        if (tutor == null) {
            throw new RuntimeException("Skill tutor is not set.");
        }

        Long lId = dto.getLearnerId() != null ? dto.getLearnerId() : 1L;
        User learner = userRepository.findById(lId).orElseGet(() -> {
            return userRepository.findAll().stream().findFirst().orElseThrow(() -> new RuntimeException("No users found"));
        });

        SkillRequest req = new SkillRequest();
        req.setSkill(skill);
        req.setTutor(tutor);
        req.setLearner(learner);
        req.setMessage(dto.getMessage());
        req.setPreferredSchedule(dto.getPreferredSchedule());
        req.setStatus(RequestStatus.PENDING);

        return skillRequestRepository.save(req);
    }

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

    public List<RequestDisplayDTO> getMyIncomingRequests(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        List<RequestDisplayDTO> incoming = new ArrayList<>();
        if (user != null) {
            for (ResourceRequest rr : resourceRequestRepository.findByOwner(user)) {
                incoming.add(RequestDisplayDTO.fromResourceRequest(rr));
            }
            for (SkillRequest sr : skillRequestRepository.findByTutor(user)) {
                incoming.add(RequestDisplayDTO.fromSkillRequest(sr));
            }
        }
        return incoming;
    }

    public List<RequestDisplayDTO> getMySentRequests(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        List<RequestDisplayDTO> sent = new ArrayList<>();
        if (user != null) {
            for (ResourceRequest rr : resourceRequestRepository.findByRequester(user)) {
                sent.add(RequestDisplayDTO.fromResourceRequest(rr));
            }
            for (SkillRequest sr : skillRequestRepository.findByLearner(user)) {
                sent.add(RequestDisplayDTO.fromSkillRequest(sr));
            }
        }
        return sent;
    }
}
