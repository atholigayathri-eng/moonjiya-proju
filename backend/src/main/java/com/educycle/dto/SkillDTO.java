package com.educycle.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SkillDTO {
    private Long id;
    private Long userId;
    private String tutorName;
    private String skillName;
    private String category;
    private String level;
    private String description;
    private String teachingMethod;
    private String availability;
    private Double rating;
}
