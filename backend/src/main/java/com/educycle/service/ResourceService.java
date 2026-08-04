package com.educycle.service;

import com.educycle.dto.ResourceRequestDTO;
import com.educycle.entity.Resource;
import com.educycle.entity.User;
import com.educycle.entity.enums.ExchangeType;
import com.educycle.entity.enums.ResourceCondition;
import com.educycle.repository.ResourceRepository;
import com.educycle.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResourceService {

    @Autowired
    private ResourceRepository resourceRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Resource> getAllResources(Long userId) {
        if (userId != null) {
            User user = userRepository.findById(userId).orElse(null);
            if (user != null) {
                return resourceRepository.findByUser(user);
            }
            return new java.util.ArrayList<>();
        }
        return resourceRepository.findAll();
    }

    public Optional<Resource> getResourceById(Long id) {
        return resourceRepository.findById(id);
    }

    public Resource createResourceFromDTO(ResourceRequestDTO dto) {
        Resource r = new Resource();
        r.setTitle(dto.getTitle());
        r.setDescription(dto.getDescription());
        r.setCategory(dto.getCategory());
        r.setQuantity(dto.getQuantity() != null ? dto.getQuantity() : 1);
        r.setImageUrl(dto.getImageUrl());

        if (dto.getExchangeType() != null) {
            try {
                r.setExchangeType(ExchangeType.valueOf(dto.getExchangeType().toUpperCase()));
            } catch (IllegalArgumentException e) {
                r.setExchangeType(ExchangeType.DONATE);
            }
        } else {
            r.setExchangeType(ExchangeType.DONATE);
        }

        if (dto.getCondition() != null) {
            try {
                r.setCondition(ResourceCondition.valueOf(dto.getCondition().toUpperCase()));
            } catch (IllegalArgumentException ignored) {}
        }

        if (dto.getUserId() != null) {
            User u = userRepository.findById(dto.getUserId()).orElse(null);
            if (u != null) {
                r.setUser(u);
            }
        }

        if (r.getUser() == null) {
            // Fallback to demo user if not logged in
            User firstUser = userRepository.findAll().stream().findFirst().orElseGet(() -> {
                User demo = new User();
                demo.setEmail("demo@educycle.edu");
                demo.setFirstName("Demo");
                demo.setLastName("User");
                demo.setPasswordHash("demopassword");
                return userRepository.save(demo);
            });
            r.setUser(firstUser);
        }

        return resourceRepository.save(r);
    }

    public Resource saveResource(Resource resource) {
        return resourceRepository.save(resource);
    }

    public void deleteResource(Long id) {
        resourceRepository.deleteById(id);
    }
}
