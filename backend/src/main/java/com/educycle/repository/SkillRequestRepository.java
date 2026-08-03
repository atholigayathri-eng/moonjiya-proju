package com.educycle.repository;

import com.educycle.entity.Skill;
import com.educycle.entity.SkillRequest;
import com.educycle.entity.User;
import com.educycle.entity.enums.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRequestRepository extends JpaRepository<SkillRequest, Long> {
    List<SkillRequest> findByLearner(User learner);
    List<SkillRequest> findByTutor(User tutor);
    List<SkillRequest> findBySkill(Skill skill);
    List<SkillRequest> findByStatus(RequestStatus status);
}
