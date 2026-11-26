"use client";

import { useMemo, useState } from "react";

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });
const num = (s: string) => Math.max(0, Number.parseFloat(s) || 0);

export default function WisePayPalCalculator() {
  const [amount, setAmount] = useState("1000");
  const [paypalPercent, setPaypalPercent] = useState("4.49");
  const [paypalFixed, setPaypalFixed] = useState("0.49");
  const [paypalFx, setPaypalFx] = useState("3.5");
  const [wisePercent, setWisePercent] = useState("0.6");
  const [wiseFixed, setWiseFixed] = useState("0.50");
  const [wiseFx, setWiseFx] = useState("0.4");

  const result = useMemo(() => {
    const gross = num(amount);
    const ppFee = gross * num(paypalPercent) / 100 + num(paypalFixed);
    const ppAfterFee = Math.max(0, gross - ppFee);
    const ppFxCost = ppAfterFee * num(paypalFx) / 100;
    const ppNet = Math.max(0, ppAfterFee - ppFxCost);

    const wiseFee = gross * num(wisePercent) / 100 + num(wiseFixed);
    const wiseAfterFee = Math.max(0, gross - wiseFee);
    const wiseFxCost = wiseAfterFee * num(wiseFx) / 100;
    const wiseNet = Math.max(0, wiseAfterFee - wiseFxCost);

    return { gross, ppFee, ppFxCost, ppNet, wiseFee, wiseFxCost, wiseNet, diff: Math.abs(ppNet - wiseNet) };
  }, [amount, paypalPercent, paypalFixed, paypalFx, wisePercent, wiseFixed, wiseFx]);

  const field = (label: string, value: string, onChange: (v: string) => void, suffix = "") => (
    <label className="block text-sm font-medium text-slate-700">{label}
      <div className="relative mt-1">
        <input type="number" min="0" step="0.01" value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 pr-10 text-base" />
        {suffix && <span className="absolute right-3 top-2.5 text-sm text-slate-400">{suffix}</span>}
      </div>
    </label>
  );

  const copy = async () => {
    const text = `Wise estimated received: ${money(result.wiseNet)}\nPayPal estimated received: ${money(result.ppNet)}`;
    try { await navigator.clipboard.writeText(text); } catch { /* clipboard may be unavailable */ }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        {field("Transfer amount (USD)", amount, setAmount, "USD")}
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">Estimates use your entered assumptions. Exchange-rate spread is modeled separately from the stated transfer fee.</div>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-xl border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-900">PayPal assumptions</h3>
          {field("Percentage fee", paypalPercent, setPaypalPercent, "%")}
          {field("Fixed fee (USD)", paypalFixed, setPaypalFixed, "USD")}
          {field("Estimated FX spread", paypalFx, setPaypalFx, "%")}
        </div>
        <div className="space-y-4 rounded-xl border border-slate-200 p-4">
          <h3 className="font-semibold text-slate-900">Wise assumptions</h3>
          {field("Estimated transfer fee", wisePercent, setWisePercent, "%")}
          {field("Fixed fee (USD)", wiseFixed, setWiseFixed, "USD")}
          {field("Estimated FX spread", wiseFx, setWiseFx, "%")}
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-slate-900 p-5 text-white">
          <p className="text-sm text-slate-300">Wise estimated received</p>
          <p className="mt-1 text-3xl font-bold text-emerald-300">{money(result.wiseNet)}</p>
          <div className="mt-4 space-y-1 text-sm text-slate-300">
            <p>Transfer fee: {money(result.wiseFee)}</p><p>FX cost estimate: {money(result.wiseFxCost)}</p>
          </div>
        </div>
        <div className="rounded-xl bg-slate-900 p-5 text-white">
          <p className="text-sm text-slate-300">PayPal estimated received</p>
          <p className="mt-1 text-3xl font-bold text-amber-300">{money(result.ppNet)}</p>
          <div className="mt-4 space-y-1 text-sm text-slate-300">
            <p>Processing fee: {money(result.ppFee)}</p><p>FX cost estimate: {money(result.ppFxCost)}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-semibold text-slate-800">
          {result.wiseNet > result.ppNet ? "Wise" : result.ppNet > result.wiseNet ? "PayPal" : "Both options"} {result.diff < 0.005 ? "are approximately equal" : `is estimated to leave ${money(result.diff)} more`} under these assumptions.
        </p>
        <button type="button" onClick={copy} className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">Copy comparison</button>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-slate-500">This simplified model assumes the entered fees and FX spreads are applied to the same USD amount. Actual Wise and PayPal routes can differ by sending country, receiving country, currency pair, payment method, funding source, account type, and payout method. Confirm the final quote in each provider’s interface.</p>
    </section>
  );
}
