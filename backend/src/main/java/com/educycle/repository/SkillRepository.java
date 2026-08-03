package com.educycle.repository;

import com.educycle.entity.Skill;
import com.educycle.entity.User;
import com.educycle.entity.enums.SkillLevel;
import com.educycle.entity.enums.SkillStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByCategory(String category);
    List<Skill> findByUser(User user);
    List<Skill> findByLevel(SkillLevel level);
    List<Skill> findByStatus(SkillStatus status);
    List<Skill> findBySkillNameContainingIgnoreCase(String keyword);
    List<Skill> findByCategoryAndLevel(String category, SkillLevel level);
}
