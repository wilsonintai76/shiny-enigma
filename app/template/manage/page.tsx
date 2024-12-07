"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function TemplateManagePage() {
  const router = useRouter()
  const [templateData, setTemplateData] = useState({
    name: "",
    category: "",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Save template data
    console.log("Template data:", templateData)
    // Navigate to settings page for this template
    router.push(`/template/settings/${templateData.name.toLowerCase().replace(/\s+/g, "-")}`)
  }

  return (
    <div className="container max-w-2xl py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create Template</h1>
        <p className="text-muted-foreground">
          Create a new template for your documents
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Template Details</CardTitle>
            <CardDescription>
              Enter the basic information for your template
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                placeholder="Enter template name"
                value={templateData.name}
                onChange={(e) =>
                  setTemplateData({ ...templateData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={templateData.category}
                onValueChange={(value) =>
                  setTemplateData({ ...templateData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="book">Book</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="report">Report</SelectItem>
                  <SelectItem value="documentation">Documentation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter template description"
                value={templateData.description}
                onChange={(e) =>
                  setTemplateData({ ...templateData, description: e.target.value })
                }
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Create Template</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
