package com.educycle.entity;

import com.educycle.entity.enums.SkillLevel;
import com.educycle.entity.enums.SkillStatus;
import com.educycle.entity.enums.TeachingMethod;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "skills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "requests"})
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "skill_id")
    private Long skillId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @NotNull(message = "Tutor user is required")
    private User user;

    @NotBlank(message = "Skill name is required")
    @Column(name = "skill_name", nullable = false)
    private String skillName;

    @NotBlank(message = "Category is required")
    private String category;

    @Enumerated(EnumType.STRING)
    private SkillLevel level;

    @NotBlank(message = "Description is required")
    @Column(length = 2000, nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "teaching_method")
    private TeachingMethod teachingMethod;

    private String availability;

    @Builder.Default
    private Double rating = 0.0;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private SkillStatus status = SkillStatus.AVAILABLE;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "skill", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<SkillRequest> requests = new ArrayList<>();
}
