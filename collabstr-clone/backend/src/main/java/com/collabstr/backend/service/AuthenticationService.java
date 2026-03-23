package com.collabstr.backend.service;

import com.collabstr.backend.dto.AuthenticationRequest;
import com.collabstr.backend.dto.AuthenticationResponse;
import com.collabstr.backend.dto.RegisterBrandRequest;
import com.collabstr.backend.dto.RegisterInfluencerRequest;
import com.collabstr.backend.entity.BrandProfile;
import com.collabstr.backend.entity.InfluencerProfile;
import com.collabstr.backend.entity.Role;
import com.collabstr.backend.entity.User;
import com.collabstr.backend.repository.BrandProfileRepository;
import com.collabstr.backend.repository.InfluencerProfileRepository;
import com.collabstr.backend.repository.UserRepository;
import com.collabstr.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.concurrent.Executors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {

    private final UserRepository userRepository;
    private final BrandProfileRepository brandProfileRepository;
    private final InfluencerProfileRepository influencerProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final YouTubeService youTubeService;

    @Transactional
    public AuthenticationResponse registerBrand(RegisterBrandRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.BRAND)
                .build();
        userRepository.save(user);

        var brandProfile = BrandProfile.builder()
                .user(user)
                .companyName(request.getCompanyName())
                .niche(request.getNiche())
                .description(request.getDescription())
                .websiteUrl(request.getWebsiteUrl())
                .build();
        brandProfileRepository.save(brandProfile);

        var springUser = org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
        var jwtToken = jwtService.generateToken(springUser);
        
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole().name())
                .email(user.getEmail())
                .build();
    }

    @Transactional
    public AuthenticationResponse registerInfluencer(RegisterInfluencerRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        var user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.INFLUENCER)
                .build();
        userRepository.save(user);

        var influencerProfile = InfluencerProfile.builder()
                .user(user)
                .name(request.getName())
                .bio(request.getBio())
                .niche(request.getNiche())
                .youtubeChannelHandle(request.getYoutubeChannelHandle())
                .instagramFollowers(request.getInstagramFollowers())
                .platform(request.getPlatform())
                .hourlyRate(request.getHourlyRate())
                // Default to 0, will be updated asynchronously
                .youtubeSubscribers(0) 
                .build();
        influencerProfileRepository.save(influencerProfile);

        // Asynchronously fetch subscriber count so it doesn't block registration or fail the transaction
        if (request.getYoutubeChannelHandle() != null && !request.getYoutubeChannelHandle().isEmpty()) {
            Executors.newSingleThreadExecutor().submit(() -> {
                try {
                    youTubeService.syncSubscribers(user.getId());
                } catch (Exception e) {
                    log.error("Failed to sync YouTube subscribers during registration for user {}", user.getId(), e);
                }
            });
        }

        var springUser = org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
        var jwtToken = jwtService.generateToken(springUser);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole().name())
                .email(user.getEmail())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        
        var springUser = org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole().name())
                .build();
                
        var jwtToken = jwtService.generateToken(springUser);
        
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(user.getRole().name())
                .email(user.getEmail())
                .build();
    }
}
