import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { useNavigate } from "react-router-dom";

export default function ExpenseForm() {
  const { addExpense } = useExpenses();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({ ...form, amount: Number(form.amount) });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <input type="number" placeholder="Amount" onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
      <input type="date" onChange={(e) => setForm({ ...form, date: e.target.value })} required />

      <select onChange={(e) => setForm({ ...form, category: e.target.value })}>
        <option>Food</option>
        <option>Travel</option>
        <option>Shopping</option>
      </select>

      <button type="submit">Add</button>
    </form>
  );
}