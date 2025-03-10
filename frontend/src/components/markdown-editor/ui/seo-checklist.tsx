import React, { useState } from "react";

const SEO_CHECKLIST = [
    {
        "item": "Allow this post to get indexed (may appear in search results)", "priority": "CRITICAL", func: (blog: string, keyword: string) => {
            return "Make sure your blog is added to your sitemap and is enabled for indexing"
        }
    },
    { "item": "Add focus keyword to title tag", "priority": "HIGH", func : (blog:string, keyword: string) => {
        const match = /(?<!#)# .*/.exec(blog);
        return match ? match[0].toLowerCase().includes(keyword.toLowerCase()) : false;
    } },
    { "item": "Add focus keyword to H1 (post's title)", "priority": "HIGH", func: (blog: string, keyword: string) => {
        const match = /(?<!#)# .*/.exec(blog);
        return match ? match[0].toLowerCase().includes(keyword.toLowerCase()) : false;
    } },
    { "item": "Add an image or video to this post", "priority": "HIGH", func: (blog: string, keyword: string) => {
        const match = /!\[.*\].*/.exec(blog);
        return Boolean(match && match[0]);
    } },
    { "item": "Add focus keyword to at least one H2 or H3 (subheading)", "priority": "MEDIUM", func: (blog: string, keyword: string) => {
        let flag = false;
        blog.match(/(?<!#)#{2,3} .*/g)?.forEach(item => {
            if(item.toLowerCase().includes(keyword.toLowerCase())){
                flag = true
            }
        })
        return flag
    } },
    { "item": "Write alt text for all images", "priority": "MEDIUM", func : (blog: string, keyword: string) => {
        const altTexts = blog.match(/(?<=!\[).*(?=\])/g)
            if(!altTexts) return "No Images found in the blog!"
        
        let flag = true;
        blog.match(/(?<=!\[).*(?=\])/g)?.forEach(item => {
            if(item.length < 5){
                flag = false;
            }
        })
        return flag
    } },
    { "item": "Add focus keyword to body text", "priority": "MEDIUM", func: (blog: string, keyword: string) => {
        let flag = false;                
        blog.match(/\n+[A-z-].*(\n|$)/g)?.forEach(item => {
            if(!item.toLowerCase().includes(keyword.toLowerCase())){
                flag = true
            }
        })
        return flag
    } },
    { "item": "Write meta description with focus keyword", "priority": "LOW", func: (blog: string, keyword: string) => {
        return "Make sure that the blog has a proper meta description and the meta description contains the focus keyword: " + keyword
    } },
    { "item": "Add focus keyword to URL slug", "priority": "LOW", func: (blog: string, keyword: string = "") =>{
        return `Make sure that the url slug has the keyword example: ${JSON.parse(localStorage.getItem("company")).companyUrl}/blog/${keyword.split(" ").join("-")}/`
    } },
    { "item": "Include markup to be eligible for rich results", "priority": "LOW", func: (blog: string, keyword: string) => {
        return "Make sure the include eligible markups in the blog header to show up for rich text results example: FAQs, Product snippets etc."
    } }
]

const priorityColors: Record<string, string> = {
    CRITICAL: "text-red-600 border-red-600",
    HIGH: "text-orange-500 border-orange-500",
    MEDIUM: "text-yellow-500 border-yellow-500",
    LOW: "text-green-500 border-green-500"
};

const SEOChecklist = ({ markdown, keyword }: {markdown: string, keyword: string}) => {
    const [results, setResults] = useState<{ item: string; priority: string; passed: string | boolean; sign: string; message: string }[]>([]);
    
    React.useEffect(() => {
        if(markdown && keyword){
            const evaluateChecklist = (blog: string, keyword: string) => {
                return SEO_CHECKLIST.map(item => {
                    const passed = item.func(blog, keyword)
                    return {
                    item: item.item,
                    priority: item.priority,
                    passed: passed,
                    sign: typeof passed === 'string' ? "❓" : (passed? "✅" : "❌"),
                    message: typeof passed == 'string'? passed : ""
                }});
            };
            setResults(evaluateChecklist(markdown, keyword));
        }
    }, [markdown, keyword]);
    
    return (
        <div className="p-4 h-fit ml-4 border rounded-lg shadow-md max-w-md bg-white fixed right-0">
            <h2 className="text-lg font-semibold mb-3">SEO Assistant</h2>
            <div className="bg-green-200 w-fit px-4 py-1 rounded-2xl">Focus keyword: {keyword}</div>
            <ul className="text-xs font-light border-t first:border-b-0 mt-1">
                {results.map((check, index) => (
                    <li key={index} className="flex items-center gap-3 py-1 border-b last:border-b-0">
                        {<span>{check.sign}</span>}
                        <span className={`flex-1 ${check.passed ? 'text-gray-800' : 'text-gray-600'}`}>{check.item}
                            <br></br><span className={`flex-1 ${check.passed ? 'text-gray-400' : 'text-gray-600'}`}>{check.message}</span>
                        </span>
                        <span className={`border text-[10px] px-2 py-1 rounded ${priorityColors[check.priority]}`}>{check.priority}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SEOChecklist