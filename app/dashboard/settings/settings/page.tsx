"use client"

import { Separator } from "@/components/ui/separator"
import { GeneralSettings } from "@/components/settings/general-settings"

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your project settings and preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="max-w-2xl">
        <GeneralSettings />
      </div>
    </div>
  )
}
