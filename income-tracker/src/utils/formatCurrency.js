export default function formatCurrency(amount) {
  const n = Number(amount) || 0;
  return `$${n.toFixed(2)}`;
}
