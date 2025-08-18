"use client";

import { memo, useEffect, useRef, useState } from "react";

interface Star {
  top: number;
  left: number;
  size: number;
  opacity: number;
}

const STAR_COUNT = 200;

function Stars() {
  const [stars, setStars] = useState<Star[]>([]);
  const starRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({
      length: STAR_COUNT,
    }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random(),
    }));
    setStars(generatedStars);
  }, []);

  // 별 깜빡임 CSS 변수로 랜덤 delay
  useEffect(() => {
    starRefs.current.forEach((star) => {
      if (!star) return;
      star.style.animationDelay = `${Math.random() * 2}s`;
    });
  }, [stars]);

  return stars.map((star, i) => (
    <div
      key={i}
      ref={(el) => {
        starRefs.current[i] = el!;
      }}
      className="animate-twinkle absolute bg-white rounded-full"
      style={{
        width: `${star.size}px`,
        height: `${star.size}px`,
        top: `${star.top}%`,
        left: `${star.left}%`,
        opacity: star.opacity,
      }}
    />
  ));
}

export default memo(Stars);
