'use client'
import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProgressIndicator from "@/components/ui/progress-indicator";
import { supabase } from "@/lib/supabase/client";
import { Spinner } from "@/components/ui/spinner";
import { ChevronDown } from "lucide-react";
import showdown from 'showdown';
import { SelectDropDown } from "@/components/ui/select-drop-down";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";


const blogGenerationServer = "https://equipped-harmless-gull.ngrok-free.app";

type companyType = {
  id: string;
  userId: string;
  companyUrl: string;
  promotional_url_groups: string;
  company_profile: string;
  grouped_urls: string;
};

async function generateBlog(
  keyword: string,
  userId: string,
  company: companyType,
  tone: string = "Casual",
  useImages: boolean = true,
  blogStructure: string = ""
) {
  const session = (await supabase.auth.getSession()).data.session;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + session?.access_token);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    keyword,
    userId,
    companyId: company.id,
    companyUrl: company.companyUrl,
    promotionalGroups: company.promotional_url_groups,
    companyProfile: company.company_profile,
    groupedUrls: company.grouped_urls,
    structure: blogStructure,
    tone: tone,
    useImages: useImages
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  try {
    const res = await fetch(`${blogGenerationServer}/generate-blog`, requestOptions);
    return await res.json();
  } catch (error) {
    console.error(error);
    return false;
  }
}

const OPTIONS = [
  "Promote Brand",
  "Include Images"
]

  const BLOG_STATUS = ["STARTED", "GEN_STRUCTURE", "AUDIT_STRUCTURE", "FIX_STRUCTURE", "AUDIT_STRUCTURE1", "STRUCTURE", "GEN_RELV_URL", "ADD_RELV_URL", "URL", "GEN_IMGS", "ADD_IMGS", "DONE", "ERROR"];

export default function BlogGeneration() {
  const [generating, setGenerating] = useState(false);
  const [step, setStep] = useState(1);
  const [blogId, setBlogId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("Generating blog");
  const [keyword, setKeyword] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [autoScroll, setAutoScroll] = useState(true);
  const [tone, setTone] = useState("Normal")
  const [includeImages, setIncludeImage] = useState(true)
  const [promoteBrand, setPromoteBrand] = useState(true)

  // Use a ref for autoScroll in the typing effect
  const autoScrollRef = useRef(autoScroll);
  useEffect(() => {
    autoScrollRef.current = autoScroll;
  }, [autoScroll]);

  useEffect(() => {
    const localBlogId = localStorage.getItem("currentGeneratingBlogId");
    if (localBlogId) {
      setBlogId(localBlogId);
      setGenerating(true);
    }
  }, []);

  // Get user and company data
  const [company, setCompany] = useState<companyType | null>(null);
  const [user, setUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    async function fetchUserAndCompany() {
      const { data: userData } = await supabase.auth.getUser();
      const currentUser = userData.user;
      setUser(currentUser);
      if (currentUser) {
        const companyFromStorage = localStorage.getItem("company");
        if (companyFromStorage) {
          setCompany(JSON.parse(companyFromStorage));
        } else {
          const { data } = await supabase
            .from("Company Data")
            .select("*")
            .eq("user_id", currentUser.id)
            .single();
          setCompany(data as companyType);
          localStorage.setItem("company", JSON.stringify(data));
        }
      }
    }
    fetchUserAndCompany();
  }, []);

  // Start blog generation once keyword is set and company/user data is available
  useEffect(() => {
    if (!blogId && keyword && user && company) {
      setGenerating(true);
      generateBlog(keyword, user.id, promoteBrand ? company : {} as companyType, tone, includeImages).then((res) => {
        if (res) {
          setBlogId(res.id);
          localStorage.setItem("currentGeneratingBlogId", res.id);
        }
      }).catch((e) => {
        setKeyword("")
        setGenerating(false)
        setStatusMessage(e)
      })
    }
  }, [blogId, keyword, user, company, tone, promoteBrand, includeImages]);

  // Typing animation effect: tokenize the HTML and animate text tokens only.
  useEffect(() => {
    const markdownHtml = document.getElementById("markdownHtml");
    if (markdown && markdownHtml) {
      const converter = new showdown.Converter();
      const html = converter.makeHtml(markdown);
      // Tokenize the HTML into tags and text segments.
      const tokens = html.match(/(<[^>]+>|[^<]+)/g) || [];
      let tokenIndex = 0;
      let charIndex = 0;
      let output = "";

      const typingInterval = setInterval(() => {
        if (tokenIndex < tokens.length) {
          const token = tokens[tokenIndex];
          // If it's an HTML tag, insert it entirely.
          if (token.startsWith("<")) {
            output += token;
            tokenIndex++;
            markdownHtml.innerHTML = output;
          } else {
            // Append text tokens character by character.
            output += token.charAt(charIndex);
            charIndex++;
            markdownHtml.innerHTML = output;
            if (charIndex >= token.length) {
              tokenIndex++;
              charIndex = 0;
            }
          }
          // Use the ref to check the current autoScroll flag without re-running the effect.
          if (autoScrollRef.current) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
          }
        } else {
          clearInterval(typingInterval);
        }
      }, 10);
      return () => clearInterval(typingInterval);
    }
  }, [markdown]); // Removed autoScroll from dependencies

  // Listen to manual scrolling: disable auto scroll if the user scrolls.
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY <= document.body.scrollHeight - 50) {
        setAutoScroll(false);
      } else if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 20) {
        setAutoScroll(true)
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Polling for blog generation status.
  useEffect(() => {
    if (blogId) {
      const pollingInterval = setInterval(() => {
        const headers = new Headers();
        supabase.auth.getSession().then(({ data: { session } }) => {
          headers.append("Authorization", "Bearer " + session?.access_token);
          headers.append("Content-Type", "application/json");

          fetch(`${blogGenerationServer}/get-generation-status`, {
            method: "POST",
            headers,
            body: JSON.stringify({
              userId: user?.id,
              id: blogId,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              setStep(BLOG_STATUS.indexOf(res.status) + 1);
              setStatusMessage(res.message);
              if (res.markdown) {
                setMarkdown(res.markdown);
              }
              if (res.status === "DONE") {
                  setBlogId(null)
                  setKeyword("")
                  localStorage.removeItem("currentGeneratingBlogId")
                  clearInterval(pollingInterval);
              }
            });
        });
      }, 5000);
      return () => clearInterval(pollingInterval);
    }
  }, [blogId, user]);

  return (
    <>
      <div className="self-center">
        <h2 className="text-center text-2xl">Generate blog using keyword</h2>
        <div className="flex w-full flex-col items-center space-x-2">
          <Input
            type="text"
            id="keywordInput"
            className="w-96 m-2"
            placeholder="Enter Keyword (eg. 10 ways to eat ice cream)"
          />
          <div className="flex gap-5 h-16 items-center">
            <SelectDropDown items={[
              "Normal",
              "Casual",
              "Professional",
              "Friendly",
              "Funny",
              "Educational",
              "Technical",
              "Creative",
              "Persuasive"
            ]} placeholder="Select tone" onChange={(e) => {
              setTone((e.target as HTMLElement).innerHTML)
            }} ></SelectDropDown>
            <div className="flex gap-6">
              {OPTIONS.map((option, index) => {
                return (<div key={`${option}`} className="flex items-center gap-2">
                  <Checkbox defaultChecked onClick={() => {switch (index) {
                    case 0:
                      setPromoteBrand(!promoteBrand)
                      break;
                    case 1:
                      setIncludeImage(!includeImages)
                      break;
                    default:
                      break;
                  }}} id={`${option}-a`} />
                  <Label htmlFor={`${option}-a`}>{option}</Label>
                </div>)
              })}
            </div>
          </div>
          <Button
            className="mt-4"
            style={{backgroundColor: blogId? "#ff4242": "hsl(var(--primary))"}}
            type="submit"
            onClick={() => {
              if(!blogId){
                const inputValue = (document.getElementById("keywordInput") as HTMLInputElement)?.value;
                setKeyword(inputValue || "");
              }else{
                fetch(`${blogGenerationServer}/cancel-generation`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({id: blogId})
                }).then(() => {
                  localStorage.removeItem("currentGeneratingBlogId")
                  setGenerating(false)
                  setBlogId(null)
                  setKeyword("")
                })
              }
            }}
          >
            {blogId? "Cancel" : "Generate" }
          </Button>
        </div>
        <ProgressIndicator
          style={{ display: generating ? "flex" : "none" }}
          step={step}
          steps={BLOG_STATUS.length}
          gap={20}
        />
        <div style={{ display: generating ? "flex" : "none" }} className="text-center justify-center">
          {statusMessage}
          <Spinner style={{ display: blogId ? "block" : "none" }} key="ellipsis" variant="ellipsis" />
        </div>
      </div>
      <div id="markdownHtml" className="blog w-full max-w-[1024px] self-center"></div>
      <Button
        onClick={() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }}
        className="fixed bottom-2"
        style={{ visibility: autoScroll ? "hidden" : "visible", left: 'calc(50% + var(--sidebar-width)/2)' }}
      >
        <ChevronDown />
      </Button>
    </>
  );
}
