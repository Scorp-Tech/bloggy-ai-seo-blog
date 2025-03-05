"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { AnimatedCounter } from "./animated-counter";

export function StatCard({
  icon,
  value,
  label,
  prefix = "",
  suffix = "",
  className,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-background p-6 shadow-md",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute right-4 top-4 text-primary/20">
        {icon}
      </div>
      
      <div className="mb-2 text-3xl font-bold">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </div>
      
      <div className="text-muted-foreground">{label}</div>
      
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-primary/10">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
      </div>
    </motion.div>
  );
}