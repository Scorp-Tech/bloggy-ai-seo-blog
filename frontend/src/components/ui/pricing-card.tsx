"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingCard({
  title,
  price,
  description,
  features,
  isPopular = false,
  ctaText = "Get Started",
  className,
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-background p-6 shadow-md transition-all duration-300 hover:shadow-xl",
        isPopular && "border-primary ring-1 ring-primary",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {isPopular && (
        <div className="absolute right-0 top-0 bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Popular
        </div>
      )}
      
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        {price !== "Free" && <span className="text-muted-foreground">/month</span>}
      </div>
      
      <p className="mb-6 text-muted-foreground">{description}</p>
      
      <ul className="mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check size={16} className="text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button className="w-full" variant={isPopular ? "default" : "outline"}>
        {ctaText}
      </Button>
    </motion.div>
  );
}