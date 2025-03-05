"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function AnimatedGradient({
  className,
  containerClassName,
  children,
}: {
  className?: string;
  containerClassName?: string;
  children?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      container.style.setProperty("--x", x.toString());
      container.style.setProperty("--y", y.toString());
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        containerClassName
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-80 blur-3xl transition-all duration-500",
          "animate-gradient-background",
          "[--x:0.5] [--y:0.5]",
          "translate-x-[calc(50%-50%*var(--x))] translate-y-[calc(50%-50%*var(--y))]",
          className
        )}
      />
      {children}
    </div>
  );
}