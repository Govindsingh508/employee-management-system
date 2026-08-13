package com.govind.employee_management_system.config;

import com.govind.employee_management_system.entity.User;
import com.govind.employee_management_system.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner createDefaultUser(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            if (userRepository.findByUsername("admin").isEmpty()) {

                User user = new User();

                user.setUsername("admin");
                user.setPassword(passwordEncoder.encode("admin123"));
                user.setRole("ADMIN");

                userRepository.save(user);
            }
        };
    }
}