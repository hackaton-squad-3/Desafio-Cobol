package com.modernization.todoapp.controller;

import com.modernization.todoapp.model.Task;
import com.modernization.todoapp.model.User;
import com.modernization.todoapp.service.TaskService;
import com.modernization.todoapp.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class TestDataController {

    private final UserService userService;
    private final TaskService taskService;

    @PostMapping("/init-data")
    public ResponseEntity<Map<String, String>> initializeTestData() {
        try {
            // Create test users
            User user1 = User.builder()
                    .firstName("João")
                    .lastName("Silva")
                    .birthDate(LocalDate.of(1990, 1, 15))
                    .build();
            
            User user2 = User.builder()
                    .firstName("Maria")
                    .lastName("Santos")
                    .birthDate(LocalDate.of(1985, 5, 20))
                    .build();

            User savedUser1 = userService.createUser(user1);
            User savedUser2 = userService.createUser(user2);

            // Create test tasks
            Task task1 = Task.builder()
                    .title("Implementar API REST")
                    .description("Desenvolver endpoints para o sistema de tarefas")
                    .endDate(LocalDate.now().plusDays(7))
                    .creator(savedUser1)
                    .assignee(savedUser2)
                    .tags("desenvolvimento,api")
                    .priority(1)
                    .status("TODO")
                    .build();

            Task task2 = Task.builder()
                    .title("Testar funcionalidades")
                    .description("Realizar testes unitários e de integração")
                    .endDate(LocalDate.now().plusDays(14))
                    .creator(savedUser2)
                    .assignee(savedUser1)
                    .tags("teste,qualidade")
                    .priority(2)
                    .status("IN_PROGRESS")
                    .build();

            taskService.createTask(task1);
            taskService.createTask(task2);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Test data initialized successfully");
            response.put("users", "2 users created");
            response.put("tasks", "2 tasks created");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Error initializing test data: {}", e.getMessage(), e);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to initialize test data: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}