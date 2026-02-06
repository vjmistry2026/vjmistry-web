"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  from?: number;
  to: number | string;
  duration?: number; // seconds
  suffix?: string;
}

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

const Counter: React.FC<CounterProps> = ({
  from = 0,
  to,
  duration = 2,
  suffix = "",
}) => {
  const target: number =
    typeof to === "string"
      ? Number(to.replace(/[^\d.-]/g, ""))
      : to;

  const [count, setCount] = useState<number>(from);
  const hasAnimated = useRef<boolean>(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const animate = () => {
    const startTime = performance.now();
    const endValue = Number.isFinite(target) ? target : 0;

    const frame = (now: number) => {
      const elapsed = (now - startTime) / (duration * 1000);
      const progress = Math.min(elapsed, 1);
      const eased = easeOutCubic(progress);

      const current = Math.round(from + (endValue - from) * eased);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  };

  return (
    <span ref={ref} dir="ltr">
      {count}
      {suffix}
    </span>
  );
};

export default Counter;
