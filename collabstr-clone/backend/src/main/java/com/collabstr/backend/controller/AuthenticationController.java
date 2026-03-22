package com.collabstr.backend.controller;

import com.collabstr.backend.dto.AuthenticationRequest;
import com.collabstr.backend.dto.AuthenticationResponse;
import com.collabstr.backend.dto.RegisterBrandRequest;
import com.collabstr.backend.dto.RegisterInfluencerRequest;
import com.collabstr.backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register/brand")
    public ResponseEntity<AuthenticationResponse> registerBrand(
            @RequestBody RegisterBrandRequest request
    ) {
        return ResponseEntity.ok(service.registerBrand(request));
    }

    @PostMapping("/register/influencer")
    public ResponseEntity<AuthenticationResponse> registerInfluencer(
            @RequestBody RegisterInfluencerRequest request
    ) {
        return ResponseEntity.ok(service.registerInfluencer(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}
