package com.educycle.entity;

import com.educycle.entity.enums.NotificationType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notif_id")
    private Long notifId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @NotNull(message = "User reference is required")
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull(message = "Notification type is required")
    private NotificationType type;

    @Column(name = "related_id")
    private Long relatedId;

    @NotBlank(message = "Message text is required")
    @Column(nullable = false)
    private String message;

    @Builder.Default
    @Column(name = "is_read")
    private Boolean read = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
