package com.InstagramClone.Instagram_backend.repository;

import com.InstagramClone.Instagram_backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post,Long> {
}
