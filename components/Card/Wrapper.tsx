export default function CardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full space-y-3 min-h-30 p-5 rounded-2xl border border-neutral-100 shadow">
      {children}
    </div>
  );
}
