"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from '@/contexts/session-context';

export function useAuth(requireAuth = true) {
  const { session, user, isLoading } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    if (!session && requireAuth) {
      // Redirect to login if auth is required and no session exists
      router.push(`/login?redirectTo=${pathname}`);
    } else if (session && ['/login', '/signup'].includes(pathname)) {
      // Redirect to dashboard if logged in and trying to access auth pages
      router.push('/dashboard');
    }
  }, [session, isLoading, requireAuth, router, pathname]);

  return { session, user, isLoading };
} 