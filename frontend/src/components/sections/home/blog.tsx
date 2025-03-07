import { BlogCard } from "@/components/ui/blog-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Blog() {
    return (
        <section>
            <section id="blog" className="bg-muted/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              AI Content & SEO Blog
            </h2>
            <p className="text-xl text-muted-foreground">
              Latest insights on AI content creation and SEO strategies
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <BlogCard
              title="10 Ways AI is Revolutionizing Content Creation in 2025"
              excerpt="Discover how artificial intelligence is transforming the content creation landscape and how you can leverage it."
              imageSrc="https://images.unsplash.com/photo-1677442135968-6054f8c4535b"
              date={new Date("2025-01-15")}
              slug="ai-revolutionizing-content-creation"
            />
            
            <BlogCard
              title="SEO Best Practices for AI-Generated Content"
              excerpt="Learn how to optimize your AI-generated content for search engines and drive more organic traffic."
              imageSrc="https://images.unsplash.com/photo-1432888622747-4eb9a8f5f01a"
              date={new Date("2025-01-10")}
              slug="seo-best-practices-ai-content"
            />
            
            <BlogCard
              title="How to Create a Content Strategy with AI Tools"
              excerpt="A step-by-step guide to developing a comprehensive content strategy using AI-powered tools."
              imageSrc="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              date={new Date("2025-01-05")}
              slug="content-strategy-ai-tools"
            />
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" className="gap-2">
              View All Articles <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>
        </section>
    );
}
