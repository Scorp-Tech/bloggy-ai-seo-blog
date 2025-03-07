'use server'
import { Button } from "@/components/ui/button";
import Markdown from 'markdown-to-jsx'
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/use-auth";


interface Params {
  id: string;
}

export default async function BlogPost({ params }: { params: Params }) {
  const { id } = await params;

  const {session, user} = useAuth()

  console.log('session:: ', {session, user})
  
  // console.log((await supabase.auth.getSession()));
  
  // Fetch blog post by slug
  const { data, error } = await supabase.from("Blogs").select("*").eq("id", id).single()
  console.log(data, error);
  
  if (error || !data) {
    return <div className="text-red-500 pt-16 flex items-center justify-center h-full">Blog post not found.</div>;
  }
  return (
    <div className="pt-16 flex items-center flex-wrap flex-col">
      <Markdown className="blog w-[90%]" style={{maxWidth: "1024px"}}>{data.markdown}</Markdown>
      <div className="mt-10 p-4 border-t border-gray-300 text-center text-sm text-gray-600">
        <p>
          This blog was generated by <a href="https://yourcompany.com" className="text-blue-600 font-semibold hover:underline">Company</a>.
        </p>
        <Button>Generate your blog</Button>
      </div>
    </div>
  );
}
