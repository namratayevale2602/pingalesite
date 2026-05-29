// SIP future value: FV = P * (((1+r)^n - 1)/r) * (1+r)
export function sipFV(monthly, years, ratePct) {
  const n = years * 12;
  const r = ratePct / 100 / 12;
  if (r === 0) return monthly * n;
  return monthly * (((Math.pow(1 + r, n) - 1) / r)) * (1 + r);
}

// EMI: P * r * (1+r)^n / ((1+r)^n - 1)
export function calcEMI(principal, years, ratePct) {
  const n = years * 12;
  const r = ratePct / 100 / 12;
  if (r === 0) return principal / n;
  const x = Math.pow(1 + r, n);
  return principal * r * x / (x - 1);
}
