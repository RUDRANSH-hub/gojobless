package com.collabstr.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "influencer_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InfluencerProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String bio;
    
    private String niche;
    private String youtubeChannelHandle;
    private Integer youtubeSubscribers;
    private Integer instagramFollowers;
    private String platform;
    private Double hourlyRate;
}
