import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../context/TransactionContext";

export default function TransactionForm() {
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();

  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [recurring, setRecurring] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!type || !category || !amount || !date) {
      alert("⚠️ Please fill out all required fields.");
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      type,
      category,
      amount: Math.abs(Number(amount)),
      date,
      notes: notes.trim(),
      recurring,
    };

    addTransaction(newTransaction);
    alert("✅ Transaction saved successfully!");
    // reset
    setType("");
    setCategory("");
    setAmount("");
    setDate("");
    setNotes("");
    setRecurring(false);

    // Navigate to history or stay — choose to go to history
    navigate("/history");
  };

  return (
    <form id="transaction-form" onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Transaction Type</label>
        <select id="type" value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 border rounded" required>
          <option value="" hidden>Select type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Category</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded" required>
          <option value="" hidden>Select category</option>
          <option value="salary">Salary</option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="rent">Rent</option>
          <option value="utilities">Utilities</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Amount</label>
        <input type="number" step="0.01" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-3 py-2 border rounded" placeholder="Enter amount" required />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Date</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border rounded" required />
      </div>

      <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-3 py-2 border rounded mb-4" placeholder="Additional notes (optional)"></textarea>

      <label className="flex items-center gap-2">
        <input type="checkbox" id="recurring" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} />
        <span>Mark as recurring</span>
      </label>

      <div className="flex gap-2">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex-1">Save Transaction</button>
        <button type="button" onClick={() => navigate("/")} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 flex-1">Back to Dashboard</button>
      </div>
    </form>
  );
}
