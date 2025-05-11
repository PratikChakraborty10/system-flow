"use client"
import { ChevronRight, Instagram, Workflow, Youtube, Car, Tv, Twitter } from "lucide-react"

import { NodePalette } from "./node-palette"
import { SystemDesignTemplate } from "./system-design-template"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// System design templates data
const systemDesigns = [
  {
    name: "Design YouTube",
    icon: Youtube,
    nodes: [
      { id: "yt-frontend", type: "default", label: "Frontend", position: { x: 50, y: 50 } },
      { id: "yt-api", type: "function", label: "API Gateway", position: { x: 250, y: 50 } },
      { id: "yt-upload", type: "input", label: "Video Upload", position: { x: 50, y: 150 } },
      { id: "yt-transcode", type: "function", label: "Transcoding Service", position: { x: 250, y: 150 } },
      { id: "yt-storage", type: "data", label: "Video Storage", position: { x: 450, y: 150 } },
      { id: "yt-recommend", type: "function", label: "Recommendation Engine", position: { x: 250, y: 250 } },
      { id: "yt-analytics", type: "data", label: "Analytics DB", position: { x: 450, y: 250 } },
      { id: "yt-cdn", type: "output", label: "CDN", position: { x: 650, y: 150 } },
    ],
  },
  {
    name: "Design Instagram",
    icon: Instagram,
    nodes: [
      { id: "ig-frontend", type: "default", label: "Frontend", position: { x: 50, y: 50 } },
      { id: "ig-api", type: "function", label: "API Gateway", position: { x: 250, y: 50 } },
      { id: "ig-upload", type: "input", label: "Photo Upload", position: { x: 50, y: 150 } },
      { id: "ig-filter", type: "function", label: "Filter Service", position: { x: 250, y: 150 } },
      { id: "ig-storage", type: "data", label: "Media Storage", position: { x: 450, y: 150 } },
      { id: "ig-feed", type: "function", label: "Feed Generator", position: { x: 250, y: 250 } },
      { id: "ig-graph", type: "data", label: "Social Graph", position: { x: 450, y: 250 } },
      { id: "ig-cdn", type: "output", label: "CDN", position: { x: 650, y: 150 } },
    ],
  },
  {
    name: "Design Uber",
    icon: Car,
    nodes: [
      { id: "ub-rider-app", type: "input", label: "Rider App", position: { x: 50, y: 50 } },
      { id: "ub-driver-app", type: "input", label: "Driver App", position: { x: 50, y: 150 } },
      { id: "ub-api", type: "function", label: "API Gateway", position: { x: 250, y: 100 } },
      { id: "ub-matching", type: "function", label: "Matching Service", position: { x: 450, y: 100 } },
      { id: "ub-location", type: "function", label: "Location Tracking", position: { x: 250, y: 200 } },
      { id: "ub-payment", type: "function", label: "Payment Processing", position: { x: 450, y: 200 } },
      { id: "ub-user-db", type: "data", label: "User Database", position: { x: 650, y: 50 } },
      { id: "ub-trip-db", type: "data", label: "Trip Database", position: { x: 650, y: 150 } },
      { id: "ub-analytics", type: "output", label: "Analytics", position: { x: 650, y: 250 } },
    ],
  },
  {
    name: "Design Netflix",
    icon: Tv,
    nodes: [
      { id: "nf-frontend", type: "default", label: "Frontend", position: { x: 50, y: 50 } },
      { id: "nf-api", type: "function", label: "API Gateway", position: { x: 250, y: 50 } },
      { id: "nf-content", type: "data", label: "Content Database", position: { x: 450, y: 50 } },
      { id: "nf-recommend", type: "function", label: "Recommendation Engine", position: { x: 250, y: 150 } },
      { id: "nf-user", type: "data", label: "User Database", position: { x: 450, y: 150 } },
      { id: "nf-billing", type: "function", label: "Billing Service", position: { x: 250, y: 250 } },
      { id: "nf-cdn", type: "output", label: "CDN", position: { x: 650, y: 100 } },
      { id: "nf-encoding", type: "function", label: "Encoding Service", position: { x: 450, y: 250 } },
    ],
  },
  {
    name: "Design Twitter",
    icon: Twitter,
    nodes: [
      { id: "tw-frontend", type: "default", label: "Frontend", position: { x: 50, y: 50 } },
      { id: "tw-api", type: "function", label: "API Gateway", position: { x: 250, y: 50 } },
      { id: "tw-tweet", type: "input", label: "Tweet Service", position: { x: 50, y: 150 } },
      { id: "tw-timeline", type: "function", label: "Timeline Service", position: { x: 250, y: 150 } },
      { id: "tw-search", type: "function", label: "Search Service", position: { x: 450, y: 50 } },
      { id: "tw-notification", type: "function", label: "Notification Service", position: { x: 450, y: 150 } },
      { id: "tw-graph", type: "data", label: "Social Graph", position: { x: 250, y: 250 } },
      { id: "tw-tweets-db", type: "data", label: "Tweets Database", position: { x: 450, y: 250 } },
      { id: "tw-cache", type: "data", label: "Cache Layer", position: { x: 650, y: 150 } },
    ],
  },
]

// Sidebar sections
const sidebarSections = [
  {
    title: "Nodes",
    icon: Workflow,
    content: <NodePalette />,
    defaultOpen: true,
  },
  {
    title: "System Design Questions",
    icon: Workflow,
    content: <SystemDesignTemplate templates={systemDesigns} />,
    defaultOpen: true,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-4 py-2">
          <Workflow className="h-6 w-6" />
          <h1 className="text-lg font-semibold">System Design Flow</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {sidebarSections.map((section) => (
          <Collapsible key={section.title} defaultOpen={section.defaultOpen} className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger className="flex w-full items-center">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <section.icon className="mr-2 h-4 w-4" />
                        {section.title}
                        <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <div className="py-2">{section.content}</div>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

