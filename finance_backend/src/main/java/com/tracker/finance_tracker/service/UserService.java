package com.tracker.finance_tracker.service;

import com.tracker.finance_tracker.model.User;
import java.util.List;

public interface UserService {
    User createUser(User user);
    User getUserById(Long id);
    List<User> getAllUsers();
    void deleteUser(Long id);
} 