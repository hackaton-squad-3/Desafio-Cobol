package com.modernization.todoapp.repository;

import com.modernization.todoapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Spring Data JPA will automatically implement basic CRUD operations
    // We can add custom query methods as needed
}
