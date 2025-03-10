export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    status: 'active' | 'banned';
    subscriptionTier: 'free' | 'pro' | 'enterprise';
    createdAt: string;
  }
  
  export interface Article {
    id: string;
    title: string;
    content: string;
    status: 'pending' | 'approved' | 'rejected';
    author: string;
    createdAt: string;
    aiScore: number;
    toxicityScore: number;
    plagiarismScore: number;
  }
  
  export interface DashboardStats {
    totalArticles: number;
    activeUsers: number;
    monthlyRevenue: number;
    aiUsage: number;
  }