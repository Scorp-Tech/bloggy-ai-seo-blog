"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card } from "@/components/ui/card";
import { Bot, Globe, LineChart, Rocket } from "lucide-react";

const features = [
  {
    icon: <Bot className="h-10 w-10" />,
    title: "AI-Powered Content",
    description: "Generate high-quality, engaging content with our advanced AI technology."
  },
  {
    icon: <LineChart className="h-10 w-10" />,
    title: "SEO Optimization",
    description: "Automatically optimize your content for search engines to increase visibility."
  },
  {
    icon: <Globe className="h-10 w-10" />,
    title: "Global Reach",
    description: "Connect with readers worldwide through our platform's international presence."
  },
  {
    icon: <Rocket className="h-10 w-10" />,
    title: "Marketing Integration",
    description: "Seamlessly integrate with Google Ads, Facebook Ads, and other marketing platforms."
  }
];

export function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create successful, SEO-optimized content
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                <div className="mb-4 text-primary">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}