"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  FileUser,
  Frame,
  GalleryVerticalEnd,
  Hospital,
  LayoutPanelTop,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Ferrovit",
    email: "ferrovit@gmail.com",
    avatar: "/images/logo.png",
  },
  teams: [
    {
      name: "Ferrovit",
      logo: GalleryVerticalEnd,
      plan: "Dashboard",
    },
    {
      name: "Ferrovit",
      logo: AudioWaveform,
      plan: "",
    },
    {
      name: "Ferrovit",
      logo: Command,
      plan: "",
    },
  ],
  navMain: [
    {
      title: "Quiz Users",
      url: "#",
      icon: FileUser,
      isActive: true,
      items: [
        {
          title: "Participants",
          url: "/dashboard/quiz-users",
        },
      ],
    },
    {
      title: "Blogs",
      url: "#",
      icon: LayoutPanelTop,
      items: [
        {
          title: "Blog-Lists",
          url: "/dashboard/blog",
        },
        {
          title: "Blog-Create",
          url: "/dashboard/blog/create",
        },
      ],
    },
    {
      title: "Clinic",
      url: "#",
      icon: Hospital,
      items: [
        {
          title: "Address-List",
          url: "#",
        },
        {
          title: "Address-Create",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
