"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function AnimatedCounter({
  value,
  duration = 2000,
  className,
  prefix = "",
  suffix = "",
}: {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let startTime: number;
            const startValue = 0;
            const endValue = value;
            
            const step = (timestamp: number) => {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / duration, 1);
              const currentCount = Math.floor(progress * (endValue - startValue) + startValue);
              
              setCount(currentCount);
              
              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                setCount(endValue);
              }
            };
            
            window.requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [value, duration]);

  return (
    <div ref={countRef} className={cn("font-bold", className)}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}