package com.InstagramClone.Instagram_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "followers")
public class Follower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The one who follows
    @ManyToOne
    @JoinColumn(name = "follower_id")
    private User follower;

    // The one being followed
    @ManyToOne
    @JoinColumn(name = "following_id")
    private User following;
}
