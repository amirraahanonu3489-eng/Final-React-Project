import { useTransactions } from "../context/TransactionContext";
import formatCurrency from "../utils/formatCurrency";

export default function TransactionList() {
  const { transactions, deleteTransaction, editTransaction } = useTransactions();

  const handleEdit = (id) => {
    const tx = transactions.find((t) => t.id === id);
    if (!tx) return alert("Transaction not found!");

    const newAmount = prompt("Enter new amount:", tx.amount);
    if (newAmount === null || newAmount.trim() === "" || isNaN(newAmount)) return;

    const newNotes = prompt("Edit notes (optional):", tx.notes || "");
    const newCategory = prompt("Edit category (optional):", tx.category || "");

    editTransaction(id, {
      amount: Number(newAmount),
      notes: newNotes,
      category: newCategory,
    });
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="text-green-600 font-bold">Total Income: <span>{formatCurrency(transactions.filter(t => t.type === "income").reduce((s, t) => s + Number(t.amount), 0))}</span></div>
        <div className="text-red-600 font-bold">Total Expenses: <span>{formatCurrency(transactions.filter(t => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0))}</span></div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3 text-left">Date</th>
              <th className="py-2 px-3 text-left">Category</th>
              <th className="py-2 px-3 text-left">Amount</th>
              <th className="py-2 px-3 text-left">Notes</th>
              <th className="py-2 px-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 px-3 text-center text-gray-500">No transactions yet</td>
              </tr>
            )}

            {transactions.map((t) => {
              const amount = Number(t.amount);
              return (
                <tr key={t.id}>
                  <td className="py-2 px-3">{t.date}</td>
                  <td className="py-2 px-3 capitalize">{t.category}</td>
                  <td className={`py-2 px-3 ${t.type === "income" ? "text-green-600" : "text-red-600"}`}>
                    {t.type === "income" ? "+" : "-"}{formatCurrency(amount)}
                  </td>
                  <td className="py-2 px-3">{t.notes || "-"}</td>
                  <td className="py-2 px-3">
                    <button onClick={() => handleEdit(t.id)} className="edit-btn text-blue-500 hover:text-blue-700 mr-3">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button onClick={() => {
                      if (window.confirm("Delete this transaction?")) deleteTransaction(t.id);
                    }} className="delete-btn text-red-500 hover:text-red-700">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
