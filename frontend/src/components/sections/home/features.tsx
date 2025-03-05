"use client";

import { useInView } from "react-intersection-observer";
import { Bot, CheckCircle, Globe, LineChart, PenTool, Rocket, Search, Users, Zap } from "lucide-react";
import { FeatureCard } from "@/components/ui/feature-card";

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
    <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Why Choose Our AI?
            </h2>
            <p className="text-xl text-muted-foreground">
              Powerful features designed to transform your content creation process
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Search size={24} />}
              title="SEO-Optimized Content"
              description="Generate content that ranks higher on search engines with AI-powered keyword optimization and readability analysis."
            />
            
            <FeatureCard
              icon={<PenTool size={24} />}
              title="Multiple Writing Styles"
              description="Choose from professional, casual, storytelling, and more writing styles to match your brand voice and audience."
            />
            
            <FeatureCard
              icon={<CheckCircle size={24} />}
              title="Plagiarism-Free & Fact-Checked"
              description="Our AI ensures original content with built-in plagiarism detection and fact-checking capabilities."
            />
            
            <FeatureCard
              icon={<Zap size={24} />}
              title="Real-Time Editing & AI Enhancements"
              description="Edit your content in real-time with AI suggestions for improvements and enhancements."
            />
            
            <FeatureCard
              icon={<Globe size={24} />}
              title="1-Click Publishing"
              description="Publish directly to WordPress, Medium, and other platforms with a single click."
            />
            
            <FeatureCard
              icon={<Users size={24} />}
              title="Team Collaboration"
              description="Collaborate with your team in real-time with comments, suggestions, and version history."
            />
          </div>
        </div>
      </section>
  );
}