"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

// 常见跨境收款国家/地区预设费率结构（可根据 PayPal 官方最新标准微调）
const PRESET_REGIONS = [
  {
    id: "us-intl",
    name: "US Freelancer receiving International Payment",
    basePercent: 4.49, // 2.99% 国内商业标准 + 1.50% 跨境附加费
    fixedFee: 0.49,
    currencySymbol: "$",
    currencyCode: "USD",
    note: "Standard US Commercial rate (2.99%) + 1.50% cross-border fee + $0.49 fixed fee.",
  },
  {
    id: "uk-intl",
    name: "UK Freelancer receiving Non-EEA / US Payment",
    basePercent: 4.89, // 2.90% + 1.99% 跨区附加费
    fixedFee: 0.30,
    currencySymbol: "£",
    currencyCode: "GBP",
    note: "UK Commercial rate (2.90%) + 1.99% international fee + £0.30 fixed fee.",
  },
  {
    id: "eu-intl",
    name: "EU Freelancer receiving Non-EEA Payment",
    basePercent: 4.89,
    fixedFee: 0.35,
    currencySymbol: "€",
    currencyCode: "EUR",
    note: "EEA Commercial rate (2.90%) + 1.99% non-EEA cross-border fee + €0.35 fixed fee.",
  },
  {
    id: "in-intl",
    name: "India / APAC Exporter receiving USD",
    basePercent: 4.40,
    fixedFee: 0.30,
    currencySymbol: "$",
    currencyCode: "USD",
    note: "Standard export/international commercial rate (4.40% + $0.30 fixed fee).",
  },
  {
    id: "custom",
    name: "Custom PayPal Rate (Manual Input)",
    basePercent: 4.49,
    fixedFee: 0.49,
    currencySymbol: "$",
    currencyCode: "USD",
    note: "Customize your exact negotiated PayPal merchant rate below.",
  },
];

export default function PayPalInternationalFeeCalculator() {
  // 计算模式：'forward' (正向：算实收) | 'reverse' (反向：算开票金额)
  const [mode, setMode] = useState<"forward" | "reverse">("forward");
  const [amountInput, setAmountInput] = useState<string>("1000");
  const [selectedRegionId, setSelectedRegionId] = useState<string>("us-intl");
  const [customPercent, setCustomPercent] = useState<string>("4.49");
  const [customFixed, setCustomFixed] = useState<string>("0.49");
  const [includeFxConversion, setIncludeFxConversion] = useState<boolean>(true);
  const [fxSpreadPercent, setFxSpreadPercent] = useState<string>("3.5");
  const [copied, setCopied] = useState<boolean>(false);

  const activeRegion = useMemo(
    () => PRESET_REGIONS.find((r) => r.id === selectedRegionId) || PRESET_REGIONS[0],
    [selectedRegionId]
  );

  // 切换地区时同步更新费率输入框
  const handleRegionChange = (regionId: string) => {
    setSelectedRegionId(regionId);
    const found = PRESET_REGIONS.find((r) => r.id === regionId);
    if (found && regionId !== "custom") {
      setCustomPercent(found.basePercent.toString());
      setCustomFixed(found.fixedFee.toString());
    }
  };

  // 核心正向与反向计算逻辑
  const results = useMemo(() => {
    const rawAmount = parseFloat(amountInput);
    const amount = isNaN(rawAmount) || rawAmount < 0 ? 0 : rawAmount;

    const pRate = (parseFloat(customPercent) || 0) / 100;
    const fFee = parseFloat(customFixed) || 0;
    const fxRate = includeFxConversion ? (parseFloat(fxSpreadPercent) || 0) / 100 : 0;

    if (amount === 0) {
      return {
        invoiceAmount: 0,
        paypalFee: 0,
        fxLoss: 0,
        totalDeductions: 0,
        netReceived: 0,
        effectiveFeePercent: 0,
      };
    }

    if (mode === "forward") {
      // 正向计算：客户支付 amount，扣除 PayPal 固定及比例费用，再扣除换汇隐形点差
      const paypalFee = amount * pRate + fFee;
      const afterPaypal = Math.max(0, amount - paypalFee);
      const fxLoss = afterPaypal * fxRate;
      const netReceived = Math.max(0, afterPaypal - fxLoss);
      const totalDeductions = amount - netReceived;
      const effectiveFeePercent = (totalDeductions / amount) * 100;

      return {
        invoiceAmount: amount,
        paypalFee,
        fxLoss,
        totalDeductions,
        netReceived,
        effectiveFeePercent,
      };
    } else {
      // 反向计算：希望最终落袋净收入 = amount，反推需要给客户开具多少发票金额 (Invoice Amount)
      // 公式推导：Net = (Invoice * (1 - pRate) - fFee) * (1 - fxRate)
      // => Invoice = (Net / (1 - fxRate) + fFee) / (1 - pRate)
      const effectiveRetention = (1 - pRate) * (1 - fxRate);
      if (effectiveRetention <= 0) {
        return {
          invoiceAmount: 0,
          paypalFee: 0,
          fxLoss: 0,
          totalDeductions: 0,
          netReceived: amount,
          effectiveFeePercent: 0,
        };
      }

      const preFxNeeded = amount / (1 - fxRate);
      const invoiceAmount = (preFxNeeded + fFee) / (1 - pRate);
      const paypalFee = invoiceAmount * pRate + fFee;
      const fxLoss = preFxNeeded - amount;
      const totalDeductions = invoiceAmount - amount;
      const effectiveFeePercent = (totalDeductions / invoiceAmount) * 100;

      return {
        invoiceAmount,
        paypalFee,
        fxLoss,
        totalDeductions,
        netReceived: amount,
        effectiveFeePercent,
      };
    }
  }, [amountInput, mode, customPercent, customFixed, includeFxConversion, fxSpreadPercent]);

  const formatMoney = (val: number) => {
    return val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleCopyInvoiceAmount = () => {
    const textToCopy = results.invoiceAmount.toFixed(2);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // JSON-LD 结构化数据（助力 Google 富媒体搜索摘要 & AI 搜索引擎引用）
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "PayPal International Fee & Reverse Invoice Calculator",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "Free online PayPal cross-border fee calculator and reverse invoice generator for freelancers and international contractors.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How much does PayPal charge for international commercial payments?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For most US-based freelancers receiving international business payments, PayPal charges a standard domestic commercial rate (around 2.99%) plus a 1.50% cross-border fee (totaling 4.49%) plus a fixed currency fee (e.g., $0.49 USD). If currency conversion is required, PayPal adds an additional 3% to 4% currency conversion spread.",
            },
          },
          {
            "@type": "Question",
            name: "How do I calculate how much to invoice a client so I receive an exact amount after PayPal fees?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "To pass PayPal fees onto your client legally and accurately, switch our calculator to Reverse Invoice Mode. Enter your desired net payout, and the tool applies the reverse formula: Invoice Amount = (Desired Net / (1 - FX Rate) + Fixed Fee) / (1 - Percentage Fee).",
            },
          },
          {
            "@type": "Question",
            name: "Why is PayPal's exchange rate different from Google's mid-market rate?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "PayPal builds a currency conversion spread (typically 3.0% to 4.0% above the wholesale mid-market exchange rate) whenever you receive funds in a foreign currency or withdraw to a local bank account in a different currency.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* 注入结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 顶部 Hero 区域 */}
      <section className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
            <span>Cross-Border Payment Tool</span>
            <span>•</span>
            <span>Updated for 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            PayPal International Fee & Reverse Invoice Calculator
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Instantly calculate PayPal cross-border merchant fees, fixed currency charges, and
            hidden FX conversion spreads—or reverse-calculate the exact invoice amount to charge
            international clients so you receive your full target rate.
          </p>
        </div>
      </section>

      {/* 核心计算器交互区 */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-16">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          {/* 模式切换 Tab */}
          <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-100/70">
            <button
              type="button"
              onClick={() => setMode("forward")}
              className={`py-4 px-4 text-sm sm:text-base font-semibold transition-all flex items-center justify-center gap-2 ${
                mode === "forward"
                  ? "bg-white text-slate-900 border-b-2 border-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>1. Calculate Net Payout</span>
              <span className="hidden sm:inline text-xs font-normal text-slate-500">
                (Client Pays → You Get)
              </span>
            </button>
            <button
              type="button"
              onClick={() => setMode("reverse")}
              className={`py-4 px-4 text-sm sm:text-base font-semibold transition-all flex items-center justify-center gap-2 ${
                mode === "reverse"
                  ? "bg-white text-slate-900 border-b-2 border-amber-500 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>2. Reverse Invoice Mode</span>
              <span className="hidden sm:inline text-xs font-normal text-slate-500">
                (Target Net → Invoice Amount)
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* 左侧：参数输入面板 */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-200">
              {/* 金额输入 */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  {mode === "forward"
                    ? `Gross Invoice Amount Client Sends (${activeRegion.currencyCode})`
                    : `Desired Net Payout You Want to Receive (${activeRegion.currencyCode})`}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 font-semibold text-lg">
                    {activeRegion.currencySymbol}
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amountInput}
                    onChange={(e) => setAmountInput(e.target.value)}
                    placeholder="1000.00"
                    className="w-full pl-10 pr-4 py-3.5 text-xl font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                  />
                </div>
                {/* 快捷金额按钮 */}
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {[250, 500, 1000, 2500, 5000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmountInput(preset.toString())}
                      className="px-3 py-1 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition"
                    >
                      {activeRegion.currencySymbol}
                      {preset.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* 地区/费率预设选择 */}
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Account Region & Cross-Border Corridor
                </label>
                <select
                  value={selectedRegionId}
                  onChange={(e) => handleRegionChange(e.target.value)}
                  className="w-full px-3.5 py-3 text-sm font-medium text-slate-800 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none"
                >
                  {PRESET_REGIONS.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-slate-500">{activeRegion.note}</p>
              </div>

              {/* 自定义微调比例与固定费用 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Transaction Fee (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="50"
                      value={customPercent}
                      onChange={(e) => {
                        setSelectedRegionId("custom");
                        setCustomPercent(e.target.value);
                      }}
                      className="w-full px-3.5 py-2.5 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-slate-400 text-sm">
                      %
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Fixed Fee ({activeRegion.currencyCode})
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 text-sm">
                      {activeRegion.currencySymbol}
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={customFixed}
                      onChange={(e) => {
                        setSelectedRegionId("custom");
                        setCustomFixed(e.target.value);
                      }}
                      className="w-full pl-7 pr-3.5 py-2.5 text-sm font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 货币转换点差开关 */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-slate-800 block">
                      Include Currency Conversion Spread (FX Markup)
                    </span>
                    <span className="text-xs text-slate-500">
                      Applies when withdrawing or converting to a different currency
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeFxConversion}
                    onChange={(e) => setIncludeFxConversion(e.target.checked)}
                    className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                  />
                </div>

                {includeFxConversion && (
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-4">
                    <label className="text-xs font-medium text-slate-700">
                      Estimated PayPal FX Spread (%):
                    </label>
                    <div className="w-28 relative">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="15"
                        value={fxSpreadPercent}
                        onChange={(e) => setFxSpreadPercent(e.target.value)}
                        className="w-full px-3 py-1.5 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-lg outline-none"
                      />
                      <span className="absolute inset-y-0 right-2.5 flex items-center text-slate-400 text-xs">
                        %
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 右侧：计算结果看板 */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-900 text-white flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  {mode === "forward" ? "Estimated Net Payout" : "Recommended Invoice Amount"}
                </div>

                <div className="flex items-baseline gap-2 my-2">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-amber-400">
                    {activeRegion.currencySymbol}
                    {formatMoney(
                      mode === "forward" ? results.netReceived : results.invoiceAmount
                    )}
                  </span>
                  <span className="text-sm font-medium text-slate-400">
                    {activeRegion.currencyCode}
                  </span>
                </div>

                {mode === "reverse" && (
                  <div className="mt-3 mb-5">
                    <button
                      type="button"
                      onClick={handleCopyInvoiceAmount}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-white transition"
                    >
                      <svg
                        className="w-4 h-4 text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      {copied ? "Copied Invoice Amount!" : "Copy Exact Invoice Amount"}
                    </button>
                  </div>
                )}

                {/* 明细拆解列表 */}
                <div className="mt-6 pt-6 border-t border-slate-800 space-y-3.5 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Gross Invoice Total</span>
                    <span className="font-semibold text-white">
                      {activeRegion.currencySymbol}
                      {formatMoney(results.invoiceAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">
                      PayPal Processing Fee ({customPercent}% + {activeRegion.currencySymbol}
                      {customFixed})
                    </span>
                    <span className="font-semibold text-rose-400">
                      -{activeRegion.currencySymbol}
                      {formatMoney(results.paypalFee)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">
                      FX Conversion Spread ({includeFxConversion ? `${fxSpreadPercent}%` : "0%"})
                    </span>
                    <span className="font-semibold text-rose-400">
                      -{activeRegion.currencySymbol}
                      {formatMoney(results.fxLoss)}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
                    <span className="text-slate-300 font-medium">Total Fees & FX Loss</span>
                    <span className="font-bold text-rose-400">
                      -{activeRegion.currencySymbol}
                      {formatMoney(results.totalDeductions)} (
                      {results.effectiveFeePercent.toFixed(2)}%)
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-medium">Final Net Received</span>
                    <span className="font-bold text-emerald-400">
                      {activeRegion.currencySymbol}
                      {formatMoney(results.netReceived)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 底部省钱提示 */}
              <div className="mt-8 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 leading-relaxed">
                <strong className="text-amber-400">Pro Tip:</strong> Total cross-border deduction
                is <span className="font-semibold text-white">{results.effectiveFeePercent.toFixed(2)}%</span>.
                For invoices over $2,000, compare{" "}
                <Link
                  href="/wise-vs-payoneer-fee-comparison"
                  className="underline text-blue-400 hover:text-blue-300"
                >
                  Wise vs. Payoneer
                </Link>{" "}
                to save up to 70% on FX spreads.
              </div>
            </div>
          </div>
        </div>

        {/* 下方英文 SEO 指南与 FAQ 区域（提升 Google 收录与长尾关键词权重） */}
        <article className="mt-14 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-10">
          {/* 使用指南 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              How to Use the PayPal International Fee Calculator
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Receiving cross-border payments as a freelancer, remote contractor, or digital agency
              involves multiple layers of fees that are often obscured until funds hit your bank
              account. Our calculator breaks down every deduction into three clear steps:
            </p>
            <ol className="list-decimal pl-5 space-y-2.5 text-slate-700 leading-relaxed">
              <li>
                <strong>Choose Forward or Reverse Mode:</strong> Use{" "}
                <em>Calculate Net Payout</em> to see what lands in your account from an existing
                offer. Switch to <em>Reverse Invoice Mode</em> when drafting a client invoice so
                PayPal fees are factored into your billed total.
              </li>
              <li>
                <strong>Select Your Sender/Receiver Corridor:</strong> Pick your home region preset
                (US, UK, EU, or APAC) or enter your custom merchant rate if you qualify for high-volume
                PayPal discounts.
              </li>
              <li>
                <strong>Account for Currency Conversion (FX Spread):</strong> If your client pays
                in USD and you withdraw in EUR, GBP, or local currency, keep the FX spread toggle
                active (typically 3.0%–4.0%) to avoid overestimating your true take-home income.
              </li>
            </ol>
          </section>

          {/* 计算公式揭秘 */}
          <section className="space-y-4 border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-bold text-slate-900">
              The Exact Reverse PayPal Invoice Formula
            </h2>
            <p className="text-slate-600 leading-relaxed">
              A common mistake among freelancers is simply adding 4.5% to their rate (e.g., billing
              $1,045 to receive $1,000). Because PayPal charges its percentage fee on the{" "}
              <em>entire gross invoice amount</em>, adding 4.5% still leaves you short. The true
              mathematical formula to protect your net margin is:
            </p>
            <div className="p-4 bg-slate-900 text-amber-300 font-mono text-xs sm:text-sm rounded-xl overflow-x-auto">
              Invoice Amount = [ (Desired Net Payout ÷ (1 − FX Spread Rate)) + Fixed Fee ] ÷ (1 −
              PayPal Percentage Rate)
            </div>
            <p className="text-sm text-slate-500">
              Note: Always check your local jurisdiction and PayPal User Agreement regarding
              surcharging rules. Rather than listing a separate &ldquo;PayPal surcharge&rdquo; line
              item, most consultants incorporate payment processing overhead directly into their
              gross project quote.
            </p>
          </section>

          {/* 常见问题 FAQ */}
          <section className="space-y-6 border-t border-slate-200 pt-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Frequently Asked Questions (FAQ)
            </h2>

            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1.5">
                  1. How much does PayPal charge for international commercial payments?
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  For standard Goods & Services or commercial invoice transactions, PayPal charges
                  your domestic commercial rate (typically 2.90%–2.99%) plus a cross-border
                  international fee of 1.50% to 1.99%, alongside a fixed fee based on the currency
                  received (such as $0.49 USD or £0.30 GBP).
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1.5">
                  2. Can I avoid PayPal&apos;s 3.5%–4% currency conversion fee?
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Yes, in specific scenarios. If you hold a USD balance inside PayPal and have a
                  eligible US domestic bank account (or a multi-currency receiving account that
                  supports ACH transfers without forced conversion), you can withdraw USD directly
                  and convert funds at near interbank rates using specialized FX providers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1.5">
                  3. Are PayPal fees tax-deductible for freelancers?
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Yes. In the United States (IRS Schedule C), UK (HMRC Self Assessment), and most
                  OECD jurisdictions, payment processing fees and merchant transaction charges are
                  100% deductible business expenses. Always record the gross invoice amount as
                  revenue and deduct the PayPal fee separately.
                </p>
              </div>
            </div>
          </section>

          {/* 站内关联工具内链矩阵（提升整站权重流转） */}
          <section className="border-t border-slate-200 pt-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Related Cross-Border Freelance Calculators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/stripe-international-fee-calculator"
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-sm transition group"
              >
                <div className="font-semibold text-slate-900 group-hover:text-blue-600 mb-1">
                  Stripe International Fee Calculator
                </div>
                <p className="text-xs text-slate-500">
                  Compare 2.9% + 1.5% international card & FX fees against PayPal.
                </p>
              </Link>

              <Link
                href="/wise-vs-payoneer-fee-comparison"
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-sm transition group"
              >
                <div className="font-semibold text-slate-900 group-hover:text-blue-600 mb-1">
                  Wise vs. Payoneer Comparison
                </div>
                <p className="text-xs text-slate-500">
                  See how much you save on multi-currency payouts vs. traditional SWIFT.
                </p>
              </Link>

              <Link
                href="/1099-tax-calculator"
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-sm transition group"
              >
                <div className="font-semibold text-slate-900 group-hover:text-blue-600 mb-1">
                  1099 Freelance Tax Estimator
                </div>
                <p className="text-xs text-slate-500">
                  Calculate quarterly self-employment tax after deducting payment fees.
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}