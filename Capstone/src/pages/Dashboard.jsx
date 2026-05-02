import { useExpenses } from "../context/ExpenseContext";
import Chart from "../components/Chart";
import ExpenseList from "../components/ExpenseList";

export default function Dashboard() {
  const { expenses } = useExpenses();

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const count = expenses.length;

  const topCategory = (() => {
    const map = {};
    expenses.forEach(e => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return Object.keys(map).sort((a, b) => map[b] - map[a])[0] || "None";
  })();

  return (
    <div className="container">
      <h2 style={{ marginBottom: "10px" }}>Dashboard</h2>

      <div className="row">
        <div className="card">
          <p>Total Spending</p>
          <h3>₹{total}</h3>
        </div>

        <div className="card">
          <p>Transactions</p>
          <h3>{count}</h3>
        </div>

        <div className="card">
          <p>Top Category</p>
          <h3>{topCategory}</h3>
        </div>
      </div>

      <div className="row">
        <div className="panel">
          <Chart />
        </div>

        <div className="panel">
          <ExpenseList />
        </div>
      </div>
    </div>
  );
}