import { Header } from "@/components/layout/header";
import { NAV_ITEMS } from "@/constant/app.const";
export default function BlogLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return <>
          <Header navItems={NAV_ITEMS} />
        {children}
    </>
}