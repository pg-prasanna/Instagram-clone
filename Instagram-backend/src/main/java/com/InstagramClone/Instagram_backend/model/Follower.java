package com.InstagramClone.Instagram_backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "followers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Follower {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //always follower is a profile
    @ManyToOne
    @JoinColumn(name = "follower_id")
    private Profile follower;

    private String username;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String profilePhoto;

    private String profilePhotoType;
}
