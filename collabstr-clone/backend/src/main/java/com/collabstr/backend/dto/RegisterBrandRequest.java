package com.collabstr.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterBrandRequest {
    private String email;
    private String password;
    private String companyName;
    private String niche;
    private String description;
    private String websiteUrl;
}
