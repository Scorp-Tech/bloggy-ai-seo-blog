'use client'
import MarkdownEditor from "@/components/markdown-editor/editor"
import { supabase } from "@/lib/supabase/client"
import showdown from "showdown"

const blogId = new URL(location.href).searchParams.get("edit")
if(!localStorage.getItem("editingBlog") || localStorage.getItem("editingBlog") != blogId){
    await supabase.from("Blogs").select("markdown, focus_keyword").eq("id", blogId).single().then( async res => {
        if (res.data) {
            const converter = new showdown.Converter();
            const html = converter.makeHtml(res.data.markdown);
            localStorage.removeItem("novel-content")
            localStorage.setItem("html-content", html)
            localStorage.setItem("markdown", res.data.markdown)
            localStorage.setItem("keyword", res.data.focus_keyword)
            localStorage.setItem("editingBlog", blogId as string)
        }
    })
}

export default function BlogEditor() {
    return <div className="flex justify-center">
        <MarkdownEditor />
    </div>
}