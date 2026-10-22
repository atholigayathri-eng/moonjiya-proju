package com.educycle.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

@Service
public class FirebaseService {

    private static final Logger logger = LoggerFactory.getLogger(FirebaseService.class);
    private boolean initialized = false;

    @Value("${firebase.credentials.path:firebase-service-account.json}")
    private String credentialsPath;

    @Value("${firebase.project.id:javaproject-b0304}")
    private String projectId;

    @PostConstruct
    public void init() {
        try {
            InputStream serviceAccount = null;

            // 1. Check classpath
            Resource resource = new ClassPathResource(credentialsPath);
            if (resource.exists()) {
                serviceAccount = resource.getInputStream();
                logger.info("Found Firebase service account in classpath: {}", credentialsPath);
            } else {
                // 2. Check filesystem
                File file = new File(credentialsPath);
                if (file.exists()) {
                    serviceAccount = new FileInputStream(file);
                    logger.info("Found Firebase service account in filesystem: {}", file.getAbsolutePath());
                }
            }

            if (serviceAccount != null) {
                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .setProjectId(projectId)
                        .build();

                if (FirebaseApp.getApps().isEmpty()) {
                    FirebaseApp.initializeApp(options);
                }
                initialized = true;
                logger.info(">>> Firebase Admin SDK initialized successfully for project: {}", projectId);
            } else {
                logger.info(">>> Firebase service account file '{}' not provided yet. Place 'firebase-service-account.json' in 'backend/src/main/resources/' to link Firebase user deletions.", credentialsPath);
            }
        } catch (Exception e) {
            logger.warn(">>> Could not initialize Firebase Admin SDK: {}", e.getMessage());
        }
    }

    public boolean isInitialized() {
        return initialized;
    }

    /**
     * Deletes a user from Firebase Authentication by email
     * @param email The user's email address
     * @return true if deleted, false otherwise
     */
    public boolean deleteUserByEmail(String email) {
        if (!initialized) {
            logger.warn(">>> Firebase Admin SDK is not initialized. Skipping Firebase deletion for: {}", email);
            return false;
        }

        if (email == null || email.trim().isEmpty()) {
            return false;
        }

        try {
            UserRecord userRecord = FirebaseAuth.getInstance().getUserByEmail(email);
            if (userRecord != null) {
                FirebaseAuth.getInstance().deleteUser(userRecord.getUid());
                logger.info(">>> Successfully deleted user '{}' (UID: {}) from Firebase Authentication.", email, userRecord.getUid());
                return true;
            }
        } catch (FirebaseAuthException e) {
            if ("user-not-found".equals(e.getErrorCode())) {
                logger.info(">>> User '{}' was not found in Firebase Authentication (already deleted or registered only in DB).", email);
            } else {
                logger.warn(">>> FirebaseAuthException while deleting user '{}': {}", email, e.getMessage());
            }
        } catch (Exception e) {
            logger.warn(">>> Unexpected error deleting user '{}' from Firebase: {}", email, e.getMessage());
        }
        return false;
    }

    /**
     * Deletes a user from Firebase Authentication by UID
     * @param uid The Firebase UID
     * @return true if deleted, false otherwise
     */
    public boolean deleteUserByUid(String uid) {
        if (!initialized) {
            logger.warn(">>> Firebase Admin SDK is not initialized. Skipping Firebase deletion for UID: {}", uid);
            return false;
        }

        try {
            FirebaseAuth.getInstance().deleteUser(uid);
            logger.info(">>> Successfully deleted UID '{}' from Firebase Authentication.", uid);
            return true;
        } catch (FirebaseAuthException e) {
            logger.warn(">>> FirebaseAuthException while deleting UID '{}': {}", uid, e.getMessage());
        }
        return false;
    }
}
