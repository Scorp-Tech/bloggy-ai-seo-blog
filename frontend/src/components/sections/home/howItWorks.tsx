"use client";

import React from "react";
import { ArrowRight, CheckCircle, FileText, PenTool, Search, Sparkles, TrendingUp, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StepCard } from "@/components/ui/step-card";
import { StatCard } from "@/components/ui/stat-card";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import LogoCarousel from "@/components/ui/logo-carousel";

export function HowItWorks() {
    return (
        <section>
            <section id="howitworks" className="bg-muted/50 py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">How It Works – AI Magic in 3 Steps</h2>
                        <p className="text-xl text-muted-foreground">Creating high-quality content has never been easier</p>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        <StepCard number={1} icon={<Search size={24} />} title="Enter your topic" description="Simply enter your topic or keywords, and our AI will understand your content needs." />
                        <StepCard number={2} icon={<Sparkles size={24} />} title="AI generates content" description="Our advanced AI generates SEO-optimized content in seconds, tailored to your requirements." />
                        <StepCard number={3} icon={<PenTool size={24} />} title="Edit and publish" description="Review, edit, and refine the content as needed, then publish it instantly to your platform." />
                    </div>
                </div>
            </section>
            <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              SEO & Organic Traffic Growth
            </h2>
            <p className="text-xl text-muted-foreground">
              Real results from our AI-powered content creation
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <StatCard
              icon={<TrendingUp size={32} />}
              value={300}
              label="Average increase in organic traffic"
              suffix="%"
            />
            
            <StatCard
              icon={<FileText size={32} />}
              value={100000}
              label="AI-Generated Articles Published"
              suffix="+"
            />
            
            <StatCard
              icon={<Users size={32} />}
              value={5000}
              label="Content Creators & Marketers Trust Us"
              suffix="+"
            />
          </div>
          
          <motion.div
            className="mt-16 rounded-xl border bg-background p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-2xl font-bold">
                  Proven Results for Content Creators
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Our AI-powered platform has helped thousands of content creators and marketers achieve remarkable results in their SEO and content marketing efforts.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={20} className="mt-0.5 text-primary" />
                    <span>50% reduction in content creation time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={20} className="mt-0.5 text-primary" />
                    <span>3x improvement in content engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={20} className="mt-0.5 text-primary" />
                    <span>70% of users report higher search rankings</span>
                  </li>
                </ul>
                <Button className="mt-6 gap-2">
                  See Case Studies <ArrowRight size={16} />
                </Button>
              </div>
              
              <div className="relative aspect-video overflow-hidden rounded-lg border">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                  alt="Analytics Dashboard"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Hear from content creators who have transformed their workflow
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="This AI tripled my blog traffic! I'm now ranking for keywords I never thought possible. The content is engaging and reads like it was written by a human expert."
              author="Sarah Johnson"
              role="SEO Expert"
              avatarSrc="https://i.pravatar.cc/100?img=1"
            />
            
            <TestimonialCard
              quote="ArticleAI saves me hours of content creation every week. I can focus on strategy while the AI handles the writing. The quality is consistently excellent."
              author="Michael Chen"
              role="Digital Marketer"
              avatarSrc="https://i.pravatar.cc/100?img=2"
            />
            
            <TestimonialCard
              quote="As a small business owner, I couldn't afford a content team. ArticleAI changed everything. Now I publish regular, high-quality content that drives real results."
              author="Emily Rodriguez"
              role="E-commerce Entrepreneur"
              avatarSrc="https://i.pravatar.cc/100?img=3"
            />
          </div>
          
          <div className="mt-16 rounded-xl border bg-background p-8 shadow-lg">
            <h3 className="mb-6 text-center text-xl font-bold">Trusted by Leading Companies</h3>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center justify-center">
                  <div className="h-12 w-24 rounded-md bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

        </section>
    );
}
