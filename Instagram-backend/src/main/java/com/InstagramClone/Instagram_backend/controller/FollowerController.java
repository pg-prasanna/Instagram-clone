package com.InstagramClone.Instagram_backend.controller;

import com.InstagramClone.Instagram_backend.model.Follower;
import com.InstagramClone.Instagram_backend.model.Profile;
import com.InstagramClone.Instagram_backend.repository.FollowerRepository;
import com.InstagramClone.Instagram_backend.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/followers")
public class FollowerController {

    @Autowired
    private FollowerRepository followerRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @PostMapping("/add")
    public ResponseEntity<String> addFollower(@RequestBody Map<String, String> payload) {
        Long profileId = Long.parseLong(payload.get("profileId")); // should be 1
        String username = payload.get("username");
        String photo = payload.get("profilePhoto");
        String type = payload.get("profilePhotoType");

        Optional<Profile> profile = profileRepository.findById(profileId);

        if (profile.isPresent()) {
            Follower follower = new Follower();
            follower.setFollower(profile.get());
            follower.setUsername(username);
            follower.setProfilePhoto(photo);
            follower.setProfilePhotoType(type);

            followerRepository.save(follower);
            return ResponseEntity.ok("Follower added");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profile not found");
        }
    }

    @GetMapping("/{profileId}")
    public ResponseEntity<?> getFollowersByProfileId(@PathVariable Long profileId) {
        Optional<Profile> profile = profileRepository.findById(profileId);
        if (profile.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profile not found");
        }
        // Find all followers where follower.profile.id == profileId
        return ResponseEntity.ok(
            followerRepository.findAll().stream()
                .filter(f -> f.getFollower() != null && f.getFollower().getId().equals(profileId))
                .toList()
        );
    }

    @DeleteMapping("/{followerId}")
    public ResponseEntity<String> deleteFollower(@PathVariable Long followerId) {
        if (!followerRepository.existsById(followerId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Follower not found");
        }
        followerRepository.deleteById(followerId);
        return ResponseEntity.ok("Follower deleted");
    }
}

