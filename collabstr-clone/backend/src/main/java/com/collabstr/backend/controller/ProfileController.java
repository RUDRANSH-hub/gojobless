package com.collabstr.backend.controller;

import com.collabstr.backend.entity.BrandProfile;
import com.collabstr.backend.entity.InfluencerProfile;
import com.collabstr.backend.entity.Role;
import com.collabstr.backend.entity.User;
import com.collabstr.backend.repository.BrandProfileRepository;
import com.collabstr.backend.repository.InfluencerProfileRepository;
import com.collabstr.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final UserRepository userRepository;
    private final BrandProfileRepository brandProfileRepository;
    private final InfluencerProfileRepository influencerProfileRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentProfile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        
        if (user.getRole() == Role.BRAND) {
            return ResponseEntity.ok(brandProfileRepository.findByUserId(user.getId()).orElse(null));
        } else {
            return ResponseEntity.ok(influencerProfileRepository.findByUserId(user.getId()).orElse(null));
        }
    }

    @PutMapping("/brand")
    public ResponseEntity<BrandProfile> updateBrandProfile(@RequestBody BrandProfile updatedProfile) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();

        BrandProfile profile = brandProfileRepository.findByUserId(user.getId()).orElseThrow();
        profile.setCompanyName(updatedProfile.getCompanyName());
        profile.setNiche(updatedProfile.getNiche());
        profile.setDescription(updatedProfile.getDescription());
        profile.setWebsiteUrl(updatedProfile.getWebsiteUrl());

        return ResponseEntity.ok(brandProfileRepository.save(profile));
    }

    @PutMapping("/influencer")
    public ResponseEntity<InfluencerProfile> updateInfluencerProfile(@RequestBody InfluencerProfile updatedProfile) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();

        InfluencerProfile profile = influencerProfileRepository.findByUserId(user.getId()).orElseThrow();
        profile.setName(updatedProfile.getName());
        profile.setBio(updatedProfile.getBio());
        profile.setNiche(updatedProfile.getNiche());
        profile.setYoutubeChannelHandle(updatedProfile.getYoutubeChannelHandle());
        profile.setInstagramFollowers(updatedProfile.getInstagramFollowers());
        profile.setPlatform(updatedProfile.getPlatform());
        profile.setHourlyRate(updatedProfile.getHourlyRate());

        return ResponseEntity.ok(influencerProfileRepository.save(profile));
    }
}
