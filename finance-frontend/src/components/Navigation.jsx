import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navigation = () => {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();

  const getPageTitle = (path) => {
    switch(path) {
      case '/': return 'Create User';
      case '/create-category': return 'Create Category';
      case '/create-transaction': return 'Create Transaction';
      case '/transactions': return 'View Transactions';
      default: return '';
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Finance Tracker</h1>
            <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
              {getPageTitle(location.pathname)}
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Create User
            </Link>
            <Link 
              to="/create-category"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/create-category'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Create Category
            </Link>
            <Link 
              to="/create-transaction"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/create-transaction'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              Create Transaction
            </Link>
            <Link 
              to="/transactions"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/transactions'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              View Transactions
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;