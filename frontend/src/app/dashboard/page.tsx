"use client";

import { HeaderTitle } from "@/components/common/header-title";
import { MatrixCardSmall } from "@/components/common/matrix-card-small";
import RevenueChart from "@/components/dashboard/components/revenue-chart";
import { ArticleList } from "@/components/sections/dashboard/artical-list";
import BillingDashboard from "@/components/sections/dashboard/billing-dashboard";
import { DashboardStats } from "@/components/sections/dashboard/dashboard-stats";
import { UserManagement } from "@/components/sections/dashboard/user-management";
import { CardHeader, Card } from "@/components/ui/card";
import { Users, FileChartColumnIncreasing, Plug, EllipsisVerticalIcon, ChartNoAxesCombined, ChevronDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
  return (
    <>
      <HeaderTitle 
        title="Dashboard" 
        children={
          <div className="flex items-center gap-1">
            <Button 
              onClick={() => console.log("Main action clicked")}
              className="rounded-r-none px-4 bg-black hover:bg-black/90 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Blog
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="default" 
                  className="rounded-l-none border-l border-white/20 px-2 bg-black hover:bg-black/90 text-white"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end"
                className="bg-white dark:bg-gray-950 border-border"
              >
                <DropdownMenuItem 
                  onClick={() => console.log("Button 1 clicked")}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                >
                  Import Blog
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => console.log("Button 2 clicked")}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                >
                  Create Template
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        } 
      />
      <SmallCardsGroup />
      <div>

      </div>
    </>
  );
}


function SmallCardsGroup() {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MatrixCardSmall
        icon={FileChartColumnIncreasing}
        title="Total Blogs"
        value="124"
        status="gain"
        metric={{ value: 12, type: 'percentage', comparison: "vs last month" }}
      />
      <MatrixCardSmall
        icon={Users}
        title="Monthly Traffic"
        value="45.5K"
        status="gain"
        metric={{ value: 18, type: 'percentage', comparison: "vs last month" }}
      />
      <MatrixCardSmall
        icon={Plug}
        title="Active Integations"
        value="8"
        status="connected"
        metric={{ value: 'All Connected' }}
      />
      <MatrixCardSmall
        icon={ChartNoAxesCombined}
        title="SEO Score"
        value="92"
        status="gain"
        metric={{ value: 5, type: 'points', comparison: "vs last week" }}
      />
      {/* <MatrixCardSmall
        icon={ChartNoAxesCombined}
        title="Backlinks"
        value="10K"
        status="connected"
        metric={{ value: 'Active Website'}}
      /> */}

    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <DashboardStats />
      <div>
        <RevenueChart />
      </div>
    </div>
    <div>
    <BillingDashboard />
    </div>
    {/* <div className="w-3/5 h-1/3 mt-auto">
        <HeaderTitle title="Recent Blogs" children={<div>View All</div>} />
        <div className="rounded-xl ml-2 mr-2 h-1/4 border border-gray-600 p-1 pl-2 mb-3">
          <header className="">10 SEO Tips for better Rankings</header>
          <div className="flex flex-wrap text-gray-500 ">Published <div className="text-gray-500 ml-2">2 days Ago</div></div>
          
        </div>
        <div className="rounded-xl ml-2 mr-2 h-1/4 border border-gray-600 p-1 pl-2 mb-3">
          <header className="">Content Marketing Strategy Guide</header>
          <div className="font- flex flex-wrap text-gray-500">Published <div className="text-gray-500 ml-2">3 days Ago</div></div>
        </div>        
    </div> */}
  
    </>
    
  )
}
