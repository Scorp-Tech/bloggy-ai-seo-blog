"use client";

import type { Metadata } from "next";

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useAuth } from '@/hooks/use-auth';
import { LoadingScreen } from '@/components/common/loading-screen';


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, session, user } = useAuth(true);

  console.log({session, user})

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 p-3 pt-0 ">
          <div className="h-full flex flex-1 flex-col gap-4 rounded-xl p-2 font-poppins">
            {children}  
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
