import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import History from "./pages/History";
import '@fortawesome/fontawesome-free/css/all.min.css';


export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 via-blue-100 to-green-100">
      <header className="bg-linear-to-r from-green-500 to-pink-500 text-white py-4 shadow-md text-center rounded-b-sm">
        <div>
          <h1 className="text-3xl font-bold">
            <i className="fa-solid fa-money-bill-1-wave"></i> Income and Expense Tracker
          </h1>
          <p className="text-sm opacity-90">Manage your finances effectively</p>
        </div>
      </header>

      <nav className="max-w-4xl mx-auto mt-6 flex gap-2 justify-center">
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Dashboard</Link>
        <Link to="/add" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Transaction</Link>
        <Link to="/history" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">History</Link>
      </nav>

      <main className="max-w-4xl mx-auto mt-2 p-2">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTransaction />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </div>
  );
}

