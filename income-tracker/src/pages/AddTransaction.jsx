import TransactionForm from "../components/TransactionForm";

export default function AddTransaction() {
  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md p-6 border-2" style={{ borderColor: "#ddd" }}>
      <h2 className="text-2xl font-bold mb-6 text-center">Log Transaction</h2>
      <TransactionForm />
    </div>
  );
}
