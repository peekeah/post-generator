"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, ChevronDown, LogOut, Menu, MessageSquarePlus, Settings, Sparkles, User2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ModeToggle from "@/components/mode-toggle"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <SidebarProvider>
      <div className="flex w-screen min-h-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar
      variant="floating"
      className="border-r border-[#98D2C0]/30 dark:border-[#4F959D]/30 shadow-lg"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #F6F8D5 100%)",
      }}
    >
      <SidebarHeader className="gradient-header">
        <div className="flex items-center gap-2 px-2 py-3">
          <Sparkles className="h-6 w-6 text-[#205781] dark:text-[#98D2C0]" />
          <span className="text-xl font-bold text-[#205781] dark:text-[#F6F8D5]">PostAI</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard"}
              className="hover:bg-[#98D2C0]/20 data-[active=true]:bg-[#98D2C0]/30 data-[active=true]:text-[#205781]"
            >
              <Link href="/dashboard">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="7" height="9" x="3" y="3" rx="1" />
                  <rect width="7" height="5" x="14" y="3" rx="1" />
                  <rect width="7" height="9" x="14" y="12" rx="1" />
                  <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/generator"}
              className="hover:bg-[#98D2C0]/20 data-[active=true]:bg-[#98D2C0]/30 data-[active=true]:text-[#205781]"
            >
              <Link href="/dashboard/generator">
                <MessageSquarePlus className="h-5 w-5" />
                <span>Post Generator</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/subscription"}
              className="hover:bg-[#98D2C0]/20 data-[active=true]:bg-[#98D2C0]/30 data-[active=true]:text-[#205781]"
            >
              <Link href="/dashboard/subscription">
                <Sparkles className="h-5 w-5" />
                <span>Subscription</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/settings"}
              className="hover:bg-[#98D2C0]/20 data-[active=true]:bg-[#98D2C0]/30 data-[active=true]:text-[#205781]"
            >
              <Link href="/dashboard/settings">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="gradient-footer">
        <div className="p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex w-full items-center justify-start gap-2 px-2 hover:bg-[#98D2C0]/20"
              >
                <Avatar className="h-6 w-6 border border-[#98D2C0]">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-[#4F959D] text-white">JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col items-start text-sm">
                  <span className="font-medium text-[#205781]">John Doe</span>
                  <span className="text-xs text-[#4F959D]">john@example.com</span>
                </div>
                <ChevronDown className="h-4 w-4 text-[#4F959D]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User2 className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

function AppHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[#98D2C0]/30 dark:border-[#4F959D]/30 px-6"
      style={{
        background: "linear-gradient(to right, rgba(246, 248, 213, 0.9), rgba(152, 210, 192, 0.3))",
        backdropFilter: "blur(8px)",
      }}
    >
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden text-[#205781]">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div className="flex items-center md:hidden">
        <Sparkles className="h-5 w-5 text-[#205781] dark:text-[#98D2C0]" />
        <span className="ml-2 text-lg font-bold text-[#205781] dark:text-[#F6F8D5]">PostAI</span>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-[#98D2C0] hover:bg-[#98D2C0]/20 text-[#205781]"
        >
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>

        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8 border border-[#98D2C0]">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback className="bg-[#4F959D] text-white">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User2 className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

