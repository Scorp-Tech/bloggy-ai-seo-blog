"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
// import { fetchBillingData } from "@/lib/stripe-api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { mockDashboardData } from "@/lib/mock/dashboard-data";

const BillingDashboard = () => {
  const [billingData, setBillingData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating API response with mock data
        
        setBillingData(mockDashboardData.billing);
      } catch (error) {
        console.error("Error fetching billing data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (!billingData) {
    return <div className="text-center text-lg text-red-500">Failed to load billing data.</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Revenue Card */}
      <Card className="bg-[--bolt-elements-bg-depth-2] shadow-lg">
        <CardHeader>
          <CardTitle className="text-[--bolt-elements-textPrimary]">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <motion.span
            animate={{ opacity: [0, 1], scale: [0.8, 1] }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            {formatCurrency(billingData.totalRevenue)}
          </motion.span>
        </CardContent>
      </Card>

      {/* Active Subscriptions */}
      <Card className="bg-[--bolt-elements-bg-depth-2] shadow-lg">
        <CardHeader>
          <CardTitle className="text-[--bolt-elements-textPrimary]">Active Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{billingData.activeSubscriptions}</p>
        </CardContent>
      </Card>

      {/* Pending Invoices */}
      <Card className="bg-[--bolt-elements-bg-depth-2] shadow-lg">
        <CardHeader>
          <CardTitle className="text-[--bolt-elements-textPrimary]">Pending Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold">{billingData.pendingInvoices}</p>
        </CardContent>
      </Card>

      {/* Revenue Growth Chart */}
      <div className="col-span-1 lg:col-span-2 p-4 bg-[--bolt-elements-bg-depth-2] rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-[--bolt-elements-textPrimary] mb-4">
          Revenue Growth
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={billingData.revenueGrowth}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="var(--bolt-elements-item-contentAccent)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Refunds & Transactions */}
      <div className="col-span-1 p-4 bg-[--bolt-elements-bg-depth-2] rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-[--bolt-elements-textPrimary] mb-4">
          Refunds & Transactions
        </h3>
        <ul className="space-y-3">
          {billingData.transactions.slice(0, 5).map((tx: any) => (
            <li
              key={tx.id}
              className="flex items-center justify-between p-2 bg-[--bolt-elements-item-backgroundDefault] rounded-md"
            >
              <span className="text-sm">{tx.date}</span>
              <span className="text-sm">{tx.customer}</span>
              <span className="text-sm font-semibold">{formatCurrency(tx.amount)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BillingDashboard;
