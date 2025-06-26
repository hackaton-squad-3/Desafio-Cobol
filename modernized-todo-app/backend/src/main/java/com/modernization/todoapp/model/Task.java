package com.modernization.todoapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Column(length = 100)
    private String title;

    @Size(max = 1000)
    @Column(length = 1000)
    private String description;

    @NotNull
    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @ManyToOne
    @JoinColumn(name = "assignee_id", nullable = false)
    private User assignee;

    @Size(max = 100)
    @Column(length = 100)
    private String tags;

    @Min(1)
    @Max(3)
    private Integer priority;

    @NotBlank
    @Column(length = 20)
    private String status;

    private LocalDateTime creationDateTime;

    private LocalDateTime updateDateTime;

    @PrePersist
    protected void onCreate() {
        creationDateTime = LocalDateTime.now();
        updateDateTime = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updateDateTime = LocalDateTime.now();
    }
}
