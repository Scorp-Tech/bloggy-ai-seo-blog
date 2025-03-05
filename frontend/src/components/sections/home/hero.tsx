"use client";


import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Link, PenLine, PenTool, Sparkles, Zap } from "lucide-react";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { AnimatedText } from "@/components/ui/animated-text";
import Image from "next/image";

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen">
    <AnimatedGradient containerClassName="absolute inset-0 -z-10" />
    <div className="relative z-10 mx-auto max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <AnimatedText text="AI-Powered" className="block text-primary" />
            <AnimatedText text="Article Generation" className="block" />
            <AnimatedText text="Write Smarter, Rank Faster!" className="block bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent" />
          </h1>
          
          <p className="mb-8 text-xl text-muted-foreground">
            Create SEO-optimized, high-quality articles in seconds with AI-powered automation.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="gap-2">
              Try for Free <Sparkles size={16} />
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              See Demo <ArrowRight size={16} />
            </Button>
          </div>
          
          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <Image
                  key={i}
                  src={`https://i.pravatar.cc/40?img=${i}`}
                  alt={`User ${i}`}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-background"
                />
              ))}
            </div>
            <div className="text-sm">
              <span className="font-bold">5,000+</span> content creators trust us
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mx-auto aspect-video max-w-lg overflow-hidden rounded-xl border bg-background/80 shadow-xl backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <Image
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485"
            alt="AI Article Generator"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mx-auto mt-24 max-w-4xl rounded-xl border bg-background/80 p-6 shadow-lg backdrop-blur-sm"
      >
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Zap size={20} />
            </div>
            <div>
              <div className="text-sm font-medium">Lightning Fast</div>
              <div className="text-xs text-muted-foreground">Articles in seconds</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle size={20} />
            </div>
            <div>
              <div className="text-sm font-medium">SEO Optimized</div>
              <div className="text-xs text-muted-foreground">Rank higher on Google</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <PenTool size={20} />
            </div>
            <div>
              <div className="text-sm font-medium">Multiple Styles</div>
              <div className="text-xs text-muted-foreground">Adapt to any audience</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    
    <div className="absolute bottom-10 left-0 right-0 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6, repeat: Infinity, repeatType: "reverse" }}
      >
        <Link href="#features" className="flex flex-col items-center text-sm text-muted-foreground">
          <span>Scroll to explore</span>
          <ArrowRight className="mt-1 rotate-90" size={16} />
        </Link>
      </motion.div>
    </div>
  </section>

  );
}