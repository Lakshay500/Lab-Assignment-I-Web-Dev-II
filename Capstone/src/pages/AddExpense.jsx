import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AddExpense() {
  const { addExpense } = useExpenses();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: ""
  });

  const submit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || Number(form.amount) <= 0) {
      alert("Enter valid data");
      return;
    }

    addExpense({
      ...form,
      title: form.title.trim(),
      amount: Number(form.amount),
      date: form.date || new Date().toISOString().split("T")[0]
    });

    navigate("/");
  };

  return (
    <div className="container">
      <motion.div
        style={card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 style={{ marginBottom: 5 }}>Add Expense</h2>
        <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 20 }}>
          Track your spending efficiently
        </p>

        <form
          onSubmit={submit}
          style={{ display: "flex", flexDirection: "column", gap: 15 }}
        >
          <motion.div style={field} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <label>Title</label>
            <input
              placeholder="e.g. Groceries"
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
          </motion.div>

          <motion.div style={field} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <label>Amount</label>
            <input
              type="number"
              placeholder="e.g. 500"
              onChange={e => setForm({ ...form, amount: e.target.value })}
            />
          </motion.div>

          <motion.div style={field} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <label>Date</label>
            <input
              type="date"
              onChange={e => setForm({ ...form, date: e.target.value })}
            />
          </motion.div>

          <motion.div style={field} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <label>Category</label>
            <select onChange={e => setForm({ ...form, category: e.target.value })}>
              <option>Food</option>
              <option>Shopping</option>
              <option>Travel</option>
            </select>
          </motion.div>

          <motion.button
            style={submitBtn}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Add Expense
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

const card = {
  maxWidth: "420px",
  margin: "auto",
  padding: "25px",
  background: "#111827",
  borderRadius: "14px",
  border: "1px solid #1f2937"
};

const field = {
  display: "flex",
  flexDirection: "column",
  gap: "6px"
};

const submitBtn = {
  marginTop: "10px",
  padding: "10px",
  fontWeight: "bold"
};