"use client";

import React, { useState } from "react";
import { ArrowRight} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingCard } from "@/components/ui/pricing-card";

export function Pricing () {

    const [billingCycle, setBillingCycle] = useState("monthly");

    return (
        <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that works best for your content needs
            </p>
            
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className={billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingCycle === "yearly" ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={billingCycle === "yearly" ? "font-medium" : "text-muted-foreground"}>
                Yearly <span className="text-xs text-primary">Save 20%</span>
              </span>
            </div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <PricingCard
              title="Starter"
              price="Free"
              description="Perfect for beginners and small projects."
              features={[
                "5 AI-generated articles per month",
                "Basic SEO optimization",
                "Standard writing styles",
                "Export to PDF and Word",
                "Email support"
              ]}
              ctaText="Start for Free"
            />
            
            <PricingCard
              title="Professional"
              price={billingCycle === "monthly" ? "$29" : "$279"}
              description="Ideal for content creators and marketers."
              features={[
                "50 AI-generated articles per month",
                "Advanced SEO optimization",
                "All writing styles",
                "1-click publishing",
                "Plagiarism checker",
                "Priority support"
              ]}
              isPopular={true}
              ctaText="Get Started"
            />
            
            <PricingCard
              title="Enterprise"
              price={billingCycle === "monthly" ? "$99" : "$949"}
              description="For teams and high-volume content needs."
              features={[
                "Unlimited AI-generated articles",
                "Premium SEO optimization",
                "Custom writing styles",
                "Team collaboration",
                "API access",
                "Dedicated account manager"
              ]}
              ctaText="Contact Sales"
            />
          </div>
          
          <div className="mt-16 rounded-xl border bg-background p-8 shadow-lg">
            <div className="text-center">
              <h3 className="mb-2 text-2xl font-bold">
                Try ArticleAI FREE for 7 Days
              </h3>
              <p className="mb-6 text-muted-foreground">
                No credit card required. Cancel anytime.
              </p>
              <Button size="lg" className="gap-2">
                Start Your Free Trial <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
}