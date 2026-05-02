import { createContext, useContext, useEffect, useState } from "react";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const data = localStorage.getItem("expenses");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses(prev => [...prev, { ...expense, id: Date.now() }]);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const editExpense = (updated) => {
    setExpenses(prev => prev.map(e => (e.id === updated.id ? updated : e)));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, editExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);