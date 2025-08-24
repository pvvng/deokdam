interface TimeStampProps {
  highlight: boolean;
  timeColor: "blue" | "gray";
  time: string;
  label: string;
}

export default function TimeStamp({
  timeColor,
  highlight,
  time,
  label,
}: TimeStampProps) {
  const colorClass =
    timeColor === "blue"
      ? "text-blue-600"
      : "text-gray-500 dark:text-neutral-300";

  return (
    <p className="text-xs">
      <span className={`${highlight ? "font-semibold" : ""} ${colorClass}`}>
        {time}
      </span>
      에 {label}
    </p>
  );
}
