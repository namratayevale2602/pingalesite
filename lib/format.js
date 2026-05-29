export function INR(n) {
  if (!isFinite(n)) return "₹—";
  const abs = Math.abs(n);
  const s =
    abs >= 1e7
      ? (abs / 1e7).toFixed(2).replace(/\.?0+$/, "") + " Cr"
      : abs >= 1e5
      ? (abs / 1e5).toFixed(2).replace(/\.?0+$/, "") + " L"
      : abs.toLocaleString("en-IN", { maximumFractionDigits: 0 });
  return "₹" + s;
}

export function INR_FULL(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}
