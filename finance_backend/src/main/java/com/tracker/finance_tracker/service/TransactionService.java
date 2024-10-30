package com.tracker.finance_tracker.service;

import com.tracker.finance_tracker.model.Transaction;
import com.tracker.finance_tracker.model.User;
import java.util.List;

public interface TransactionService {
    Transaction createTransaction(Transaction transaction);
    Transaction getTransactionById(Long id);
    List<Transaction> getUserTransactions(User user);
    void deleteTransaction(Long id);
    List<Transaction> getAllTransactions();
} 