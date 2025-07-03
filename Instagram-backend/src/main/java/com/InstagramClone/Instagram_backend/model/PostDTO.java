package com.InstagramClone.Instagram_backend.model;

import java.time.LocalDateTime;

public class PostDTO {
    private Long id;
    private String caption;
    private int likes;
    private String imageUrl;
    private String imageType;
    private LocalDateTime timestamp;
    private User user;

    public PostDTO(Long id, String caption, int likes, String imageUrl, String imageType, LocalDateTime timestamp, User user) {
        this.id = id;
        this.caption = caption;
        this.likes = likes;
        this.imageUrl = imageUrl;
        this.imageType = imageType;
        this.timestamp = timestamp;
        this.user = user;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCaption() { return caption; }
    public void setCaption(String caption) { this.caption = caption; }
    public int getLikes() { return likes; }
    public void setLikes(int likes) { this.likes = likes; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getImageType() { return imageType; }
    public void setImageType(String imageType) { this.imageType = imageType; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
} 