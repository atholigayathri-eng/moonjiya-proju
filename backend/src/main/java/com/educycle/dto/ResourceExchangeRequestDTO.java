package com.educycle.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

public class ResourceExchangeRequestDTO {
    @JsonAlias({"itemId", "resourceId", "id"})
    private Long resourceId;

    @JsonAlias({"userId", "requesterId"})
    private Long requesterId;

    private String message;

    public ResourceExchangeRequestDTO() {
    }

    public Long getResourceId() {
        return resourceId;
    }

    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }

    public Long getRequesterId() {
        return requesterId;
    }

    public void setRequesterId(Long requesterId) {
        this.requesterId = requesterId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
