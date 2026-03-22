package com.collabstr.backend.repository;

import com.collabstr.backend.entity.BrandProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BrandProfileRepository extends JpaRepository<BrandProfile, UUID> {
    Optional<BrandProfile> findByUserId(UUID userId);
    List<BrandProfile> findByNicheContainingIgnoreCase(String niche);
}
