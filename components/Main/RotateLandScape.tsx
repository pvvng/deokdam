"use client";

export default function RotateLandScape({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-[200%] overflow-hidden bg-gradient-to-b to-gray-700 from-gray-900 relative animate-move-left">
      {children}
    </div>
  );
}
