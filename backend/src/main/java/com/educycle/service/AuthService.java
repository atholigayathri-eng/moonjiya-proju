package com.educycle.service;

import com.educycle.dto.AuthRequest;
import com.educycle.dto.AuthResponse;
import com.educycle.entity.User;
import com.educycle.repository.UserRepository;
import com.educycle.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponse register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered!");
        }
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        User savedUser = userRepository.save(user);
        String token = jwtTokenProvider.generateToken(savedUser.getEmail());
        String name = savedUser.getFirstName() + " " + savedUser.getLastName();
        return new AuthResponse(token, savedUser.getUserId(), savedUser.getEmail(), name);
    }

    public AuthResponse login(AuthRequest authRequest) {
        User user = userRepository.findByEmail(authRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + authRequest.getEmail()));

        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials!");
        }

        String token = jwtTokenProvider.generateToken(user.getEmail());
        String name = user.getFirstName() + " " + user.getLastName();
        return new AuthResponse(token, user.getUserId(), user.getEmail(), name);
    }
}
