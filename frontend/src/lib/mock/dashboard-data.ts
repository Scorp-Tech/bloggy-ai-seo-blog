export const mockDashboardData = {
  // For MatrixCardSmall components
  stats: {
    totalBlogs: {
      title: "Total Blogs",
      value: "45.2K",
      status: "gain",
      metric: {
        value: 12,
        type: "percentage",
        comparison: "vs last month"
      }
    },
    activeUsers: {
      title: "Active Users",
      value: "1,234",
      status: "gain",
      metric: {
        value: 8,
        type: "percentage",
        comparison: "vs last week"
      }
    },
    socialConnections: {
      title: "Social Media",
      value: "Connected",
      status: "connected",
      metric: {
        value: "3/4",
        type: "integration",
        comparison: "platforms linked"
      }
    },
    contentScore: {
      title: "Content Score",
      value: "92",
      status: "gain",
      metric: {
        value: 5,
        type: "points",
        comparison: "vs last week"
      }
    }
  },

  // For BillingDashboard component
  billing: {
    totalRevenue: 125750.45,
    activeSubscriptions: 847,
    pendingInvoices: 23,
    revenueGrowth: [
      { month: 'Jan', revenue: 15000 },
      { month: 'Feb', revenue: 18500 },
      { month: 'Mar', revenue: 22000 },
      { month: 'Apr', revenue: 20500 },
      { month: 'May', revenue: 24750 },
      { month: 'Jun', revenue: 25000 }
    ],
    transactions: [
      {
        id: 1,
        date: '2024-03-15',
        customer: 'John Doe',
        amount: 299.99,
        status: 'completed'
      },
      {
        id: 2,
        date: '2024-03-14',
        customer: 'Alice Smith',
        amount: 199.99,
        status: 'completed'
      },
      {
        id: 3,
        date: '2024-03-14',
        customer: 'Bob Johnson',
        amount: 499.99,
        status: 'pending'
      },
      {
        id: 4,
        date: '2024-03-13',
        customer: 'Emma Wilson',
        amount: 149.99,
        status: 'completed'
      },
      {
        id: 5,
        date: '2024-03-13',
        customer: 'Michael Brown',
        amount: 399.99,
        status: 'refunded'
      }
    ]
  },

  // For DashboardStats component
  performance: {
    blogMetrics: {
      views: 152420,
      shares: 3240,
      comments: 1890,
      likes: 8750
    },
    recentBlogs: [
      {
        id: 1,
        title: "10 SEO Tips for Better Rankings",
        publishedAt: "2 days ago",
        views: 1200,
        engagement: 85
      },
      {
        id: 2,
        title: "Content Marketing Strategy Guide",
        publishedAt: "3 days ago",
        views: 980,
        engagement: 72
      }
    ],
    contentAnalytics: {
      topPerforming: [
        { category: "SEO", percentage: 35 },
        { category: "Marketing", percentage: 28 },
        { category: "Technology", percentage: 22 },
        { category: "Business", percentage: 15 }
      ],
      engagementRate: 67,
      averageReadTime: "4:32"
    }
  }
}; 