"use client";
import { useMemo, useState } from "react";
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function FreelanceInvoiceCalculator() {
  const [mode, setMode] = useState<"forward" | "reverse">("forward");
  const [gross, setGross] = useState("5000");
  const [hourly, setHourly] = useState("75");
  const [hours, setHours] = useState("40");
  const [hourlyMode, setHourlyMode] = useState(false);
  const [target, setTarget] = useState("3000");
  const [paymentRate, setPaymentRate] = useState("2.9");
  const [taxRate, setTaxRate] = useState("20");
  const [expenses, setExpenses] = useState("250");
  const result = useMemo(() => {
    const p = Number(paymentRate) / 100, t = Number(taxRate) / 100;
    const e = Number(expenses);
    const amount = mode === "forward" ? (hourlyMode ? Number(hourly) * Number(hours) : Number(gross)) : Number(target);
    const den = 1 - p - t * (1 - p);
    if (![p, t, e, amount].every(Number.isFinite) || p < 0 || p >= 1 || t < 0 || t >= 1 || e < 0 || amount < 0 || den <= 0) return { error: "Enter valid non-negative values and rates below 100%." };
    const invoice = mode === "forward" ? amount : (amount + e) / den;
    const paymentFee = invoice * p;
    const taxReserve = (invoice - paymentFee) * t;
    const net = invoice - paymentFee - taxReserve - e;
    return { invoice, paymentFee, taxReserve, expenses: e, net };
  }, [mode, gross, hourly, hours, hourlyMode, target, paymentRate, taxRate, expenses]);
  const field = (label: string, value: string, set: (v: string) => void) => (
    <label className="block text-sm font-medium text-slate-700">{label}
      <input type="number" min="0" step="0.01" value={value} onChange={(e) => set(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-base" />
    </label>
  );
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex flex-wrap gap-2">
        <button type="button" onClick={() => setMode("forward")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${mode === "forward" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}>Invoice → Take-home</button>
        <button type="button" onClick={() => setMode("reverse")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${mode === "reverse" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}>Target take-home → Invoice</button>
      </div>
      {mode === "forward" && <div className="mb-5 rounded-lg bg-slate-50 p-3"><label className="flex items-center gap-2 text-sm font-medium text-slate-700"><input type="checkbox" checked={hourlyMode} onChange={(e) => setHourlyMode(e.target.checked)} /> Calculate invoice from hourly rate × hours</label></div>}
      <div className="grid gap-5 md:grid-cols-2">
        {mode === "forward" ? (hourlyMode ? <>{field("Hourly rate (USD)", hourly, setHourly)}{field("Billable hours", hours, setHours)}</> : field("Gross invoice (USD)", gross, setGross)) : field("Target net take-home (USD)", target, setTarget)}
        {field("Payment processing fee (%)", paymentRate, setPaymentRate)}
        {field("Tax reserve (%)", taxRate, setTaxRate)}
        {field("Fixed business expenses (USD)", expenses, setExpenses)}
      </div>
      <div className="mt-7 rounded-xl bg-slate-900 p-5 text-white">
        {"error" in result ? <p className="text-amber-300">{result.error}</p> : <>
          <p className="text-sm text-slate-300">{mode === "forward" ? "Estimated net take-home" : "Estimated invoice required"}</p>
          <p className="mt-1 text-3xl font-bold">{usd(mode === "forward" ? result.net : result.invoice)}</p>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-slate-400">Gross invoice</p><p className="font-semibold">{usd(result.invoice)}</p></div>
            <div><p className="text-slate-400">Payment fee</p><p className="font-semibold">{usd(result.paymentFee)}</p></div>
            <div><p className="text-slate-400">Tax reserve</p><p className="font-semibold">{usd(result.taxReserve)}</p></div>
            <div><p className="text-slate-400">Business expenses</p><p className="font-semibold">{usd(result.expenses)}</p></div>
          </div>
        </>}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-slate-500">Planning estimate, not tax advice. Tax reserve is modeled as a percentage of revenue after payment fees. Actual taxable income and deductible expenses depend on your jurisdiction and circumstances.</p>
    </section>
  );
}
