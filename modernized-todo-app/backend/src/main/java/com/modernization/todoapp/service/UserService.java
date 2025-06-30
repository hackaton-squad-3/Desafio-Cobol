package com.modernization.todoapp.service;

import com.modernization.todoapp.model.User;
import com.modernization.todoapp.repository.UserRepository;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Transactional
    public User createUser(User user) {
        validateUser(user);
        
        // Check if user already exists
        List<User> existingUsers = userRepository.findAll();
        boolean userExists = existingUsers.stream()
            .anyMatch(u -> u.getFirstName().equalsIgnoreCase(user.getFirstName()) 
                        && u.getLastName().equalsIgnoreCase(user.getLastName())
                        && u.getBirthDate().equals(user.getBirthDate()));
        
        if (userExists) {
            throw new ValidationException("User already registered");
        }
        
        return userRepository.save(user);
    }

    @Transactional
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setBirthDate(userDetails.getBirthDate());

        validateUser(user);
        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        userRepository.delete(user);
    }

    private void validateUser(User user) {
        if (user.getFirstName() == null || user.getFirstName().trim().isEmpty() || user.getFirstName().length() > 30) {
            throw new ValidationException("First name must not be empty and must be less than 30 characters");
        }

        if (user.getLastName() == null || user.getLastName().trim().isEmpty() || user.getLastName().length() > 100) {
            throw new ValidationException("Last name must not be empty and must be less than 100 characters");
        }

        if (user.getBirthDate() == null) {
            throw new ValidationException("Birth date must not be null");
        }

        // Check if user is between 18 and 100 years old
        LocalDate now = LocalDate.now();
        int age = Period.between(user.getBirthDate(), now).getYears();
        if (age < 18) {
            throw new ValidationException("User must be at least 18 years old");
        }
        if (age > 100) {
            throw new ValidationException("User must be at most 100 years old");
        }
    }
}
