"use client";

import { useScrollAnimation } from "@/lib/hooks/useScrollAnimation";
import { PropsWithChildren } from "react";

export function AnimatedElement({ children }: PropsWithChildren) {
  const ref = useScrollAnimation();

  return (
    <section ref={ref} className="opacity-0">
      {children}
    </section>
  );
}
