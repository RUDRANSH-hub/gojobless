package com.collabstr.backend.controller;

import com.collabstr.backend.service.YouTubeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.collabstr.backend.repository.UserRepository;
import com.collabstr.backend.entity.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/youtube")
@RequiredArgsConstructor
public class YouTubeController {

    private final YouTubeService youtubeService;
    private final UserRepository userRepository;

    @PostMapping("/sync")
    public ResponseEntity<?> syncYouTubeSubscribers() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(auth.getName()).orElseThrow();
        
        youtubeService.syncSubscribers(user.getId());
        
        return ResponseEntity.ok(Map.of("message", "YouTube subscribers synced successfully."));
    }
}
