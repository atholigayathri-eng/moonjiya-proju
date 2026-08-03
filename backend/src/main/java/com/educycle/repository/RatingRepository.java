package com.educycle.repository;

import com.educycle.entity.Rating;
import com.educycle.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findByRatedUser(User ratedUser);
    List<Rating> findByReviewer(User reviewer);
}
