package com.educycle.service;

import com.educycle.entity.Notification;
import com.educycle.entity.User;
import com.educycle.repository.NotificationRepository;
import com.educycle.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Notification> getUserNotifications(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return new ArrayList<>();
        return notificationRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }
}
