package com.InstagramClone.Instagram_backend.controller;

import com.InstagramClone.Instagram_backend.model.Story;
import com.InstagramClone.Instagram_backend.model.User;
import com.InstagramClone.Instagram_backend.model.Profile;
import com.InstagramClone.Instagram_backend.repository.StoryRepository;
import com.InstagramClone.Instagram_backend.repository.UserRepository;
import com.InstagramClone.Instagram_backend.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/story")
public class StoryController {

    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @GetMapping
    public List<Story> getAllStories() {
        return storyRepository.findAll();
    }

    @PostMapping("/create/user/{userId}")
    public ResponseEntity<?> createStoryForUser(
            @PathVariable Long userId,
            @RequestParam("image") MultipartFile image) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) return ResponseEntity.badRequest().body("User not found");
        try {
            Story story = new Story();
            story.setUser(userOpt.get());
            story.setProfile(null);
            story.setTimestamp(LocalDateTime.now());
            story.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
            story.setImageType(image.getContentType());
            storyRepository.save(story);
            return ResponseEntity.ok(story);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/create/profile/{profileId}")
    public ResponseEntity<?> createStoryForProfile(
            @PathVariable Long profileId,
            @RequestParam("image") MultipartFile image) {
        Optional<Profile> profileOpt = profileRepository.findById(profileId);
        if (profileOpt.isEmpty()) return ResponseEntity.badRequest().body("Profile not found");
        try {
            Story story = new Story();
            story.setUser(null);
            story.setProfile(profileOpt.get());
            story.setTimestamp(LocalDateTime.now());
            story.setImage(Base64.getEncoder().encodeToString(image.getBytes()));
            story.setImageType(image.getContentType());
            storyRepository.save(story);
            return ResponseEntity.ok(story);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStoryById(@PathVariable Long id) {
        Optional<Story> story = storyRepository.findById(id);
        if (story.isPresent()) {
            return ResponseEntity.ok(story.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
