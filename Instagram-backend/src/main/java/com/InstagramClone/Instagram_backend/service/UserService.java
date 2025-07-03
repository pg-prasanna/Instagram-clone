package com.InstagramClone.Instagram_backend.service;

import com.InstagramClone.Instagram_backend.model.User;
import com.InstagramClone.Instagram_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
    }

    public List<User> getuser()
    {
        return userRepository.findAll();
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).get();
    }

    public String getUserProfilePhotoBase64(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.map(User::getProfilePhoto)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
    }

    public String create(String username, MultipartFile profilePic) throws Exception{
        User user=new User();
        user.setUsername(username);
        if(profilePic!=null && !profilePic.isEmpty())
        {
            String base64Photo = Base64.getEncoder().encodeToString(profilePic.getBytes());
            user.setProfilePhoto(base64Photo);
            user.setProfilePhotoType(profilePic.getContentType());
        }
        userRepository.save(user);
        return "User created with id"+user.getId();
    }
}
