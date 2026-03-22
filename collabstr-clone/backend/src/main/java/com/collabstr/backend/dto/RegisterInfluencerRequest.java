package com.collabstr.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterInfluencerRequest {
    private String email;
    private String password;
    private String name;
    private String bio;
    private String niche;
    private String youtubeChannelHandle;
    private Integer instagramFollowers;
    private String platform;
    private Double hourlyRate;
}
