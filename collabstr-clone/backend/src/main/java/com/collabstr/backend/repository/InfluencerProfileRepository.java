package com.collabstr.backend.repository;

import com.collabstr.backend.entity.InfluencerProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface InfluencerProfileRepository extends JpaRepository<InfluencerProfile, UUID> {
    Optional<InfluencerProfile> findByUserId(UUID userId);
    List<InfluencerProfile> findByNicheContainingIgnoreCase(String niche);
    List<InfluencerProfile> findByYoutubeSubscribersGreaterThanEqual(Integer minSubscribers);
    List<InfluencerProfile> findByNicheContainingIgnoreCaseAndYoutubeSubscribersGreaterThanEqual(String niche, Integer minSubscribers);
}
