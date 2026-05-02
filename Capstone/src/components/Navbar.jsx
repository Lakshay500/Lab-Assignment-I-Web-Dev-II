import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="nav">
      <div>
        <strong>Expense Tracker</strong>
      </div>

      <div>
        <Link to="/" className="link">Dashboard</Link>
        <Link to="/add" className="link">Add Expense</Link>
      </div>
    </div>
  );
}