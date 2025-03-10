"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

export function BlogCard({
  title,
  excerpt,
  imageSrc,
  date,
  slug,
  className,
}: {
  title: string;
  excerpt: string;
  imageSrc: string;
  date: Date;
  slug: string;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-background shadow-md transition-all duration-300 hover:shadow-xl",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <div className="p-6">
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={14} />
            <span>{format(date, "MMMM d, yyyy")}</span>
          </div>
          
          <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary">
            {title}
          </h3>
          
          <p className="text-muted-foreground line-clamp-4">{excerpt}</p>
          
          <div className="mt-4 text-sm font-medium text-primary">
            Read more →
          </div>
        </div>
      </Link>
    </motion.div>
  );
}