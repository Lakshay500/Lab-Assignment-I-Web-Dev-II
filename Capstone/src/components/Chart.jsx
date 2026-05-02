import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useExpenses } from "../context/ExpenseContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart() {
  const { expenses } = useExpenses();

  if (!expenses.length) return <p>No data</p>;

  const categories = {};
  expenses.forEach(e => {
    categories[e.category] = (categories[e.category] || 0) + e.amount;
  });

  const data = {
    labels: Object.keys(categories),
    datasets: [{
      data: Object.values(categories),
      backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"]
    }]
  };

  return <Pie data={data} />;
}