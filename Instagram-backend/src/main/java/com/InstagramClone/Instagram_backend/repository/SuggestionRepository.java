package com.InstagramClone.Instagram_backend.repository;

import com.InstagramClone.Instagram_backend.model.Suggestion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuggestionRepository extends JpaRepository<Suggestion,Long> {

}
