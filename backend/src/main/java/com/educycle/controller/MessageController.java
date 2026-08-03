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

    @GetMapping("/{user1Id}/{user2Id}")
    public ResponseEntity<List<Message>> getChatHistory(@PathVariable Long user1Id, @PathVariable Long user2Id) {
        return ResponseEntity.ok(messageService.getMessagesBetweenUsers(user1Id, user2Id));
    }

    @PostMapping
    public ResponseEntity<Message> sendMessage(@RequestBody Message message) {
        return ResponseEntity.ok(messageService.sendMessage(message));
    }
}
