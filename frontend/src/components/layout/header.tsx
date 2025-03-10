"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Menu, X } from "lucide-react";


interface HeaderProps{
  className?: string;
  navItems: { label: string; href: string }[];
}

export function Header( {className,navItems}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <motion.div
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled ? "py-2" : "py-4",
        className
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-primary">Article</span>
          <span>AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Button size="sm">Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="absolute left-0 right-0 top-full bg-background/95 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-2 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md p-2 text-foreground/80 transition-colors hover:bg-primary/10 hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button variant="outline">Get Started</Button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    
    // <motion.header
    //   style={{ backgroundColor }}
    //   className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
    // >
    //   <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
    //     <Link href="/" className="text-xl font-bold text-primary">
    //       BlogAI
    //     </Link>

    //     <div className="hidden md:flex items-center space-x-8">
    //       <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">
    //         Features
    //       </Link>
    //       <Link href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
    //         Pricing
    //       </Link>
    //       <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
    //         About
    //       </Link>
    //     </div>

    //     <div className="flex items-center space-x-4">
    //       <ThemeToggle />
    //       <Button variant="ghost" className="hidden md:inline-flex">
    //         Sign In
    //       </Button>
    //       <Button className="group">
    //         <PenLine className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
    //         Get Started
    //       </Button>
    //     </div>
    //   </nav>
    // </motion.header>

  );
}