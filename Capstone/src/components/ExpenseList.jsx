import { useExpenses } from "../context/ExpenseContext";
import { useState, useMemo } from "react";

export default function ExpenseList() {
  const { expenses, deleteExpense, editExpense } = useExpenses();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("latest");

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    amount: "",
    date: ""
  });

  const filtered = useMemo(() => {
    let data = [...expenses];

    if (search.trim()) {
      data = data.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase().trim())
      );
    }

    if (category !== "All") {
      data = data.filter(e => e.category === category);
    }

    if (sort === "latest") {
      data.sort((a, b) => {
        const da = new Date(a.date || a.id);
        const db = new Date(b.date || b.id);
        return db - da;
      });
    }

    if (sort === "high") data.sort((a, b) => b.amount - a.amount);
    if (sort === "low") data.sort((a, b) => a.amount - b.amount);

    return data;
  }, [expenses, search, category, sort]);

  const exportCSV = () => {
    const rows = [
      ["Title", "Amount", "Category", "Date"],
      ...expenses.map(e => [
        e.title,
        e.amount,
        e.category,
        e.date || ""
      ])
    ];

    const csv = rows.map(r => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();
  };

  const clearAll = () => {
    setSearch("");
    setCategory("All");
    setSort("latest");
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option>All</option>
          <option>Food</option>
          <option>Shopping</option>
          <option>Travel</option>
        </select>

        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="latest">Latest</option>
          <option value="high">Amount High</option>
          <option value="low">Amount Low</option>
        </select>

        <button onClick={exportCSV}>Export CSV</button>
        <button onClick={clearAll}>Reset</button>
      </div>

      {filtered.length === 0 ? (
        <p>No matching expenses</p>
      ) : (
        filtered.map(e => (
          <div key={e.id} className="item">
            {editingId === e.id ? (
              <>
                <input
                  value={editData.title}
                  onChange={ev => setEditData({ ...editData, title: ev.target.value })}
                />

                <input
                  type="number"
                  value={editData.amount}
                  onChange={ev => setEditData({ ...editData, amount: ev.target.value })}
                />

                <input
                  type="date"
                  value={editData.date}
                  onChange={ev => setEditData({ ...editData, date: ev.target.value })}
                />

                <button onClick={() => {
                  if (!editData.title.trim() || Number(editData.amount) <= 0) return;

                  editExpense({
                    ...e,
                    title: editData.title.trim(),
                    amount: Number(editData.amount),
                    date: editData.date || e.date
                  });

                  setEditingId(null);
                }}>
                  Save
                </button>
              </>
            ) : (
              <>
                <div>
                  <strong>{e.title}</strong>
                  <div style={{ fontSize: 12 }}>{e.category}</div>
                  <div style={{ fontSize: 11, color: "#aaa" }}>
                    {e.date || ""}
                  </div>
                </div>

                <div>
                  ₹{e.amount}

                  <button onClick={() => {
                    setEditingId(e.id);
                    setEditData({
                      title: e.title,
                      amount: e.amount,
                      date: e.date || ""
                    });
                  }}>
                    Edit
                  </button>

                  <button onClick={() => deleteExpense(e.id)}>
                    X
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}