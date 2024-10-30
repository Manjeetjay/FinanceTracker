import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const TransactionForm = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    amount: '',
    description: '',
    userId: '',
    categoryId: '',
    type: 'EXPENSE'
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
          setTransaction(prev => ({ ...prev, userId: user.id }));
        }
        const categoriesResponse = await api.getAllCategories();
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Error loading categories');
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transactionData = {
        amount: parseFloat(transaction.amount),
        description: transaction.description,
        user: { id: transaction.userId },
        category: { id: transaction.categoryId },
        type: transaction.type,
        createdAt: new Date().toISOString()
      };

      console.log('Sending transaction data:', transactionData);
      
      const response = await api.createTransaction(transactionData);
      if (response.data) {
        navigate('/transactions');
      } else {
        setError('Failed to create transaction');
      }
    } catch (error) {
      console.error('Error creating transaction:', error);
      setError(error.response?.data || 'Error creating transaction');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Create New Transaction</h2>
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Transaction Type
            </label>
            <select
              id="type"
              value={transaction.type}
              onChange={(e) => setTransaction({ ...transaction, type: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Amount ($)
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              placeholder="Enter amount"
              value={transaction.amount}
              onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <input
              id="description"
              type="text"
              placeholder="Enter description"
              value={transaction.description}
              onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              id="category"
              value={transaction.categoryId}
              onChange={(e) => setTransaction({ ...transaction, categoryId: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition duration-200"
          >
            Create Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;