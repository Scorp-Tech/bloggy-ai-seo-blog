"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

export function TestimonialCard({
  quote,
  author,
  role,
  avatarSrc,
  className,
}: {
  quote: string;
  author: string;
  role: string;
  avatarSrc?: string;
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
        <Quote size={48} />
      </div>
      
      <div className="mb-4 text-lg text-foreground/90">{quote}</div>
      
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={avatarSrc} alt={author} />
          <AvatarFallback>{author.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold">{author}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </div>
    </motion.div>
  );
}