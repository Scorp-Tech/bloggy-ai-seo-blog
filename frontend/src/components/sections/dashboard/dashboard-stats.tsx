import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, FileText, Brain } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { DashboardStats } from '@/types';

const mockData = {
  totalArticles: 1234,
  activeUsers: 567,
  monthlyRevenue: 45678,
  aiUsage: 89
};

const chartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  delay: number;
}

function StatCard({ title, value, icon: Icon, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-lg p-6"
      style={{ background: 'var(--bolt-elements-bg-depth-2)' }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-70" style={{ color: 'var(--bolt-elements-textPrimary)' }}>
            {title}
          </p>
          <h3 className="text-2xl font-bold mt-2" style={{ color: 'var(--bolt-elements-textPrimary)' }}>
            {value}
          </h3>
        </div>
        <div 
          className="p-4 rounded-full"
          style={{ background: 'var(--bolt-elements-button-primary-background)' }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export function DashboardStats({ stats = mockData }: { stats?: DashboardStats }) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Articles"
          value={stats.totalArticles}
          icon={FileText}
          delay={0.1}
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          icon={Users}
          delay={0.2}
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          icon={DollarSign}
          delay={0.3}
        />
        <StatCard
          title="AI Usage"
          value={`${stats.aiUsage}%`}
          icon={Brain}
          delay={0.4}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-lg p-6"
        style={{ background: 'var(--bolt-elements-bg-depth-2)' }}
      >
        <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--bolt-elements-textPrimary)' }}>
          Revenue Trend
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--bolt-elements-button-primary-background)" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="var(--bolt-elements-button-primary-background)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--bolt-elements-borderColor)" />
              <XAxis dataKey="name" stroke="var(--bolt-elements-textPrimary)" />
              <YAxis stroke="var(--bolt-elements-textPrimary)" />
              <Tooltip
                contentStyle={{
                  background: 'var(--bolt-elements-bg-depth-1)',
                  border: '1px solid var(--bolt-elements-borderColor)',
                  color: 'var(--bolt-elements-textPrimary)'
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--bolt-elements-button-primary-background)"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}