package com.educycle.repository;

import com.educycle.entity.Message;
import com.educycle.entity.ResourceRequest;
import com.educycle.entity.SkillRequest;
import com.educycle.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySender(User sender);
    List<Message> findByReceiver(User receiver);
    List<Message> findByResourceRequest(ResourceRequest resourceRequest);
    List<Message> findBySkillRequest(SkillRequest skillRequest);
    List<Message> findByResourceRequestOrderByCreatedAtAsc(ResourceRequest resourceRequest);
    List<Message> findBySkillRequestOrderByCreatedAtAsc(SkillRequest skillRequest);
}
