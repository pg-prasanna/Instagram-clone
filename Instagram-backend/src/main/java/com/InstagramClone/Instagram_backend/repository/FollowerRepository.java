package com.InstagramClone.Instagram_backend.repository;

import com.InstagramClone.Instagram_backend.model.Follower;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowerRepository extends JpaRepository<Follower,Long> {
}
