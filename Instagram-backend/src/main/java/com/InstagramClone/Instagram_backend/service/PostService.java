package com.InstagramClone.Instagram_backend.service;

import com.InstagramClone.Instagram_backend.model.Post;
import com.InstagramClone.Instagram_backend.model.User;
import com.InstagramClone.Instagram_backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post create(String username, MultipartFile image, String caption) throws Exception {
        User userOptional = userService.findByUsername(username);
        if (userOptional == null) {
            return null;
        }

        Post post = new Post();
        post.setUser(userOptional);
        post.setCaption(caption);
        post.setLikes(100);
        if (image != null && !image.isEmpty()) {
            String base64image = Base64.getEncoder().encodeToString(image.getBytes());
            post.setProfileImage(base64image);
            post.setImageType(image.getContentType());
        }
        postRepository.save(post);
        return post;
    }

    public Optional<Post> findById(Long id) {
        return postRepository.findById(id);
    }
}