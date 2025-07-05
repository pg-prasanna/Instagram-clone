package com.InstagramClone.Instagram_backend.repository;

import com.InstagramClone.Instagram_backend.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile,Long> {
}
