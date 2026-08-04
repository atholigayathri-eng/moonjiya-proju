package com.educycle.service;

import com.educycle.entity.Message;
import com.educycle.entity.ResourceRequest;
import com.educycle.entity.SkillRequest;
import com.educycle.entity.User;
import com.educycle.repository.MessageRepository;
import com.educycle.repository.ResourceRequestRepository;
import com.educycle.repository.SkillRequestRepository;
import com.educycle.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ResourceRequestRepository resourceRequestRepository;

    @Autowired
    private SkillRequestRepository skillRequestRepository;

    public List<Message> getMessagesBetweenUsers(Long user1Id, Long user2Id) {
        User user1 = userRepository.findById(user1Id).orElse(null);
        User user2 = userRepository.findById(user2Id).orElse(null);
        if (user1 == null || user2 == null) return new ArrayList<>();

        List<Message> sent = messageRepository.findBySender(user1);
        List<Message> result = new ArrayList<>();
        for (Message m : sent) {
            if (m.getReceiver() != null && m.getReceiver().getUserId().equals(user2Id)) {
                result.add(m);
            }
        }
        List<Message> received = messageRepository.findByReceiver(user1);
        for (Message m : received) {
            if (m.getSender() != null && m.getSender().getUserId().equals(user2Id)) {
                result.add(m);
            }
        }
        return result;
    }

    public List<Message> getMessagesForRequest(Long requestId) {
        List<Message> messages = new ArrayList<>();
        ResourceRequest rr = resourceRequestRepository.findById(requestId).orElse(null);
        if (rr != null) {
            messages = messageRepository.findByResourceRequestOrderByCreatedAtAsc(rr);
        }
        if (messages.isEmpty()) {
            SkillRequest sr = skillRequestRepository.findById(requestId).orElse(null);
            if (sr != null) {
                messages = messageRepository.findBySkillRequestOrderByCreatedAtAsc(sr);
            }
        }
        return messages;
    }

    public Message saveRequestMessage(Long requestId, String type, Long senderId, String messageText) {
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = null;
        ResourceRequest rr = null;
        SkillRequest sr = null;

        if ("skill".equalsIgnoreCase(type)) {
            sr = skillRequestRepository.findById(requestId)
                    .orElseThrow(() -> new RuntimeException("Skill request not found"));
            if (sr.getLearner() != null && sr.getLearner().getUserId().equals(senderId)) {
                receiver = sr.getTutor();
            } else {
                receiver = sr.getLearner();
            }
        } else {
            rr = resourceRequestRepository.findById(requestId)
                    .orElseThrow(() -> new RuntimeException("Resource request not found"));
            if (rr.getRequester() != null && rr.getRequester().getUserId().equals(senderId)) {
                receiver = rr.getOwner();
            } else {
                receiver = rr.getRequester();
            }
        }

        if (receiver == null) {
            throw new RuntimeException("Receiver could not be determined");
        }

        Message msg = new Message();
        msg.setSender(sender);
        msg.setReceiver(receiver);
        msg.setMessageText(messageText);
        msg.setResourceRequest(rr);
        msg.setSkillRequest(sr);
        msg.setRead(false);

        return messageRepository.save(msg);
    }

    public Message sendMessage(Message message) {
        return messageRepository.save(message);
    }
}
