package com.tracker.finance_tracker.repository;

import com.tracker.finance_tracker.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByName(String name);
} 