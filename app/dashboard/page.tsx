"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  BookText,
  PenTool,
  Sparkles,
  Clock,
  FileText,
  Zap,
  ArrowRight,
} from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      name: "Books Written",
      value: "12",
      icon: BookText,
      description: "Total books created",
    },
    {
      name: "Words Written",
      value: "24.5k",
      icon: PenTool,
      description: "Total words written",
    },
    {
      name: "AI Suggestions",
      value: "156",
      icon: Sparkles,
      description: "AI suggestions used",
    },
    {
      name: "Writing Time",
      value: "45h",
      icon: Clock,
      description: "Total time spent writing",
    },
  ]

  const quickActions = [
    {
      name: "Continue Writing",
      description: "Continue where you left off",
      href: "/dashboard/write",
      icon: PenTool,
    },
    {
      name: "New from Template",
      description: "Start a new book from template",
      href: "/dashboard/templates",
      icon: FileText,
    },
    {
      name: "Quick AI Help",
      description: "Get instant writing assistance",
      href: "/dashboard/write?ai=true",
      icon: Zap,
    },
  ]

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
            >
              <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">
                  {stat.name}
                </h3>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="p-6 pt-0">
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.name}
              href={action.href}
              className="group relative rounded-lg border p-6 hover:bg-accent hover:text-accent-foreground"
            >
              <div className="flex items-center gap-4">
                <Icon className="h-6 w-6" />
                <div>
                  <h3 className="font-semibold">{action.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </div>
              <ArrowRight className="absolute bottom-6 right-6 h-6 w-6 opacity-0 transition-all group-hover:opacity-100" />
            </Link>
          )
        })}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border shadow-sm">
          <div className="p-6">
            <h3 className="font-semibold">Recent Books</h3>
            <p className="text-sm text-muted-foreground">
              Your recently edited books
            </p>
          </div>
        </div>
        <div className="rounded-lg border shadow-sm">
          <div className="p-6">
            <h3 className="font-semibold">Writing Progress</h3>
            <p className="text-sm text-muted-foreground">
              Your writing stats this week
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
