package com.collabstr.backend.service;

import com.collabstr.backend.entity.InfluencerProfile;
import com.collabstr.backend.repository.InfluencerProfileRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.transaction.annotation.Transactional;

import java.net.URI;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class YouTubeService {

    @Value("${youtube.api.key}")
    private String apiKey;

    private final InfluencerProfileRepository influencerProfileRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Fetches the subscriber count from YouTube API and updates the influencer profile.
     */
    @Transactional
    public void syncSubscribers(UUID userProfileId) {
        InfluencerProfile profile = influencerProfileRepository.findByUserId(userProfileId)
                .orElseThrow(() -> new RuntimeException("Influencer profile not found"));

        if (profile.getYoutubeChannelHandle() == null || profile.getYoutubeChannelHandle().isEmpty()) {
            throw new RuntimeException("No YouTube handle associated with this profile");
        }

        try {
            String handle = profile.getYoutubeChannelHandle();
            if (handle.startsWith("@")) {
                handle = handle.substring(1);
            }

            String url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=@" 
                    + handle + "&key=" + apiKey;

            String response = restTemplate.getForObject(new URI(url), String.class);
            JsonNode root = objectMapper.readTree(response);

            if (root.has("items") && root.get("items").isArray() && root.get("items").size() > 0) {
                JsonNode stats = root.get("items").get(0).get("statistics");
                if (stats.has("subscriberCount")) {
                    int subs = stats.get("subscriberCount").asInt();
                    profile.setYoutubeSubscribers(subs);
                    influencerProfileRepository.save(profile);
                    log.info("Successfully updated YouTube subscribers for handle @{}: {}", handle, subs);
                    return;
                }
            }
            log.warn("Could not find subscriber count for handle @{}", handle);
            
        } catch (Exception e) {
            log.error("Error fetching YouTube subscribers", e);
            throw new RuntimeException("Failed to sync YouTube subscribers", e);
        }
    }
}
