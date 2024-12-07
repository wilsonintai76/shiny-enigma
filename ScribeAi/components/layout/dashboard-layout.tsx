"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { NavSidebar } from "../nav-sidebar"

export function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <NavSidebar />
      <div className="flex-1">
        <div className="container p-4">
          {children}
        </div>
      </div>
    </div>
  )
}
