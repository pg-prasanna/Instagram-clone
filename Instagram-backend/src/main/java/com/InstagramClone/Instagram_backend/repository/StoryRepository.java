package com.InstagramClone.Instagram_backend.repository;

import com.InstagramClone.Instagram_backend.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoryRepository extends JpaRepository<Story, Long> {
}
