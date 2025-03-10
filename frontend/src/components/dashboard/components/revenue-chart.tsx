import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { mockDashboardData } from "@/lib/mock/dashboard-data";

export default function RevenueChart() {
  return (
     <div className="col-span-1 lg:col-span-2 p-4 bg-[--bolt-elements-bg-depth-2] rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-[--bolt-elements-textPrimary] mb-4">
          Revenue Growth
        </h3>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={mockDashboardData.billing.revenueGrowth}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="var(--bolt-elements-item-contentAccent)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
  );
}
