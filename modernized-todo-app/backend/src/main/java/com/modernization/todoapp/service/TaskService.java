package com.modernization.todoapp.service;

import com.modernization.todoapp.model.Task;
import com.modernization.todoapp.model.User;
import com.modernization.todoapp.repository.TaskRepository;
import com.modernization.todoapp.repository.UserRepository;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<Task> getTasksByAssignee(Long userId) {
        Optional<User> assignee = userRepository.findById(userId);
        if (assignee.isEmpty()) {
            return List.of();
        }
        return taskRepository.findByAssignee(assignee.get());
    }

    @Transactional(readOnly = true)
    public List<Task> getTasksByTag(String tag) {
        return taskRepository.findByTagsContaining(tag);
    }

    @Transactional(readOnly = true)
    public List<User> getAllUsersWithTasks() {
        return userRepository.findAll();
    }

    @Transactional
    public Task createTask(Task task) {
        validateTask(task);
        task.setCreationDateTime(LocalDateTime.now());
        task.setUpdateDateTime(LocalDateTime.now());
        return taskRepository.save(task);
    }

    @Transactional
    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        // Update task fields
        if (taskDetails.getTitle() != null && !taskDetails.getTitle().trim().isEmpty()) {
            task.setTitle(taskDetails.getTitle());
        }
        
        if (taskDetails.getDescription() != null) {
            task.setDescription(taskDetails.getDescription());
        }
        
        if (taskDetails.getEndDate() != null) {
            task.setEndDate(taskDetails.getEndDate());
        }
        
        if (taskDetails.getTags() != null) {
            task.setTags(taskDetails.getTags());
        }
        
        if (taskDetails.getPriority() != null) {
            task.setPriority(taskDetails.getPriority());
        }
        
        if (taskDetails.getStatus() != null && !taskDetails.getStatus().trim().isEmpty()) {
            task.setStatus(taskDetails.getStatus());
        }
        
        if (taskDetails.getAssignee() != null) {
            task.setAssignee(taskDetails.getAssignee());
        }

        if (taskDetails.getCreator() != null) {
            task.setCreator(taskDetails.getCreator());
        }

        task.setUpdateDateTime(LocalDateTime.now());
        validateTask(task);
        
        return taskRepository.save(task);
    }

    @Transactional
    public Task updateTaskStatus(Long id, String status) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        
        task.setStatus(status);
        task.setUpdateDateTime(LocalDateTime.now());
        
        return taskRepository.save(task);
    }

    @Transactional
    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        taskRepository.delete(task);
    }

    private void validateTask(Task task) {
        if (task.getTitle() == null || task.getTitle().trim().isEmpty() || task.getTitle().length() > 100) {
            throw new ValidationException("Title must not be empty and must be less than 100 characters");
        }

        if (task.getDescription() != null && task.getDescription().length() > 1000) {
            throw new ValidationException("Description must be less than 1000 characters");
        }

        if (task.getEndDate() == null) {
            throw new ValidationException("End date must not be null");
        }

        // Check if end date is in the future
        if (task.getEndDate().isBefore(LocalDate.now())) {
            throw new ValidationException("Please enter a valid date from today onwards");
        }

        if (task.getCreator() == null) {
            throw new ValidationException("Creator must not be null");
        }

        if (task.getAssignee() == null) {
            throw new ValidationException("Assignee must not be null");
        }

        if (task.getTags() != null && task.getTags().length() > 100) {
            throw new ValidationException("Tags must be less than 100 characters");
        }

        if (task.getPriority() == null || task.getPriority() < 1 || task.getPriority() > 3) {
            throw new ValidationException("Priority must be between 1 and 3");
        }

        if (task.getStatus() == null || task.getStatus().trim().isEmpty()) {
            throw new ValidationException("Status must not be empty");
        }
    }
}
