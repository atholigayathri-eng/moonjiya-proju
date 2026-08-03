package com.educycle.config;

import com.educycle.entity.Category;
import com.educycle.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initCategories(CategoryRepository categoryRepository) {
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

                System.out.println(">>> Default EduCycle Categories Initialized Successfully!");
            }
        };
    }
}
