export type ToolStatus = "active" | "upcoming";
export type ToolCategory = "Payment Tools" | "Currency Tools" | "Tax Tools";
export interface Tool {
  slug: string;
  name: string;
  shortDesc: string;
  category: ToolCategory;
  status: ToolStatus;
  highlight: string;
}
export const TOOLS: Tool[] = [
  {
    slug: "/paypal-international-fee-calculator",
    name: "PayPal International Fee Calculator",
    shortDesc: "Calculate cross-border PayPal fees, currency conversion costs, net payouts, and the invoice amount required to reach your target income.",
    category: "Payment Tools", status: "active", highlight: "Cross-border PayPal fees and net payout",
  },
  {
    slug: "/stripe-international-fee-calculator",
    name: "Stripe International Fee Calculator",
    shortDesc: "Estimate Stripe processing fees, international card add-ons, optional currency conversion costs, and the amount to charge for a target payout.",
    category: "Payment Tools", status: "active", highlight: "International card fees and payout estimates",
  },
  {
    slug: "/freelance-invoice-net-income-calculator",
    name: "Freelance Invoice & Net Income Calculator",
    shortDesc: "Estimate freelance take-home income after payment processing fees, a tax reserve, and fixed business expenses.",
    category: "Tax Tools", status: "active", highlight: "Invoice amount and estimated take-home pay",
  },
  {
    slug: "/wise-exchange-rate-calculator",
    name: "Wise Exchange Rate Calculator",
    shortDesc: "Compare currency conversion costs and estimate the amount received after exchange fees.",
    category: "Currency Tools", status: "upcoming", highlight: "Multi-currency conversion estimates",
  },
];
export const ACTIVE_TOOLS = TOOLS.filter((tool) => tool.status === "active");
export const UPCOMING_TOOLS = TOOLS.filter((tool) => tool.status === "upcoming");
