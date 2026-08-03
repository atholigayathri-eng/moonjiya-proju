package com.educycle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class EducycleApplication {

    public static void main(String[] args) {
        SpringApplication.run(EducycleApplication.class, args);
    }
}
