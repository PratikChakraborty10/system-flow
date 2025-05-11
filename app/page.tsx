"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { FlowCanvas } from "@/components/flow-canvas"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-0">
        <FlowCanvas />
      </SidebarInset>
    </SidebarProvider>
  )
}

