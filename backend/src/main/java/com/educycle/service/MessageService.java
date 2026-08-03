package com.educycle.service;

import com.educycle.entity.Message;
import com.educycle.entity.User;
import com.educycle.repository.MessageRepository;
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

    public Message sendMessage(Message message) {
        return messageRepository.save(message);
    }
}
