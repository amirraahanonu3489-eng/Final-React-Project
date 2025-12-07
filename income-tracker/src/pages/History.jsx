import TransactionList from "../components/TransactionList";

export default function History() {
  return (
    <div className="max-w-4xl mx-auto mt-6">
      <div id="transaction-list" className="bg-white rounded-lg shadow-md p-6 border-2" style={{ borderColor: "#ddd" }}>
        <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
        <TransactionList />
      </div>
    </div>
  );
}
