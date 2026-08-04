package com.educycle.controller;

import com.educycle.entity.Message;
import com.educycle.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/{requestId}")
    public ResponseEntity<List<Message>> getRequestChatHistory(@PathVariable Long requestId) {
        return ResponseEntity.ok(messageService.getMessagesForRequest(requestId));
    }

    @GetMapping("/{user1Id}/{user2Id}")
    public ResponseEntity<List<Message>> getChatHistory(@PathVariable Long user1Id, @PathVariable Long user2Id) {
        return ResponseEntity.ok(messageService.getMessagesBetweenUsers(user1Id, user2Id));
    }

    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody java.util.Map<String, Object> payload) {
        if (payload.containsKey("requestId") && payload.containsKey("senderId")) {
            Long requestId = ((Number) payload.get("requestId")).longValue();
            Long senderId = ((Number) payload.get("senderId")).longValue();
            String type = (String) payload.get("type");
            String messageText = (String) payload.get("messageText");
            return ResponseEntity.ok(messageService.saveRequestMessage(requestId, type, senderId, messageText));
        }
        return ResponseEntity.badRequest().build();
    }
}
