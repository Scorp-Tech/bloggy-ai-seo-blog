"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function AnimatedText({
  text,
  className,
  once = true,
}: {
  text: string;
  className?: string;
  once?: boolean;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const span = spanRef.current;
    if (!span) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !hasAnimated.current)) {
            span.classList.add("animate-in");
            hasAnimated.current = true;
          } else if (!entry.isIntersecting && !once) {
            span.classList.remove("animate-in");
            hasAnimated.current = false;
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(span);
    return () => observer.disconnect();
  }, [once]);

  return (
    <span
      ref={spanRef}
      className={cn(
        "inline-block opacity-0 transition-all duration-700 [&.animate-in]:opacity-100",
        className
      )}
    >
      {text}
    </span>
  );
}