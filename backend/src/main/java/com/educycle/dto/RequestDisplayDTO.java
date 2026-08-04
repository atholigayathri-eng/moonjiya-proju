package com.educycle.dto;

import com.educycle.entity.ResourceRequest;
import com.educycle.entity.SkillRequest;

import java.time.LocalDateTime;

public class RequestDisplayDTO {
    private Long id;
    private String type; // "resource" or "skill"
    private Long itemId;
    private String itemTitle;
    private Long requesterId;
    private String requesterName;
    private Long ownerId;
    private String ownerName;
    private String status;
    private String message;
    private String preferredSchedule;
    private LocalDateTime createdAt;

    public RequestDisplayDTO() {
    }

    public static RequestDisplayDTO fromResourceRequest(ResourceRequest req) {
        RequestDisplayDTO dto = new RequestDisplayDTO();
        dto.setId(req.getRequestId());
        dto.setType("resource");
        if (req.getResource() != null) {
            dto.setItemId(req.getResource().getResourceId());
            dto.setItemTitle(req.getResource().getTitle());
        }
        if (req.getRequester() != null) {
            dto.setRequesterId(req.getRequester().getUserId());
            String name = (req.getRequester().getFirstName() != null ? req.getRequester().getFirstName() : "") + " " +
                          (req.getRequester().getLastName() != null ? req.getRequester().getLastName() : "");
            dto.setRequesterName(name.trim().isEmpty() ? req.getRequester().getEmail() : name.trim());
        }
        if (req.getOwner() != null) {
            dto.setOwnerId(req.getOwner().getUserId());
            String name = (req.getOwner().getFirstName() != null ? req.getOwner().getFirstName() : "") + " " +
                          (req.getOwner().getLastName() != null ? req.getOwner().getLastName() : "");
            dto.setOwnerName(name.trim().isEmpty() ? req.getOwner().getEmail() : name.trim());
        }
        dto.setStatus(req.getStatus() != null ? req.getStatus().name() : "PENDING");
        dto.setMessage(req.getMessage());
        dto.setCreatedAt(req.getCreatedAt());
        return dto;
    }

    public static RequestDisplayDTO fromSkillRequest(SkillRequest req) {
        RequestDisplayDTO dto = new RequestDisplayDTO();
        dto.setId(req.getRequestId());
        dto.setType("skill");
        if (req.getSkill() != null) {
            dto.setItemId(req.getSkill().getSkillId());
            dto.setItemTitle(req.getSkill().getSkillName());
        }
        if (req.getLearner() != null) {
            dto.setRequesterId(req.getLearner().getUserId());
            String name = (req.getLearner().getFirstName() != null ? req.getLearner().getFirstName() : "") + " " +
                          (req.getLearner().getLastName() != null ? req.getLearner().getLastName() : "");
            dto.setRequesterName(name.trim().isEmpty() ? req.getLearner().getEmail() : name.trim());
        }
        if (req.getTutor() != null) {
            dto.setOwnerId(req.getTutor().getUserId());
            String name = (req.getTutor().getFirstName() != null ? req.getTutor().getFirstName() : "") + " " +
                          (req.getTutor().getLastName() != null ? req.getTutor().getLastName() : "");
            dto.setOwnerName(name.trim().isEmpty() ? req.getTutor().getEmail() : name.trim());
        }
        dto.setStatus(req.getStatus() != null ? req.getStatus().name() : "PENDING");
        dto.setMessage(req.getMessage());
        dto.setPreferredSchedule(req.getPreferredSchedule());
        dto.setCreatedAt(req.getCreatedAt());
        return dto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public String getItemTitle() {
        return itemTitle;
    }

    public void setItemTitle(String itemTitle) {
        this.itemTitle = itemTitle;
    }

    public Long getRequesterId() {
        return requesterId;
    }

    public void setRequesterId(Long requesterId) {
        this.requesterId = requesterId;
    }

    public String getRequesterName() {
        return requesterName;
    }

    public void setRequesterName(String requesterName) {
        this.requesterName = requesterName;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPreferredSchedule() {
        return preferredSchedule;
    }

    public void setPreferredSchedule(String preferredSchedule) {
        this.preferredSchedule = preferredSchedule;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
