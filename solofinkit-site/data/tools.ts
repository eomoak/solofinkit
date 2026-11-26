export type ToolStatus = "active" | "upcoming";
export type ToolCategory =
  | "Payment Tools"
  | "Currency Tools"
  | "Tax Tools"
  | "Income Tools"
  | "Guides";
export type ToolKind = "calculator" | "guide";

export interface Tool {
  slug: string;
  name: string;
  shortDesc: string;
  category: ToolCategory;
  status: ToolStatus;
  kind: ToolKind;
  highlight: string;
  relatedSlugs: string[];
}

export const TOOLS: Tool[] = [
  {
    slug: "/paypal-international-fee-calculator",
    name: "PayPal International Fee Calculator",
    shortDesc: "Calculate cross-border PayPal fees, currency conversion costs, net payouts, and the invoice amount required to reach your target income.",
    category: "Payment Tools", status: "active", kind: "calculator",
    highlight: "Cross-border PayPal fees and net payout",
    relatedSlugs: ["/stripe-international-fee-calculator", "/paypal-vs-stripe-fees", "/how-to-calculate-reverse-invoice-amount", "/wise-vs-paypal-transfer-calculator"],
  },
  {
    slug: "/stripe-international-fee-calculator",
    name: "Stripe International Fee Calculator",
    shortDesc: "Estimate Stripe processing fees, international card add-ons, optional currency conversion costs, and the amount to charge for a target payout.",
    category: "Payment Tools", status: "active", kind: "calculator",
    highlight: "International card fees and payout estimates",
    relatedSlugs: ["/paypal-international-fee-calculator", "/paypal-vs-stripe-fees", "/wise-vs-paypal-transfer-calculator"],
  },
  {
    slug: "/freelance-invoice-net-income-calculator",
    name: "Freelance Invoice & Net Income Calculator",
    shortDesc: "Estimate freelance take-home income after payment processing fees, a tax reserve, and fixed business expenses.",
    category: "Tax Tools", status: "active", kind: "calculator",
    highlight: "Invoice amount and estimated take-home pay",
    relatedSlugs: ["/hourly-rate-to-salary-calculator", "/how-to-calculate-reverse-invoice-amount", "/paypal-international-fee-calculator"],
  },
  {
    slug: "/wise-vs-paypal-transfer-calculator",
    name: "Wise vs PayPal Cross-Border Transfer & Fee Calculator",
    shortDesc: "Compare estimated Wise and PayPal fees, exchange-rate costs, and recipient amounts using your own assumptions.",
    category: "Currency Tools", status: "active", kind: "calculator",
    highlight: "Compare transfer costs and estimated amount received",
    relatedSlugs: ["/paypal-international-fee-calculator", "/stripe-international-fee-calculator", "/paypal-vs-stripe-fees"],
  },
  {
    slug: "/hourly-rate-to-salary-calculator",
    name: "Hourly Rate to Annual Salary Calculator",
    shortDesc: "Convert hourly rates to annual and monthly gross income, and estimate effective hourly pay after non-billable time and reserves.",
    category: "Income Tools", status: "active", kind: "calculator",
    highlight: "Hourly, annual, monthly, and effective rate estimates",
    relatedSlugs: ["/freelance-invoice-net-income-calculator", "/how-to-calculate-reverse-invoice-amount"],
  },
  {
    slug: "/paypal-vs-stripe-fees",
    name: "PayPal vs Stripe Fees: International Payments",
    shortDesc: "Compare fee structures, international payment costs, customer experience, and use cases for PayPal and Stripe.",
    category: "Guides", status: "active", kind: "guide",
    highlight: "Choose a payment processor for your business",
    relatedSlugs: ["/paypal-international-fee-calculator", "/stripe-international-fee-calculator", "/wise-vs-paypal-transfer-calculator"],
  },
  {
    slug: "/how-to-calculate-reverse-invoice-amount",
    name: "How to Calculate a Reverse Invoice Amount",
    shortDesc: "Learn the gross-up formula for pricing an invoice so payment fees do not reduce your target net payout.",
    category: "Guides", status: "active", kind: "guide",
    highlight: "Calculate the invoice needed for an exact payout",
    relatedSlugs: ["/paypal-international-fee-calculator", "/stripe-international-fee-calculator", "/freelance-invoice-net-income-calculator"],
  },
  {
    slug: "/wise-exchange-rate-calculator",
    name: "Wise Exchange Rate Calculator",
    shortDesc: "Compare currency conversion costs and estimate the amount received after exchange fees.",
    category: "Currency Tools", status: "upcoming", kind: "calculator",
    highlight: "Multi-currency conversion estimates",
    relatedSlugs: ["/wise-vs-paypal-transfer-calculator"],
  },
];

export const ACTIVE_TOOLS = TOOLS.filter((tool) => tool.status === "active");
export const UPCOMING_TOOLS = TOOLS.filter((tool) => tool.status === "upcoming");
