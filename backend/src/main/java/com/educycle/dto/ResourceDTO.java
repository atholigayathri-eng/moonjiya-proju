package com.educycle.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResourceDTO {
    private Long id;
    private Long userId;
    private String ownerName;
    private String title;
    private String description;
    private String category;
    private String condition;
    private String exchangeType;
    private Integer quantity;
    private String status;
    private String imageUrl;
}
