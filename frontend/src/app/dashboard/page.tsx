"use client";

import { HeaderTitle } from "@/components/common/header-title";
import { MatrixCardSmall } from "@/components/common/matrix-card-small";
import { Users, FileChartColumnIncreasing, Plug, ChartNoAxesCombined } from "lucide-react";

export default function Dashboard() {
  return (
    <>
      <HeaderTitle title="Dashboard" children={<div>afasd</div>} />
      <SmallCardsGroup />
      <div>

      </div>
    </>
  );
}


function SmallCardsGroup() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
      <MatrixCardSmall
        icon={ChartNoAxesCombined}
        title="Backlinks"
        value="10K"
        status="connected"
        metric={{ value: 'Active Website'}}
      />

    </div>
  )
}
