package com.tracker.finance_tracker.service.impl;

import com.tracker.finance_tracker.model.Transaction;
import com.tracker.finance_tracker.model.User;
import com.tracker.finance_tracker.repository.TransactionRepository;
import com.tracker.finance_tracker.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;

    @Override
    public Transaction createTransaction(Transaction transaction) {
        if (transaction == null) {
            throw new IllegalArgumentException("Transaction cannot be null");
        }

        // Validate the transaction
        validateTransaction(transaction);

        // Set creation timestamp
        transaction.setCreatedAt(LocalDateTime.now());

        try {
            return transactionRepository.save(transaction);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create transaction: " + e.getMessage());
        }
    }

    private void validateTransaction(Transaction transaction) {
        if (transaction.getUser() == null || transaction.getUser().getId() == null) {
            throw new IllegalArgumentException("User is required");
        }
        if (transaction.getCategory() == null || transaction.getCategory().getId() == null) {
            throw new IllegalArgumentException("Category is required");
        }
        if (transaction.getAmount() == null) {
            throw new IllegalArgumentException("Amount is required");
        }
    }

    @Override
    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Transaction> getUserTransactions(User user) {
        return transactionRepository.findByUser(user);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }
} 