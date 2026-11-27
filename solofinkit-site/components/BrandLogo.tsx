type BrandLogoProps = {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
};

const sizes: Record<NonNullable<BrandLogoProps["size"]>, { icon: string; text: string }> = {
  sm: { icon: "h-7 w-7", text: "text-base" },
  md: { icon: "h-8 w-8", text: "text-lg" },
  lg: { icon: "h-10 w-10", text: "text-2xl" },
};

export default function BrandLogo({
  size = "md",
  showText = true,
  className = "",
}: BrandLogoProps) {
  const selected = sizes[size];

  return (
    <span className={`inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap ${className}`}>
      <svg
        viewBox="0 0 32 32"
        className={`${selected.icon} shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="32" height="32" rx="9" fill="#0F172A" />
        <path d="M8 23.5H24" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="8" y="16" width="4.2" height="7.5" rx="1.2" fill="#34D399" />
        <rect x="14" y="11.5" width="4.2" height="12" rx="1.2" fill="#34D399" />
        <rect x="20" y="7" width="4.2" height="16.5" rx="1.2" fill="#34D399" />
      </svg>
      {showText && (
        <span className={`${selected.text} font-bold tracking-tight text-slate-900`}>
          <span>SoloFin</span><span className="text-emerald-600">Kit</span>
        </span>
      )}
    </span>
  );
}
