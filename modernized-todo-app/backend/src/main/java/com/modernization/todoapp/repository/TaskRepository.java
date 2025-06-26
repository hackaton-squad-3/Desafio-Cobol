package com.modernization.todoapp.repository;

import com.modernization.todoapp.model.Task;
import com.modernization.todoapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // Find tasks assigned to a specific user
    List<Task> findByAssignee(User assignee);
    
    // Find tasks by tag (using LIKE operator for partial matches)
    List<Task> findByTagsContaining(String tag);
    
    // Find tasks by priority
    List<Task> findByPriority(Integer priority);
    
    // Find tasks by status
    List<Task> findByStatus(String status);
    
    // Find tasks by creator
    List<Task> findByCreator(User creator);
}
