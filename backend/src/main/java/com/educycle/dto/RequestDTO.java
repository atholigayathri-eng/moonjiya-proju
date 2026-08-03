package com.educycle.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestDTO {
    private Long id;
    private Long itemId;
    private Long requesterId;
    private String requesterName;
    private Long ownerId;
    private String ownerName;
    private String message;
    private String status;
    private String scheduledDate;
}
