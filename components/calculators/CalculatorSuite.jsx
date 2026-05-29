"use client";

import { useState, useMemo } from "react";
import { INR_FULL } from "@/lib/format";
import { SliderInput, BigStat, StatRow, Legend, GrowthChart, Donut } from "./shared";

/* ─────────────────────────────────────────────────────────
   EXACT calculation helpers — extracted from
   components/calculator/*.jsx without modification
───────────────────────────────────────────────────────── */

/** Monthly rate from annual % (SipSwpCalculator → calculateMonthlyRate) */
function calcMonthlyRate(annualPct) {
  return Math.pow(1 + annualPct / 100, 1 / 12) - 1;
}

/** SIP Future Value – beginning-of-period (SipSwpCalculator → calculateFutureValue) */
function calcSipFV(rate, nper, pmt) {
  if (rate === 0) return pmt * nper;
  const factor = Math.pow(1 + rate, nper);
  return pmt * (1 + rate) * ((factor - 1) / rate);
}

/** SWP monthly withdrawal (SipSwpCalculator → calculateMonthlyWithdrawal) */
function calcSwpWithdrawal(rate, nper, pv) {
  if (rate === 0) return pv / nper;
  const factor = Math.pow(1 + rate, nper);
  return (pv * rate * factor) / (factor - 1);
}

/** EMI calculator (HomeLoanRecoveryCalculator → calculateEMIDetails) */
function calcEMIDetails(loanAmount, interestRate, loanTenure) {
  const monthlyRate = interestRate / 100 / 12;
  const months = loanTenure * 12;
  const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months) /
    (Math.pow(1 + monthlyRate, months) - 1);
  const totalPaid = emi * months;
  const totalInterest = totalPaid - loanAmount;
  return { emi, totalPaid, totalInterest };
}

/**
 * Monthly investment for growing annuity (HomeLoanRecoveryCalculator → calculateMonthlyInvestment)
 * targetAmount = what we want to accumulate
 * investmentReturn % p.a., annualIncrease % step-up, loanTenure years
 */
function calcMonthlyInvestment(targetAmount, investmentReturn, annualIncrease, loanTenure) {
  const monthlyRate = calcMonthlyRate(investmentReturn);
  const r = investmentReturn / 100;
  const g = annualIncrease / 100;
  const n = loanTenure;
  const powRN = Math.pow(1 + r, n);
  const powGN = Math.pow(1 + g, n);
  // Handle r === g edge case
  const mainFactor = Math.abs(r - g) < 0.0001
    ? n * Math.pow(1 + r, n - 1)
    : (powRN - powGN) / (r - g);
  const totalFactor = mainFactor * (r / monthlyRate) * (1 + monthlyRate);
  return totalFactor > 0 ? targetAmount / totalFactor : 0;
}

/* ══════════════════════════════════════════════════════════
   1 · FUTURE WEALTH  (FutureWealthCalculator.jsx logic)
══════════════════════════════════════════════════════════ */
function FutureWealth() {
  const [portfolio,  setPortfolio]  = useState(2500000);
  const [lumpSum,    setLumpSum]    = useState(300000);
  const [monthlySIP, setMonthlySIP] = useState(20000);
  const [retPct,     setRetPct]     = useState(13);
  const [years,      setYears]      = useState(20);

  const calc = useMemo(() => {
    const months      = years * 12;
    const annualRate  = retPct / 100;
    const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;

    const fvPortfolio = portfolio * Math.pow(1 + annualRate, years);
    const fvLumpSum   = annualRate > 0
      ? lumpSum * (1 + annualRate) * (Math.pow(1 + annualRate, years) - 1) / annualRate
      : lumpSum * years;
    const fvSIP       = calcSipFV(monthlyRate, months, monthlySIP);

    const totalFV  = fvPortfolio + fvLumpSum + fvSIP;
    const totalInv = portfolio + lumpSum * years + monthlySIP * months;
    return { totalFV, totalInv, gains: Math.max(0, totalFV - totalInv) };
  }, [portfolio, lumpSum, monthlySIP, retPct, years]);

  const data = useMemo(() => {
    const r  = retPct / 100;
    const mr = Math.pow(1 + r, 1 / 12) - 1;
    return Array.from({ length: years + 1 }, (_, y) => {
      if (y === 0) return { year: 0, invested: portfolio, value: portfolio };
      const fvP = portfolio * Math.pow(1 + r, y);
      const fvL = r > 0 ? lumpSum * (1 + r) * (Math.pow(1 + r, y) - 1) / r : lumpSum * y;
      const fvS = calcSipFV(mr, y * 12, monthlySIP);
      return { year: y, invested: portfolio + lumpSum * y + monthlySIP * y * 12, value: fvP + fvL + fvS };
    });
  }, [portfolio, lumpSum, monthlySIP, retPct, years]);

  return (
    <div className="grid grid-cols-1 gap-12 items-start lg:grid-cols-[380px_1fr] calc-grid">
      <div>
        <SliderInput label="Current Portfolio Value"     value={portfolio}  onChange={setPortfolio}
          min={0} max={50000000} step={100000} format={INR_FULL} />
        <SliderInput label="Lumpsum Investment Every Year" value={lumpSum}  onChange={setLumpSum}
          min={0} max={5000000} step={50000} format={INR_FULL} />
        <SliderInput label="Current Monthly SIP"         value={monthlySIP} onChange={setMonthlySIP}
          min={0} max={500000} step={1000} format={INR_FULL} />
        <SliderInput label="Assumed Portfolio Return (p.a.)" value={retPct} onChange={setRetPct}
          min={5} max={20} step={0.5} format={(v) => v.toFixed(1)} suffix="%" />
        <SliderInput label="Portfolio Value After"       value={years}      onChange={setYears}
          min={1} max={60} suffix="yrs" />

        <div className="flex items-center gap-8 mt-8 pt-6 border-t border-[var(--rule)]">
          <Donut invested={calc.totalInv} gains={calc.gains} size={140} />
          <div className="flex flex-col gap-3.5">
            <Legend color="var(--brand)"   label="Invested"   value={INR_FULL(calc.totalInv)} />
            <Legend color="var(--brand-2)" label="Est. Gains" value={INR_FULL(calc.gains)} />
            <div className="pt-3 border-t border-[var(--rule)] font-[var(--font-display)] text-[32px]">
              {INR_FULL(calc.totalFV)}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-4 text-[12px] font-[var(--font-mono)] text-[var(--fg-muted)] tracking-[0.12em] uppercase">
          <span>Your wealth after {years} years</span>
          <span>{INR_FULL(calc.totalFV)}</span>
        </div>
        <GrowthChart data={data} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   2 · RETIREMENT CORPUS  (RetirementCorpusCalculator.jsx logic)
   Note: formData in original stores % as decimal; here we use
   plain % values and convert when computing.
══════════════════════════════════════════════════════════ */
function RetirementCorpus() {
  const [expense,    setExpense]    = useState(100000);
  const [inflPct,    setInflPct]    = useState(6);
  const [currAge,    setCurrAge]    = useState(35);
  const [retAge,     setRetAge]     = useState(60);
  const [lifeExp,    setLifeExp]    = useState(90);
  const [earnPct,    setEarnPct]    = useState(12);
  const [retirPct,   setRetirPct]   = useState(7);
  const [wealth,     setWealth]     = useState(1500000);

  const calc = useMemo(() => {
    const inflation          = inflPct  / 100;
    const returnDuringEarning    = earnPct  / 100;
    const returnDuringRetirement = retirPct / 100;

    const yearsToRetirement = retAge - currAge;
    const retirementYears   = lifeExp - retAge;
    if (yearsToRetirement <= 0 || retirementYears <= 0) return null;

    // 1. Monthly expense at retirement
    const expenseAtRetirement = expense * Math.pow(1 + inflation, yearsToRetirement);

    // 2. Retirement corpus via real-return annuity
    const realReturn    = (1 + returnDuringRetirement) / (1 + inflation) - 1;
    const annuityFactor = Math.abs(realReturn) < 0.0001
      ? retirementYears
      : (1 - Math.pow(1 + realReturn, -retirementYears)) / realReturn;
    const retirementCorpus = expenseAtRetirement * 12 * annuityFactor;

    // 3. Future value of current wealth
    const fvWealth = wealth * Math.pow(1 + returnDuringEarning, yearsToRetirement);

    // 4. Remaining corpus needed
    const remainingCorpus = Math.max(0, retirementCorpus - fvWealth);

    // 5. Monthly SIP (simple annuity, end-of-period matches original)
    const monthlyRate = returnDuringEarning / 12;
    const months      = yearsToRetirement * 12;
    const denominator = Math.pow(1 + monthlyRate, months) - 1;
    const monthlySIP  = denominator > 0 ? (remainingCorpus * monthlyRate) / denominator : 0;

    return { expenseAtRetirement, retirementCorpus, monthlySIP, yearsToRetirement, retirementYears };
  }, [expense, inflPct, currAge, retAge, lifeExp, earnPct, retirPct, wealth]);

  return (
    <div className="grid grid-cols-1 gap-12 items-start lg:grid-cols-[380px_1fr] calc-grid">
      <div>
        <SliderInput label="Current Monthly Expense"             value={expense}  onChange={setExpense}
          min={10000} max={1000000} step={5000} format={INR_FULL} />
        <SliderInput label="Future Inflation Assumed"            value={inflPct}  onChange={setInflPct}
          min={2} max={15} step={0.5} format={(v) => v.toFixed(1)} suffix="%" />
        <SliderInput label="Current Age"                         value={currAge}
          onChange={(v) => setCurrAge(Math.min(v, retAge - 1))} min={18} max={70} suffix="yrs" />
        <SliderInput label="Age at which I want to Retire"       value={retAge}
          onChange={(v) => setRetAge(Math.max(currAge + 1, v))} min={30} max={80} suffix="yrs" />
        <SliderInput label="Life Expectancy"                     value={lifeExp}
          onChange={(v) => setLifeExp(Math.max(retAge + 1, v))} min={60} max={100} suffix="yrs" />
        <SliderInput label="Assumed Returns During Earning Years"    value={earnPct}  onChange={setEarnPct}
          min={4} max={20} step={0.5} format={(v) => v.toFixed(1)} suffix="%" />
        <SliderInput label="Assumed Returns During Retirement Years" value={retirPct} onChange={setRetirPct}
          min={4} max={15} step={0.5} format={(v) => v.toFixed(1)} suffix="%" />
        <SliderInput label="Current Wealth Allocated for Retirement" value={wealth}   onChange={setWealth}
          min={0} max={50000000} step={100000} format={INR_FULL} />
      </div>

      <div className="grid gap-4">
        {calc ? (
          <>
            <BigStat
              label={`Monthly Expense at Start of Retirement Age (${retAge})`}
              value={INR_FULL(calc.expenseAtRetirement)} />
            <BigStat
              label="Retirement Corpus Required"
              value={INR_FULL(calc.retirementCorpus)} />
            <BigStat
              label="Monthly SIP Required to Achieve the Retirement Corpus"
              value={INR_FULL(calc.monthlySIP)} />
            <div className="p-4 bg-[var(--paper-2)] rounded-xl border border-[var(--rule)]">
              <StatRow label="Years to retirement" value={`${calc.yearsToRetirement} yrs`} />
              <StatRow label="Years of retirement" value={`${calc.retirementYears} yrs`} />
              <StatRow label="Earning returns"     value={`${earnPct}%`} />
              <StatRow label="Retirement returns"  value={`${retirPct}%`} />
            </div>
          </>
        ) : (
          <p className="text-sm text-[var(--fg-muted)]">
            Retirement Age must be &gt; Current Age, and Life Expectancy &gt; Retirement Age.
          </p>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   3 · SIP + SWP  (SipSwpCalculator.jsx logic)
══════════════════════════════════════════════════════════ */
function SipSwp() {
  const [monthlySIP,      setMonthlySIP]      = useState(5000);
  const [sipPeriod,       setSipPeriod]       = useState(20);
  const [withdrawalPeriod,setWithdrawalPeriod]= useState(20);
  const [sipReturn,       setSipReturn]       = useState(12);
  const [swpReturn,       setSwpReturn]       = useState(8);

  const calc = useMemo(() => {
    const sipMonths          = sipPeriod * 12;
    const rSipMonthly        = calcMonthlyRate(sipReturn);
    const totalCorpus        = calcSipFV(rSipMonthly, sipMonths, monthlySIP);
    const totalInvested      = monthlySIP * sipMonths;
    const wealthGained       = totalCorpus - totalInvested;

    const withdrawalMonths   = withdrawalPeriod * 12;
    const rSwpMonthly        = calcMonthlyRate(swpReturn);
    const monthlyWithdrawal  = calcSwpWithdrawal(rSwpMonthly, withdrawalMonths, totalCorpus);

    return { totalCorpus, totalInvested, wealthGained, monthlyWithdrawal };
  }, [monthlySIP, sipPeriod, withdrawalPeriod, sipReturn, swpReturn]);

  const data = useMemo(() => Array.from({ length: sipPeriod + 1 }, (_, y) => ({
    year:     y,
    invested: monthlySIP * y * 12,
    value:    y === 0 ? 0 : calcSipFV(calcMonthlyRate(sipReturn), y * 12, monthlySIP),
  })), [monthlySIP, sipPeriod, sipReturn]);

  return (
    <div className="grid grid-cols-1 gap-12 items-start lg:grid-cols-[380px_1fr] calc-grid">
      <div>
        <SliderInput label="Monthly SIP Amount"                     value={monthlySIP}       onChange={setMonthlySIP}
          min={500} max={10000000} step={500} format={INR_FULL} />
        <SliderInput label="SIP Period"                             value={sipPeriod}        onChange={setSipPeriod}
          min={1} max={50} suffix="yrs" />
        <SliderInput label="Withdrawal Period"                      value={withdrawalPeriod} onChange={setWithdrawalPeriod}
          min={1} max={50} suffix="yrs" />
        <SliderInput label="Assumed Return During SIP Period"       value={sipReturn}        onChange={setSipReturn}
          min={4} max={18} step={0.5} format={(v) => v.toFixed(1)} suffix="%" />
        <SliderInput label="Assumed Return During Withdrawal Period" value={swpReturn}       onChange={setSwpReturn}
          min={4} max={18} step={0.5} format={(v) => v.toFixed(1)} suffix="%" />

        <div className="mt-8 pt-6 border-t border-[var(--rule)] grid gap-3.5">
          <StatRow label={`Accumulated Corpus after ${sipPeriod} years`} value={INR_FULL(calc.totalCorpus)} big />
          <StatRow label={`Monthly Withdrawal for ${withdrawalPeriod} years`} value={INR_FULL(calc.monthlyWithdrawal)} />
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-4 text-[12px] font-[var(--font-mono)] text-[var(--fg-muted)] tracking-[0.12em] uppercase">
          <span>SIP accumulation over {sipPeriod} years</span>
          <span>{INR_FULL(calc.totalCorpus)}</span>
        </div>
        <GrowthChart data={data} />
        <div className="mt-4 grid grid-cols-2 gap-4">
          <BigStat label={`Corpus after ${sipPeriod} yrs`}           value={INR_FULL(calc.totalCorpus)} />
          <BigStat label={`Monthly SWP for ${withdrawalPeriod} yrs`} value={INR_FULL(calc.monthlyWithdrawal)} />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   4 · HOME LOAN RECOVERY  (HomeLoanRecoveryCalculator.jsx logic)
══════════════════════════════════════════════════════════ */
function HomeLoanRecovery() {
  const [mode,       setMode]       = useState("loan");   // "loan" | "emi"
  const [loanAmount, setLoanAmount] = useState(3000000);
  const [intRate,    setIntRate]    = useState(9);
  const [emiInput,   setEmiInput]   = useState(30000);
  const [tenure,     setTenure]     = useState(20);
  const [invRet,     setInvRet]     = useState(13);
  const [stepUp,     setStepUp]     = useState(10);

  const calc = useMemo(() => {
    let emi, totalPaid, totalInterest;

    if (mode === "loan") {
      const d = calcEMIDetails(loanAmount, intRate, tenure);
      emi = d.emi; totalPaid = d.totalPaid; totalInterest = d.totalInterest;
    } else {
      emi = emiInput;
      totalPaid = emiInput * tenure * 12;
      // estimate interest (need rate to get principal)
      const loanMr = intRate / 100 / 12;
      const months = tenure * 12;
      const principal = loanMr > 0
        ? emiInput * (1 - Math.pow(1 + loanMr, -months)) / loanMr
        : emiInput * months;
      totalInterest = Math.max(0, totalPaid - principal);
    }

    // targetAmount = total paid (emi-loan mode) per original calculateTargetAmount
    const targetAmount      = totalPaid;
    const monthlyInvestment = calcMonthlyInvestment(targetAmount, invRet, stepUp, tenure);

    return { emi, totalPaid, totalInterest, monthlyInvestment };
  }, [mode, loanAmount, intRate, emiInput, tenure, invRet, stepUp]);

  const data = useMemo(() => Array.from({ length: tenure + 1 }, (_, y) => ({
    year:     y,
    invested: calc.monthlyInvestment * y * 12,
    value:    y === 0 ? 0 : calcSipFV(calcMonthlyRate(invRet), y * 12, calc.monthlyInvestment),
  })), [calc.monthlyInvestment, tenure, invRet]);

  return (
    <div className="grid grid-cols-1 gap-12 items-start lg:grid-cols-[380px_1fr] calc-grid">
      <div>
        <div className="flex gap-2 mb-5">
          {[["loan", "I know Loan Amount"], ["emi", "I know Monthly EMI"]].map(([v, lbl]) => (
            <button key={v} onClick={() => setMode(v)}
              className={`flex-1 py-2 text-[12px] rounded-lg font-medium border transition-colors ${
                mode === v
                  ? "bg-[var(--brand)] text-[var(--on-brand)] border-[var(--brand)]"
                  : "bg-transparent text-[var(--fg-muted)] border-[var(--rule)]"
              }`}>
              {lbl}
            </button>
          ))}
        </div>

        {mode === "loan"
          ? <SliderInput label="Outstanding Loan Amount" value={loanAmount} onChange={setLoanAmount}
              min={100000} max={100000000} step={100000} format={INR_FULL} />
          : <SliderInput label="Monthly EMI"             value={emiInput}   onChange={setEmiInput}
              min={1000} max={500000} step={1000} format={INR_FULL} />
        }
        <SliderInput label="Rate of Interest"                        value={intRate} onChange={setIntRate}
          min={5} max={15} step={0.25} format={(v) => v.toFixed(2)} suffix="%" />
        <SliderInput label="Loan Tenure"                             value={tenure}  onChange={setTenure}
          min={1} max={40} suffix="yrs" />
        <SliderInput label="Assuming Return of Investment"           value={invRet}  onChange={setInvRet}
          min={6} max={18} step={0.5} format={(v) => v.toFixed(1)} suffix="%" />
        <SliderInput label="Annual Increase in Monthly Investment"   value={stepUp}  onChange={setStepUp}
          min={0} max={30} suffix="%" />

        <div className="mt-8 pt-6 border-t border-[var(--rule)] grid gap-3.5">
          <StatRow label="Monthly EMI"         value={INR_FULL(calc.emi)} big />
          <StatRow label="Total Amount Paid"   value={INR_FULL(calc.totalPaid)} />
          <StatRow label="Total Interest Paid" value={INR_FULL(calc.totalInterest)} />
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-4 text-[12px] font-[var(--font-mono)] text-[var(--fg-muted)] tracking-[0.12em] uppercase">
          <span>Monthly investment to recover total amount</span>
          <span>{INR_FULL(calc.monthlyInvestment)}/mo</span>
        </div>
        <GrowthChart data={data} />
        <div className="mt-4 grid grid-cols-2 gap-4">
          <BigStat label="Monthly Investment Needed" value={INR_FULL(calc.monthlyInvestment)} />
          <BigStat label="Amount to Recover"         value={INR_FULL(calc.totalPaid)} />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   5 · GOAL CALCULATOR  (GoalCalculator.jsx logic)
══════════════════════════════════════════════════════════ */
function GoalCalc() {
  const [goalToday, setGoalToday] = useState(5000000);
  const [yearsLeft, setYearsLeft] = useState(15);
  const [inflPct,   setInflPct]   = useState(7);
  const [retPct,    setRetPct]    = useState(13);
  const [currInv,   setCurrInv]   = useState(2000000);

  const calc = useMemo(() => {
    // GoalCalculator.jsx → calculateResults
    const futureGoalValue     = goalToday * Math.pow(1 + inflPct / 100, yearsLeft);
    const futureValueOfCurrent = currInv  * Math.pow(1 + retPct  / 100, yearsLeft);
    const additionalNeeded    = Math.max(0, futureGoalValue - futureValueOfCurrent);

    let monthlySIP = 0;
    if (additionalNeeded > 0) {
      const monthlyRate = calcMonthlyRate(retPct);
      const totalMonths = yearsLeft * 12;
      const fvFactor    = (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
      // "beginning" payment type (as in original paymentType === "beginning")
      monthlySIP = additionalNeeded / (fvFactor * (1 + monthlyRate));
    }

    const progress           = Math.min(100, (futureValueOfCurrent / futureGoalValue) * 100);
    const isGoalAchievable   = futureValueOfCurrent >= futureGoalValue;

    return { futureGoalValue, futureValueOfCurrent, additionalNeeded, monthlySIP, progress, isGoalAchievable };
  }, [goalToday, yearsLeft, inflPct, retPct, currInv]);

  const data = useMemo(() => Array.from({ length: yearsLeft + 1 }, (_, y) => ({
    year:     y,
    invested: currInv + calc.monthlySIP * y * 12,
    value:    y === 0
      ? currInv
      : currInv * Math.pow(1 + retPct / 100, y) + calcSipFV(calcMonthlyRate(retPct), y * 12, calc.monthlySIP),
  })), [currInv, calc.monthlySIP, yearsLeft, retPct]);

  return (
    <div className="grid grid-cols-1 gap-12 items-start lg:grid-cols-[380px_1fr] calc-grid">
      <div>
        <SliderInput label="Amount Required Today to Achieve My Goal" value={goalToday} onChange={setGoalToday}
          min={100000} max={1000000000} step={100000} format={INR_FULL} />
        <SliderInput label="Years Left"                               value={yearsLeft} onChange={setYearsLeft}
          min={1} max={40} suffix="yrs" />
        <SliderInput label="Yearly Inflation Assumed"                 value={inflPct}   onChange={setInflPct}
          min={2} max={15} step={0.5} format={(v) => v.toFixed(1)} suffix="%" />
        <SliderInput label="Returns Expected on Investment"           value={retPct}    onChange={setRetPct}
          min={6} max={20} step={0.5} format={(v) => v.toFixed(1)} suffix="%" />
        <SliderInput label="Value of Investment Allocated for Goal"   value={currInv}   onChange={setCurrInv}
          min={0} max={100000000} step={100000} format={INR_FULL} />

        <div className="flex items-center gap-8 mt-8 pt-6 border-t border-[var(--rule)]">
          <Donut invested={calc.futureValueOfCurrent} gains={Math.max(0, calc.futureGoalValue - calc.futureValueOfCurrent)} size={140} />
          <div className="flex flex-col gap-3.5">
            <Legend color="var(--brand)"   label="Current FV"    value={INR_FULL(calc.futureValueOfCurrent)} />
            <Legend color="var(--brand-2)" label="Still Needed"  value={INR_FULL(calc.additionalNeeded)} />
            <div className="pt-3 border-t border-[var(--rule)] font-[var(--font-display)] text-[32px]">
              {INR_FULL(calc.futureGoalValue)}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <BigStat label={`Goal Value after ${yearsLeft} yrs`} value={INR_FULL(calc.futureGoalValue)} />
          <BigStat
            label={calc.isGoalAchievable ? "Goal Achievable!" : "Monthly Investment Required"}
            value={calc.isGoalAchievable ? "On Track ✓" : INR_FULL(calc.monthlySIP)} />
        </div>
        <div className="flex justify-between mb-4 text-[12px] font-[var(--font-mono)] text-[var(--fg-muted)] tracking-[0.12em] uppercase">
          <span>Corpus growth over {yearsLeft} years</span>
          <span>{INR_FULL(data[data.length - 1]?.value ?? 0)}</span>
        </div>
        <GrowthChart data={data} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   CALCULATOR SUITE  (same tab shell UI as before)
══════════════════════════════════════════════════════════ */
const CALC_LIST = [
  { id: "future",     title: "Future Wealth",      subtitle: "Portfolio + Lumpsum + SIP compounded over time",              Comp: FutureWealth    },
  { id: "retirement", title: "Retirement Corpus",  subtitle: "Corpus needed & monthly SIP to retire comfortably",          Comp: RetirementCorpus },
  { id: "sipswp",     title: "SIP + SWP",          subtitle: "Accumulate with SIP, then withdraw monthly with SWP",        Comp: SipSwp          },
  { id: "homeloan",   title: "Home Loan Recovery", subtitle: "Monthly investment to recover total amount paid to bank",    Comp: HomeLoanRecovery },
  { id: "goal",       title: "Goal",               subtitle: "Monthly SIP needed to reach a specific financial goal",      Comp: GoalCalc        },
];

export default function CalculatorSuite({ initial = "future" }) {
  const [active, setActive] = useState(
    CALC_LIST.find((c) => c.id === initial) ? initial : "future"
  );
  const { Comp, subtitle, title } = CALC_LIST.find((c) => c.id === active);

  return (
    <div>
      {/* Tab bar — same style as before */}
      <div className="flex gap-2 mb-8 flex-wrap overflow-x-auto">
        {CALC_LIST.map((c) => (
          <button key={c.id} onClick={() => setActive(c.id)}
            className="border-0 px-4 py-2.5 rounded-full font-[var(--font-sans)] text-[13px] font-medium cursor-pointer whitespace-nowrap transition-colors"
            style={{
              background : active === c.id ? "var(--brand)"    : "var(--rule)",
              color      : active === c.id ? "var(--on-brand)" : "var(--fg-muted)",
            }}>
            {c.title}
          </button> 
        ))}
      </div>

      {/* Calculator header */}
      <div className="mb-8">
        <div className="eyebrow mb-2">Calculator · {title}</div>
        <h3 className="text-[32px] text-[var(--fg)]">{subtitle}</h3>
      </div>

      <Comp />

      <style>{`
        @media (max-width: 880px) {
          .calc-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}

export { CalculatorSuite };
