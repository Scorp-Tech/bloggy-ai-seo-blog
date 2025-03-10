"use client"

import * as React from "react"
import {
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
  Wrench,
  Archive,
  Sparkles,
  Sparkle,
  Book
} from "lucide-react"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavUser } from "@/components/dashboard/nav-user"
import { TeamSwitcher } from "@/components/dashboard/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

let localCompanyData: {
  company_name: string,
  company_logo: string
  plan: string
} = {
  company_name: "No Company",
  company_logo: "../window.svg",
  plan: "Free"
}
const t = localStorage.getItem("company")
if(t)
  localCompanyData = JSON.parse(t)

console.log(localCompanyData);


const data = {
  user: {
    name: "mishranidheesh",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: localCompanyData.company_name,
      logo: localCompanyData.company_logo,
      plan: localCompanyData.plan,
    }
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Blog Generator",
      url: "/dashboard/blog-generation",
      icon: Sparkle
    },
    {
      title: "Recent Blogs",
      url: "/dashboard/recent-blogs",
      icon: Archive,
    },
    {
      title: "My Content",
      url: "/dashboard/my-content",
      icon: Book
    },
    {
      title: "SEO Tools",
      url: "#",
      icon: Wrench,
      items: [
        {
          title: "Keyword Research",
          url: "#"
        },
        {
          title: "Crawler",
          url: "#"
        },
        {
          title: "Page Speed Insights",
          url: "#",
        },
        {
          title: "Plagiarism Checker",
          url: "#",
        },
        {
          title: "Rank Checker",
          url: "#",
        },
        {
          title: "Internal Linking",
          url: "#"
        }
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
    {
      title: "Upgrade to pro",
      url: "#",
      icon: Sparkles
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
