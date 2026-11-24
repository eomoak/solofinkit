"use client";
import { useMemo, useState } from "react";
const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function StripeCalculator() {
  const [mode, setMode] = useState<"forward" | "reverse">("forward");
  const [charge, setCharge] = useState("1000");
  const [target, setTarget] = useState("950");
  const [base, setBase] = useState("2.9");
  const [intl, setIntl] = useState("1.5");
  const [fixed, setFixed] = useState("0.30");
  const [fxOn, setFxOn] = useState(true);
  const [fx, setFx] = useState("1");
  const [payoutFee, setPayoutFee] = useState("0");
  const result = useMemo(() => {
    const p = (Number(base) + Number(intl)) / 100;
    const f = fxOn ? Number(fx) / 100 : 0;
    const fixedFee = Number(fixed), payout = Number(payoutFee);
    const x = Number(mode === "forward" ? charge : target);
    const den = (1 - p) * (1 - f);
    if (![p, f, fixedFee, payout, x].every(Number.isFinite) || p < 0 || p >= 1 || f < 0 || f >= 1 || fixedFee < 0 || payout < 0 || x < 0 || den <= 0) return { error: "Enter valid non-negative amounts and fee rates below 100%." };
    const gross = mode === "forward" ? x : (x + payout + fixedFee * (1 - f)) / den;
    const processing = gross * p + fixedFee;
    const after = Math.max(0, gross - processing);
    const fxCost = after * f;
    const net = Math.max(0, after - fxCost - payout);
    return { gross, processing, fxCost, payout, net };
  }, [mode, charge, target, base, intl, fixed, fxOn, fx, payoutFee]);
  const input = (label: string, value: string, set: (v: string) => void) => (
    <label className="block text-sm font-medium text-slate-700">{label}
      <input type="number" min="0" step="0.01" value={value} onChange={(e) => set(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-base" />
    </label>
  );
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex flex-wrap gap-2">
        <button type="button" onClick={() => setMode("forward")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${mode === "forward" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}>Charge → Net payout</button>
        <button type="button" onClick={() => setMode("reverse")} className={`rounded-lg px-4 py-2 text-sm font-semibold ${mode === "reverse" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}>Target net → Charge</button>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {input(mode === "forward" ? "Customer charge (USD)" : "Target net payout (USD)", mode === "forward" ? charge : target, mode === "forward" ? setCharge : setTarget)}
        {input("Base processing rate (%)", base, setBase)}
        {input("International card add-on (%)", intl, setIntl)}
        {input("Fixed processing fee (USD)", fixed, setFixed)}
        {input("Additional payout fee (USD)", payoutFee, setPayoutFee)}
        <div className="flex items-center gap-3 pt-6">
          <input id="stripe-fx" type="checkbox" checked={fxOn} onChange={(e) => setFxOn(e.target.checked)} className="h-4 w-4" />
          <label htmlFor="stripe-fx" className="text-sm font-medium text-slate-700">Include estimated currency conversion cost</label>
        </div>
        {fxOn && input("FX conversion rate (%)", fx, setFx)}
      </div>
      <div className="mt-7 rounded-xl bg-slate-900 p-5 text-white">
        {"error" in result ? <p className="text-amber-300">{result.error}</p> : <>
          <p className="text-sm text-slate-300">{mode === "forward" ? "Estimated net payout" : "Estimated amount to charge"}</p>
          <p className="mt-1 text-3xl font-bold">{usd(mode === "forward" ? result.net : result.gross)}</p>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-slate-400">Gross charge</p><p className="font-semibold">{usd(result.gross)}</p></div>
            <div><p className="text-slate-400">Processing fee</p><p className="font-semibold">{usd(result.processing)}</p></div>
            <div><p className="text-slate-400">FX cost</p><p className="font-semibold">{usd(result.fxCost)}</p></div>
            <div><p className="text-slate-400">Payout fee</p><p className="font-semibold">{usd(result.payout)}</p></div>
          </div>
        </>}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-slate-500">Illustrative assumptions only. Stripe fees vary by country, account, payment method, card origin, currency, and plan. Verify rates in your Stripe Dashboard.</p>
    </section>
  );
}
