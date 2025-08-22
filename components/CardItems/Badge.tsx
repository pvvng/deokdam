interface BadgeProps {
  isActive: boolean;
  activeLabel: string;
  inActiveLabel: string;
}

export default function Badge({
  isActive,
  activeLabel,
  inActiveLabel,
}: BadgeProps) {
  return (
    <span
      className={`shrink-0 text-xs font-semibold rounded text-white px-1 bg-blue-6 ${
        isActive ? "bg-blue-600" : "bg-neutral-500"
      }`}
    >
      {isActive ? activeLabel : inActiveLabel}
    </span>
  );
}
