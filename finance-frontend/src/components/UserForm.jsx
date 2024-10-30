import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const UserForm = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
    });
    const [existingUsers, setExistingUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Fetch existing users when component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.getAllUsers();
                setExistingUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to load existing users');
            }
        };

        fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            console.log('Attempting to create user with data:', userData);
            const response = await api.createUser(userData);
            console.log('User created successfully:', response.data);
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            navigate('/create-category');
        } catch (error) {
            console.error('Detailed error:', error);
            if (error.code === 'ERR_NETWORK') {
                setError('Cannot connect to server. Please check if the backend is running.');
            } else {
                setError(error.response?.data?.message || 'Error creating user. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserSelect = (userId) => {
        const user = existingUsers.find(u => u.id === parseInt(userId));
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            setSelectedUser(userId);
        }
    };

    const handleContinue = () => {
        if (selectedUser) {
            navigate('/create-category');
        } else {
            setError('Please select a user or create a new one');
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            {/* Existing Users Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Select Existing User</h2>
                {existingUsers.length > 0 ? (
                    <div className="space-y-4">
                        <select
                            value={selectedUser}
                            onChange={(e) => handleUserSelect(e.target.value)}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        >
                            <option value="">Select a user</option>
                            {existingUsers.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name} ({user.email})
                                </option>
                            ))}
                        </select>
                        <button 
                            onClick={handleContinue}
                            disabled={!selectedUser}
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition duration-200"
                        >
                            Continue with Selected User
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-600 dark:text-gray-300">No existing users found</p>
                )}
            </div>

            {/* Separator */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">OR</span>
                </div>
            </div>

            {/* Create New User Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Create New User</h2>
                {error && (
                    <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg">
                        <p>{error}</p>
                        {error.includes('connect to server') && (
                            <p className="mt-2 text-sm">Make sure the Spring Boot application is running on port 8080</p>
                        )}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            required
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            required
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition duration-200"
                    >
                        {isLoading ? 'Creating...' : 'Create User & Continue'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserForm;