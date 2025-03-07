"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function StepCard({
  number,
  title,
  description,
  icon,
  className,
}: {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-background p-6 shadow-md",
        className
      )}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-4xl font-bold text-primary/30">
        {number}
      </div>
      
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}