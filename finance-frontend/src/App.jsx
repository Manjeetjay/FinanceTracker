import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import UserForm from "./components/UserForm";
import CategoryForm from "./components/CategoryForm";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<UserForm />} />
              <Route path="/create-category" element={<CategoryForm />} />
              <Route path="/create-transaction" element={<TransactionForm />} />
              <Route path="/transactions" element={<TransactionList />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;