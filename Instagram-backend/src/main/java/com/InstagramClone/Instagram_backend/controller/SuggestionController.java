package com.InstagramClone.Instagram_backend.controller;

import com.InstagramClone.Instagram_backend.model.User;
import com.InstagramClone.Instagram_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping ("/user")
public class SuggestionController {

    @Autowired
    private UserService userService;

    @GetMapping("/suggestions")
    public ResponseEntity<List<User>> getSuggestions(){
        List<User> suggestions=userService.getSuggestedUsers();
        return ResponseEntity.ok(suggestions);
    }
}
