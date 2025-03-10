import { BlogCard } from "@/components/ui/blog-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

const blogs = await supabase.from("Blogs").select("title, cover_image, created_at, id, excerpt")
console.log(blogs);


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
            {
              blogs.data?.map(blog => (<BlogCard
                  key={blog.id}
                  title={blog.title}
                  excerpt={blog.excerpt}
                  imageSrc={blog.cover_image}
                  date={new Date(blog.created_at)}
                  slug={blog.id}
                />)
              )
            }
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
