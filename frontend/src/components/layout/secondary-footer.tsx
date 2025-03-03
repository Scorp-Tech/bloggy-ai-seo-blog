"use client";

import { cn } from "@/lib/utils";

interface SecondaryFooterProps {
  isAdmin?: boolean
}

export function SecondaryFooter({ isAdmin = false }: SecondaryFooterProps) {
  return (
    <footer className={cn(
      'border-t bottom-0 absolute w-screen px-24 h-14 flex items-center justify-between text-sm',
      isAdmin 
        ? 'bg-white text-gray-600 border-gray-200'
        : 'bg-background/50 text-muted-foreground border-border'
    )}>
      <div>
        &copy; 2025 AI Business Enhancer
      </div>
      <div className="flex items-center space-x-6">
        <a 
          href="#" 
          className={cn(
            "transition-colors",
            isAdmin 
              ? "hover:text-gray-900"
              : "hover:text-primary"
          )}
        >
          Privacy
        </a>
        <a 
          href="#" 
          className={cn(
            "transition-colors",
            isAdmin 
              ? "hover:text-gray-900" 
              : "hover:text-primary"
          )}
        >
          Terms
        </a>
        <a 
          href="#" 
          className={cn(
            "transition-colors",
            isAdmin 
              ? "hover:text-gray-900"
              : "hover:text-primary"
          )}
        >
          Security
        </a>
      </div>
    </footer>
  );
} 