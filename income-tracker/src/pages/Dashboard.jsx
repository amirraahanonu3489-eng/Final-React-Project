import { useEffect, useRef } from "react";
import { useTransactions } from "../context/TransactionContext";
import Chart from "chart.js/auto";
import formatCurrency from "../utils/formatCurrency";

export default function Dashboard() {
  const { transactions } = useTransactions();
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  // calculate totals
  const totals = transactions.reduce(
    (acc, t) => {
      const amt = Number(t.amount) || 0;
      if (t.type === "income") {
        acc.income += amt;
        acc.incomeByCategory[t.category] =
          (acc.incomeByCategory[t.category] || 0) + amt;
      } else {
        acc.expense += amt;
        acc.expenseByCategory[t.category] =
          (acc.expenseByCategory[t.category] || 0) + amt;
      }
      return acc;
    },
    { income: 0, expense: 0, incomeByCategory: {}, expenseByCategory: {} }
  );

  const balance = totals.income - totals.expense;

  useEffect(() => {
    const ctx = canvasRef.current;
    if (!ctx) return;

    // destroy previous chart if exists
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Income", "Expense"],
        datasets: [
          {
            label: "Amount ($)",
            data: [totals.income, totals.expense],
            backgroundColor: ["#34d399", "#f87171"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [totals.income, totals.expense]);

  return (
    <div className="max-w-md mx-auto mt-6 bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 text-center">
          Income vs Expense
        </h2>

       
        <div className="w-full flex justify-center">
          <canvas
            id="expenseChart"
            ref={canvasRef}
            className="w-full max-w-sm h-40"
          />
        </div>
      </div>

      <div className="mb-6 mt-6">
        <p className="text-lg">
          Total Income:{" "}
          <span className="font-semibold text-green-600">
            {formatCurrency(totals.income)}
          </span>
        </p>
        <p className="text-lg">
          Total Expense:{" "}
          <span className="font-semibold text-red-600">
            {formatCurrency(totals.expense)}
          </span>
        </p>
        <p className="text-lg">
          Balance:{" "}
          <span className="font-semibold text-blue-600">
            {formatCurrency(balance)}
          </span>
        </p>
      </div>
    </div>
  );
}
