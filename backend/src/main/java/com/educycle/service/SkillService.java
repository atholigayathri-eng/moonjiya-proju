package com.educycle.service;

import com.educycle.dto.SkillRequestDTO;
import com.educycle.entity.Skill;
import com.educycle.entity.User;
import com.educycle.entity.enums.SkillLevel;
import com.educycle.entity.enums.TeachingMethod;
import com.educycle.repository.SkillRepository;
import com.educycle.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public Optional<Skill> getSkillById(Long id) {
        return skillRepository.findById(id);
    }

    public Skill createSkillFromDTO(SkillRequestDTO dto) {
        Skill s = new Skill();
        s.setSkillName(dto.getSkillName());
        s.setCategory(dto.getCategory());
        s.setDescription(dto.getDescription());
        s.setAvailability(dto.getAvailability());

        if (dto.getLevel() != null) {
            try {
                s.setLevel(SkillLevel.valueOf(dto.getLevel().toUpperCase()));
            } catch (IllegalArgumentException ignored) {}
        }

        if (dto.getTeachingMethod() != null) {
            try {
                s.setTeachingMethod(TeachingMethod.valueOf(dto.getTeachingMethod().toUpperCase()));
            } catch (IllegalArgumentException ignored) {}
        }

        if (dto.getUserId() != null) {
            User u = userRepository.findById(dto.getUserId()).orElse(null);
            if (u != null) {
                s.setUser(u);
            }
        }

        if (s.getUser() == null) {
            User firstUser = userRepository.findAll().stream().findFirst().orElseGet(() -> {
                User demo = new User();
                demo.setEmail("demo@educycle.edu");
                demo.setFirstName("Demo");
                demo.setLastName("User");
                demo.setPasswordHash("demopassword");
                return userRepository.save(demo);
            });
            s.setUser(firstUser);
        }

        return skillRepository.save(s);
    }

    public Skill saveSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }
}
