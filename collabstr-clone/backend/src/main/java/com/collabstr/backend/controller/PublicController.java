package com.collabstr.backend.controller;

import com.collabstr.backend.entity.BrandProfile;
import com.collabstr.backend.entity.InfluencerProfile;
import com.collabstr.backend.entity.User;
import com.collabstr.backend.repository.BrandProfileRepository;
import com.collabstr.backend.repository.InfluencerProfileRepository;
import com.collabstr.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final BrandProfileRepository brandProfileRepository;
    private final InfluencerProfileRepository influencerProfileRepository;
    private final UserRepository userRepository;

    @GetMapping("/influencers")
    public ResponseEntity<List<InfluencerProfile>> getInfluencers(
            @RequestParam(required = false) String niche,
            @RequestParam(required = false) Integer minSubs
    ) {
        if (niche != null && minSubs != null) {
            return ResponseEntity.ok(influencerProfileRepository.findByNicheContainingIgnoreCaseAndYoutubeSubscribersGreaterThanEqual(niche, minSubs));
        } else if (niche != null) {
            return ResponseEntity.ok(influencerProfileRepository.findByNicheContainingIgnoreCase(niche));
        } else if (minSubs != null) {
            return ResponseEntity.ok(influencerProfileRepository.findByYoutubeSubscribersGreaterThanEqual(minSubs));
        }
        return ResponseEntity.ok(influencerProfileRepository.findAll());
    }

    @GetMapping("/influencers/{id}")
    public ResponseEntity<InfluencerProfile> getInfluencerById(@PathVariable UUID id) {
        return influencerProfileRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/brands")
    public ResponseEntity<List<BrandProfile>> getBrands(
            @RequestParam(required = false) String niche
    ) {
        if (niche != null) {
            return ResponseEntity.ok(brandProfileRepository.findByNicheContainingIgnoreCase(niche));
        }
        return ResponseEntity.ok(brandProfileRepository.findAll());
    }

    @GetMapping("/brands/{id}")
    public ResponseEntity<BrandProfile> getBrandById(@PathVariable UUID id) {
        return brandProfileRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
