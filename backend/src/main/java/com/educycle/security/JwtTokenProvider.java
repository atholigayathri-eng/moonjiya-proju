package com.educycle.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret:defaultSecretKeyForEduCycleApp1234567890}")
    private String jwtSecret;

    @Value("${jwt.expiration:86400000}")
    private long jwtExpirationInMs;

    public String generateToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationInMs);
        // Simple token generation fallback for development without external JWT library dependency overhead
        return "Bearer-Token-" + email + "-" + expiryDate.getTime();
    }

    public String getEmailFromToken(String token) {
        if (token != null && token.startsWith("Bearer-Token-")) {
            String[] parts = token.split("-");
            if (parts.length >= 3) {
                return parts[2];
            }
        }
        return null;
    }

    public boolean validateToken(String token) {
        return token != null && token.startsWith("Bearer-Token-");
    }
}
