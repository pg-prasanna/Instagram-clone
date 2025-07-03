package com.InstagramClone.Instagram_backend.controller;

import com.InstagramClone.Instagram_backend.model.User;
import com.InstagramClone.Instagram_backend.repository.UserRepository;
import com.InstagramClone.Instagram_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

        @Autowired
        private UserService userService;

        @Autowired
        private UserRepository userRepository;


        public ResponseEntity<List<User>> getuser()
        {
            List<User> list=userService.getuser();
            return ResponseEntity.ok(list);
        }

    @PostMapping("/create")
    public ResponseEntity<String> createUser(
            @RequestParam("username") String username,
            @RequestParam("profilePhoto") MultipartFile profilePic) {

        try {

            String response = userService.create(username,profilePic);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/{id}/photo")
    public ResponseEntity<byte[]> getUserProfilePhoto(@PathVariable Long id) {
        return (ResponseEntity<byte[]>) userService.findById(id)
                .map(user -> {
                    if (user.getProfilePhoto() != null && user.getProfilePhotoType() != null) {
                        byte[] imageBytes = Base64.getDecoder().decode(user.getProfilePhoto());
                        return ResponseEntity.ok()
                                .header(HttpHeaders.CONTENT_TYPE, user.getProfilePhotoType())
                                .body(imageBytes);
                    } else {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
                    }
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }


}
