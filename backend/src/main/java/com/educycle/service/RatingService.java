package com.educycle.service;

import com.educycle.entity.Rating;
import com.educycle.entity.User;
import com.educycle.repository.RatingRepository;
import com.educycle.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Rating> getRatingsForUser(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return new ArrayList<>();
        return ratingRepository.findByRatedUser(user);
    }

    public Rating submitRating(Rating rating) {
        return ratingRepository.save(rating);
    }
}
