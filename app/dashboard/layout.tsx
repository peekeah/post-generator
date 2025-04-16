"use client"

import type React from "react"

import { FileText, Home, Settings, CreditCard, LucideProps, Bell, ChevronDown, Moon, Sun, Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ForwardRefExoticComponent, RefAttributes, useEffect, useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { Spinner } from "@/components/ui/spinner"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, useSidebar } from "@/components/ui/sidebar"

interface NavItem {
  id: string;
  label: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
  link: string;
}

type ActiveSection = NavItem["id"];

const navItems: NavItem[] = [
  {
    id: "post-generator",
    label: "Post Generator",
    icon: Home,
    link: "/dashboard"
  },
  {
    id: "generated-posts",
    label: "Generated Posts",
    icon: FileText,
    link: "/dashboard/generated-posts"
  },
  {
    id: "subscription",
    label: "Subscription",
    icon: CreditCard,
    link: "/dashboard/subscription"
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    link: "/dashboard/settings"
  },
]
export default function DashboardLayout({ children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()
  const session = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<ActiveSection>(navItems[0].id);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/")
    }
    setActiveSection(
      () =>
        pathname.split("/dashboard")?.[1].replace("/", "") ||
        "post-generator"
    );
  }, [session, pathname])

  if (session.status === "loading") {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return (
    <main>
      <SidebarProvider className="flex w-ful h-full">
        <AppSidebar
          activeSection={activeSection}
          navItems={navItems}
        />
        <div className="flex-1 flex flex-col justify-center w-full">
          <AppHeader activeSection={activeSection} />
          <div className="p-6 bg-muted/30 flex-1">{children}</div>
        </div>
      </SidebarProvider>
    </main>
  )
}

const AppSidebar = ({ navItems, activeSection }: { activeSection: ActiveSection, navItems: NavItem[] }) => {
  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="bg-primary text-primary-foreground w-8 h-8 rounded-md flex items-center justify-center">
            AI
          </span>
          PostGen
        </h1>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-4">
        <SidebarMenu className="space-y-2">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                asChild
                isActive={activeSection === item.id}
              >
                <Link
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors",
                    activeSection === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  href={item.link}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-sm font-medium">Free Plan</p>
          <p className="text-xs text-muted-foreground mt-1">10/30 posts generated</p>
          <div className="h-1.5 bg-muted mt-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-1/3 rounded-full"></div>
          </div>
          <button className="w-full mt-3 text-xs bg-primary/10 text-primary py-1.5 rounded-md font-medium hover:bg-primary/20 transition-colors">
            Upgrade Plan
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

const AppHeader = ({ activeSection }: { activeSection: ActiveSection }) => {
  const [darkMode, setDarkMode] = useState(0);
  console.log("aa:", activeSection)
  const { toggleSidebar } = useSidebar();

  return (
    <header className="h-16 border-b flex items-center justify-between px-6 bg-background">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden text-[#205781]">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <h1 className="text-xl font-semibold">
        {activeSection === "post-generator" && "Post Generator"}
        {activeSection === "generated-posts" && "Generated Posts"}
        {activeSection === "subscription" && "Subscription"}
        {activeSection === "settings" && "Settings"}
      </h1>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span>John Doe</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => signOut()}
            >Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header >

  )
}

