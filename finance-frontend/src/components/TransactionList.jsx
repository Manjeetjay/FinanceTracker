import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  });

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
          const response = await api.getUserTransactions(user.id);
          setTransactions(response.data);
          
          const summary = response.data.reduce((acc, transaction) => {
            const amount = parseFloat(transaction.amount);
            if (transaction.type === 'INCOME') {
              acc.totalIncome += amount;
            } else {
              acc.totalExpense += amount;
            }
            return acc;
          }, { totalIncome: 0, totalExpense: 0 });
          
          summary.balance = summary.totalIncome - summary.totalExpense;
          setSummary(summary);
        }
      } catch (error) {
        console.error('Error loading transactions:', error);
        setError('Failed to load transactions');
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-gray-600 dark:text-gray-300">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg">
      {error}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">Total Income</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            +₹{summary.totalIncome.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">Total Expense</h3>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            -₹{summary.totalExpense.toFixed(2)}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">Balance</h3>
          <p className={`text-2xl font-bold ${
            summary.balance >= 0 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {summary.balance >= 0 ? '+' : '-'}₹{Math.abs(summary.balance).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Your Transactions</h2>
        <div className="text-gray-600 dark:text-gray-300">
          Total Transactions: {transactions.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {transactions.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
            <p className="text-gray-600 dark:text-gray-300 mb-4">No transactions found</p>
            <button
              onClick={() => window.location.href='/create-transaction'}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Create Your First Transaction
            </button>
          </div>
        ) : (
          transactions.map(transaction => (
            <div key={transaction.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200">
              <div className={`text-2xl font-bold mb-4 ${
                transaction.type === 'INCOME' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {transaction.type === 'INCOME' ? '+' : '-'}₹{parseFloat(transaction.amount).toFixed(2)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {transaction.description}
                </h3>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                      {transaction.category?.name}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      transaction.type === 'INCOME' 
                        ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' 
                        : 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
                    }`}>
                      {transaction.type}
                    </span>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;