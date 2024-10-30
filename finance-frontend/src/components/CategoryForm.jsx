import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const CategoryForm = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Sending category data:', category);
      
      const response = await api.createCategory({
        name: category.name,
        description: category.description
      });
      
      console.log('Response:', response);
      localStorage.setItem('currentCategory', JSON.stringify(response.data));
      navigate('/create-transaction');
    } catch (error) {
      console.error('Error creating category:', error.response?.data || error.message);
      setError('Failed to create category. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Create New Category
        </h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Category Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter category name"
              value={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <div className="space-y-2">
            <label 
              htmlFor="description" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <input
              id="description"
              type="text"
              placeholder="Enter category description"
              value={category.description}
              onChange={(e) => setCategory({ ...category, description: e.target.value })}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition duration-200"
            >
              {isLoading ? 'Creating...' : 'Create Category & Continue'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/create-transaction')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
          >
            Skip category creation →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;