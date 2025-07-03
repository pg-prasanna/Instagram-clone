package com.InstagramClone.Instagram_backend.controller;

import com.InstagramClone.Instagram_backend.model.Post;
import com.InstagramClone.Instagram_backend.model.User;
import com.InstagramClone.Instagram_backend.model.PostDTO;
import com.InstagramClone.Instagram_backend.repository.PostRepository;
import com.InstagramClone.Instagram_backend.service.PostService;
import com.InstagramClone.Instagram_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostRepository postRepository;

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        List<Post> modifiedPosts = new ArrayList<>();

        for (Post post : posts) {
            Post newPost = new Post();

            newPost.setId(post.getId());
            newPost.setCaption(post.getCaption());
            newPost.setLikes(post.getLikes());
            newPost.setTimestamp(post.getTimestamp());
            newPost.setUser(post.getUser());
            newPost.setComments(post.getComments());
            newPost.setImageType(post.getImageType());

            // Set the image URL instead of base64 image data
            newPost.setProfileImage("/api/posts/" + post.getId() + "/photo");

            modifiedPosts.add(newPost);
        }

        return ResponseEntity.ok(modifiedPosts);
    }


    @PostMapping("/create")
    public ResponseEntity<Post> createPost(
            @RequestParam("username") String username,
            @RequestParam("image") MultipartFile image,
            @RequestParam("caption") String caption) {

        try {
                Post savedPost = postService.create(username,image,caption);
                return new ResponseEntity<>(savedPost, HttpStatus.CREATED);

        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    @GetMapping("/{id}/photo")
    public ResponseEntity<byte[]> getUserProfilePhoto(@PathVariable Long id) {
        return (ResponseEntity<byte[]>) postService.findById(id)
                .map(user -> {
                    if (user.getProfileImage() != null && user.getImageType() != null) {
                        byte[] imageBytes = Base64.getDecoder().decode(user.getProfileImage());
                        return ResponseEntity.ok()
                                .header(HttpHeaders.CONTENT_TYPE, user.getImageType())
                                .body(imageBytes);
                    } else {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
                    }
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

}
