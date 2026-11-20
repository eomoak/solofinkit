
export type ToolStatus = "active" | "upcoming";

export type ToolCategory =
  | "Payment Tools"
  | "Currency Tools"
  | "Tax Tools";

export interface Tool {
  slug: string;
  name: string;
  shortDesc: string;
  category: ToolCategory;
  status: ToolStatus;
}

export const TOOLS: Tool[] = [
  {
    slug: "/paypal-international-fee-calculator",
    name: "PayPal International Fee Calculator",
    shortDesc:
      "Calculate cross-border PayPal fees, currency conversion costs, net payouts, and the invoice amount required to reach your target income.",
    category: "Payment Tools",
    status: "active",
  },
  {
    slug: "/stripe-fee-calculator",
    name: "Stripe Fee Calculator",
    shortDesc:
      "Estimate payment processing fees and calculate the amount you need to charge to receive your target payout.",
    category: "Payment Tools",
    status: "upcoming",
  },
  {
    slug: "/wise-exchange-rate-calculator",
    name: "Wise Exchange Rate Calculator",
    shortDesc:
      "Compare currency conversion costs and estimate the amount received after exchange fees.",
    category: "Currency Tools",
    status: "upcoming",
  },
];

export const ACTIVE_TOOLS = TOOLS.filter(
  (tool) => tool.status === "active"
);

export const UPCOMING_TOOLS = TOOLS.filter(
  (tool) => tool.status === "upcoming"
);
