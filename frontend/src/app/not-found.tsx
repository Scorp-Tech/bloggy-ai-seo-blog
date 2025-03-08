"use client";

import { useRouter } from "next/navigation";
import { HomeIcon, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundContent() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#6812f3]/5">
      <div className="max-w-2xl px-8 py-16 text-center">
        <div className="relative">
          <h1 className="text-[150px] font-bold text-[#6812f3] leading-none">
            404
          </h1>
        </div>
        
        <h2 className="mt-8 text-3xl font-semibold text-gray-900">
          Oops! Page not found
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          The page you're looking for seems to have wandered off into the digital void.
        </p>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2 hover:bg-[#6812f3]/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          
          <Button
            onClick={() => router.push("/")}
            className="w-full sm:w-auto flex items-center gap-2 bg-[#6812f3] hover:bg-[#6812f3]/90"
          >
            <HomeIcon className="w-4 h-4" />
            Return Home
          </Button>
          
          {/* <Button
            onClick={() => router.push("/search")}
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2 hover:bg-[#6812f3]/10"
          >
            <Search className="w-4 h-4" />
            Search Site
          </Button> */}
        </div>

        <div className="mt-16 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-[#6812f3]/5 text-sm text-gray-500">
              Lost? Need help?
            </span>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          If you believe this is a mistake, please{" "}
          <a
            href="mailto:support@example.com"
            className="text-[#6812f3] hover:underline"
          >
            contact our support team
          </a>
        </p>
      </div>
    </div>
  );
}