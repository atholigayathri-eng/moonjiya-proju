package com.educycle.controller;

import com.educycle.dto.RequestDisplayDTO;
import com.educycle.dto.ResourceExchangeRequestDTO;
import com.educycle.dto.SkillExchangeRequestDTO;
import com.educycle.entity.ResourceRequest;
import com.educycle.entity.SkillRequest;
import com.educycle.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @PostMapping("/resource-requests")
    public ResponseEntity<ResourceRequest> createResourceRequest(@RequestBody ResourceExchangeRequestDTO requestDTO) {
        return ResponseEntity.ok(requestService.createResourceRequestFromDTO(requestDTO));
    }

    @GetMapping("/resource-requests/{id}")
    public ResponseEntity<ResourceRequest> getResourceRequest(@PathVariable Long id) {
        return requestService.getResourceRequest(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/resource-requests/{id}")
    public ResponseEntity<ResourceRequest> updateResourceRequestStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String status = payload.get("status");
        return ResponseEntity.ok(requestService.updateResourceRequestStatus(id, status));
    }

    @DeleteMapping("/resource-requests/{id}")
    public ResponseEntity<Void> cancelResourceRequest(@PathVariable Long id) {
        requestService.cancelResourceRequest(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/skill-requests")
    public ResponseEntity<SkillRequest> createSkillRequest(@RequestBody SkillExchangeRequestDTO requestDTO) {
        return ResponseEntity.ok(requestService.createSkillRequestFromDTO(requestDTO));
    }

    @GetMapping("/skill-requests/{id}")
    public ResponseEntity<SkillRequest> getSkillRequest(@PathVariable Long id) {
        return requestService.getSkillRequest(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/skill-requests/{id}")
    public ResponseEntity<SkillRequest> updateSkillRequestStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        String status = payload.get("status");
        return ResponseEntity.ok(requestService.updateSkillRequestStatus(id, status));
    }

    @DeleteMapping("/skill-requests/{id}")
    public ResponseEntity<Void> cancelSkillRequest(@PathVariable Long id) {
        requestService.cancelSkillRequest(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/my-requests")
    public ResponseEntity<List<RequestDisplayDTO>> getMyIncomingRequests(@RequestParam(required = false) Long userId) {
        Long targetId = userId != null ? userId : 1L;
        return ResponseEntity.ok(requestService.getMyIncomingRequests(targetId));
    }

    @GetMapping("/my-sent-requests")
    public ResponseEntity<List<RequestDisplayDTO>> getMySentRequests(@RequestParam(required = false) Long userId) {
        Long targetId = userId != null ? userId : 1L;
        return ResponseEntity.ok(requestService.getMySentRequests(targetId));
    }
}
