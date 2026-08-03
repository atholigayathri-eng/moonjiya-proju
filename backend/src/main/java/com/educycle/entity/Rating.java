package com.educycle.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "ratings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Rating {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rating_id")
    private Long ratingId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewer_id", nullable = false)
    @NotNull(message = "Reviewer is required")
    private User reviewer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rated_user_id", nullable = false)
    @NotNull(message = "Rated user is required")
    private User ratedUser;

    @Column(name = "rating_type")
    private String ratingType; // "RESOURCE" or "SKILL"

    @Min(value = 1, message = "Rating score must be at least 1")
    @Max(value = 5, message = "Rating score cannot exceed 5")
    @NotNull(message = "Score is required")
    @Column(nullable = false)
    private Integer score;

    @Size(max = 1000, message = "Review cannot exceed 1000 characters")
    @Column(length = 1000)
    private String review;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
