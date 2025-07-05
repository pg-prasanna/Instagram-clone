package com.InstagramClone.Instagram_backend.controller;

import com.InstagramClone.Instagram_backend.model.Profile;
import com.InstagramClone.Instagram_backend.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Optional;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    private ProfileRepository profileRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createProfile(
            @RequestParam("username") String username,
            @RequestParam("profilePhoto") MultipartFile profilePhoto) {

        try {
            Profile profile = new Profile();
            profile.setUsername(username);
            profile.setProfilePhoto(Base64.getEncoder().encodeToString(profilePhoto.getBytes()));
            profile.setProfilePhotoType(profilePhoto.getContentType());

            profileRepository.save(profile);
            return ResponseEntity.ok("Profile created with id " + profile.getId());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving profile: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profile> getProfileById(@PathVariable Long id) {
        Optional<Profile> profile = profileRepository.findById(id);
        return profile.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}

