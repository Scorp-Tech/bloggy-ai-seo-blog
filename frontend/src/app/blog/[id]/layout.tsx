import { PrimaryFooter } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NAV_ITEMS } from "@/constant/app.const";
export default function BlogLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return <>
          <Header className="bg-background/80 backdrop-blur-md" navItems={NAV_ITEMS} />
        {children}
        <PrimaryFooter/>
    </>
}