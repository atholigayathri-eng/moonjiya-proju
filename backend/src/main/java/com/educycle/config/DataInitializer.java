package com.educycle.config;

import com.educycle.entity.Category;
import com.educycle.entity.Resource;
import com.educycle.entity.Skill;
import com.educycle.entity.User;
import com.educycle.entity.enums.ExchangeType;
import com.educycle.entity.enums.ResourceCondition;
import com.educycle.entity.enums.SkillLevel;
import com.educycle.entity.enums.TeachingMethod;
import com.educycle.repository.CategoryRepository;
import com.educycle.repository.ResourceRepository;
import com.educycle.repository.SkillRepository;
import com.educycle.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(CategoryRepository categoryRepository,
                                       UserRepository userRepository,
                                       ResourceRepository resourceRepository,
                                       SkillRepository skillRepository) {
        return args -> {
            if (categoryRepository.count() == 0) {
                List<String> resourceCategories = Arrays.asList(
                    "Textbooks", "Notes", "Lab Kits", "Project Components", "Lab Equipment", "Other"
                );
                for (String name : resourceCategories) {
                    Category cat = new Category();
                    cat.setType("RESOURCE");
                    cat.setName(name);
                    cat.setDescription(name + " category for EduCycle resources.");
                    categoryRepository.save(cat);
                }

                List<String> skillCategories = Arrays.asList(
                    "Programming", "Mathematics", "Languages", "Design", "Music", "Sports", "Arts"
                );
                for (String name : skillCategories) {
                    Category cat = new Category();
                    cat.setType("SKILL");
                    cat.setName(name);
                    cat.setDescription(name + " category for EduCycle skills.");
                    categoryRepository.save(cat);
                }

                System.out.println(">>> Default EduCycle Categories Initialized!");
            }

            // Seed initial demo user and sample items if database is fresh
            if (userRepository.count() == 0) {
                User demoUser = new User();
                demoUser.setEmail("student@college.edu");
                demoUser.setFirstName("Gayathri");
                demoUser.setLastName("Atholi");
                demoUser.setPasswordHash("$2a$10$L/FU1Dgmdx9zgX3lLz/Nl.SJp/BDOhnlH50zd0Ch3npm.MMkKAspm"); // password123
                demoUser.setCollege("College of Engineering");
                demoUser.setDepartment("Computer Science");
                demoUser.setBio("Enthusiastic CS student interested in resource sharing and peer learning.");
                User savedUser = userRepository.save(demoUser);

                // Sample Resource
                Resource res = new Resource();
                res.setUser(savedUser);
                res.setTitle("Data Structures & Algorithms in Java");
                res.setDescription("Standard textbook for 3rd semester CS course. Excellent condition.");
                res.setCategory("Textbooks");
                res.setCondition(ResourceCondition.GOOD);
                res.setExchangeType(ExchangeType.DONATE);
                res.setQuantity(1);
                resourceRepository.save(res);

                // Sample Skill
                Skill skill = new Skill();
                skill.setUser(savedUser);
                skill.setSkillName("Java & Spring Boot Tutoring");
                skill.setCategory("Programming");
                skill.setLevel(SkillLevel.INTERMEDIATE);
                skill.setDescription("1-on-1 tutoring sessions for building REST APIs with Java Spring Boot.");
                skill.setTeachingMethod(TeachingMethod.ONE_ON_ONE);
                skill.setAvailability("Evenings & Weekends");
                skillRepository.save(skill);

                System.out.println(">>> Sample User, Resource, and Skill Seeded Successfully!");
            }
        };
    }
}
