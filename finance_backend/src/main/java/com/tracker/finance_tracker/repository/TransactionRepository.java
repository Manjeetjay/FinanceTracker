package com.tracker.finance_tracker.repository;

import com.tracker.finance_tracker.model.Transaction;
import com.tracker.finance_tracker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByUser(User user);
} 