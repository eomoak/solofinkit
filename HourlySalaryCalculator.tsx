"use client";

import { useMemo, useState } from "react";

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });
const n = (v: string) => Math.max(0, Number.parseFloat(v) || 0);

export default function HourlySalaryCalculator() {
  const [mode, setMode] = useState<"hourly" | "salary">("hourly");
  const [rate, setRate] = useState("50");
  const [salary, setSalary] = useState("100000");
  const [hours, setHours] = useState("40");
  const [weeks, setWeeks] = useState("48");
  const [nonBillable, setNonBillable] = useState("15");
  const [reserve, setReserve] = useState("20");

  const result = useMemo(() => {
    const weeklyHours = n(hours);
    const workWeeks = n(weeks);
    const admin = Math.min(100, n(nonBillable)) / 100;
    const reserveRate = Math.min(100, n(reserve)) / 100;
    const annualHours = weeklyHours * workWeeks;
    const gross = mode === "hourly" ? n(rate) * annualHours : n(salary);
    const hourlyRate = mode === "hourly" ? n(rate) : (annualHours > 0 ? gross / annualHours : 0);
    const monthly = gross / 12;
    const effectiveHours = annualHours * (1 - admin);
    const effectiveRate = effectiveHours > 0 ? gross / effectiveHours : 0;
    return { annualHours, gross, monthly, hourlyRate, effectiveRate, afterReserve: gross * (1 - reserveRate), adminHours: annualHours * admin };
  }, [mode, rate, salary, hours, weeks, nonBillable, reserve]);

  const field = (label: string, value: string, set: (v: string) => void, suffix = "") => (
    <label className="block text-sm font-medium text-slate-700">{label}
      <div className="relative mt-1"><input type="number" min="0" step="0.01" value={value} onChange={(e) => set(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-10" />{suffix && <span className="absolute right-3 top-2.5 text-sm text-slate-400">{suffix}</span>}</div>
    </label>
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex flex-wrap gap-2">
        <button type="button" onClick={() => setMode("hourly")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${mode === "hourly" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}>Hourly rate → salary</button>
        <button type="button" onClick={() => setMode("salary")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${mode === "salary" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}>Salary → hourly rate</button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {mode === "hourly" ? field("Hourly rate (USD)", rate, setRate) : field("Annual gross salary (USD)", salary, setSalary)}
        {field("Hours per week", hours, setHours)}
        {field("Working weeks per year", weeks, setWeeks)}
        {field("Non-billable time", nonBillable, setNonBillable, "%")}
        {field("Income reserve (planning assumption)", reserve, setReserve, "%")}
      </div>
      <div className="mt-7 rounded-xl bg-slate-900 p-5 text-white">
        <p className="text-sm text-slate-300">Annual gross income</p><p className="mt-1 text-3xl font-bold text-amber-300">{usd(result.gross)}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div><p className="text-sm text-slate-400">Monthly average</p><p className="text-xl font-semibold">{usd(result.monthly)}</p></div>
          <div><p className="text-sm text-slate-400">Nominal hourly rate</p><p className="text-xl font-semibold">{usd(result.hourlyRate)}</p></div>
          <div><p className="text-sm text-slate-400">Effective rate after non-billable time</p><p className="text-xl font-semibold text-emerald-300">{usd(result.effectiveRate)}</p></div>
          <div><p className="text-sm text-slate-400">After selected reserve</p><p className="text-xl font-semibold">{usd(result.afterReserve)}</p></div>
          <div><p className="text-sm text-slate-400">Annual scheduled hours</p><p className="font-semibold">{result.annualHours.toLocaleString("en-US", { maximumFractionDigits: 1 })}</p></div>
          <div><p className="text-sm text-slate-400">Non-billable hours</p><p className="font-semibold">{result.adminHours.toLocaleString("en-US", { maximumFractionDigits: 1 })}</p></div>
        </div>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-slate-500">Effective hourly rate is annual gross divided by estimated productive hours after the non-billable-time allowance. The reserve is a planning percentage, not a tax calculation. Salary mode assumes the entered annual gross is earned over the selected schedule.</p>
    </section>
  );
}
