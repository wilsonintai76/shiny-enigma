"use client"

import { useState, useEffect } from "react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PageProps {
  params: {
    templateId: string
  }
}

export default function TemplateSettingsPage({ params }: PageProps) {
  const [templateData, setTemplateData] = useState({
    name: "",
    category: "",
    description: "",
    defaultSections: [
      {
        name: "Introduction",
        type: "text",
        required: true,
      },
      {
        name: "Main Content",
        type: "text",
        required: true,
      },
      {
        name: "Conclusion",
        type: "text",
        required: true,
      },
    ],
    style: {
      font: "Inter",
      fontSize: "16px",
      lineHeight: "1.5",
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchTemplate = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/templates/${params.templateId}`)
        const data = await response.json()
        if (response.ok) {
          setTemplateData(data)
        } else {
          console.error("Failed to fetch template:", data.error)
        }
      } catch (error) {
        console.error("Error fetching template:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplate()
  }, [params.templateId])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch(`/api/templates/${params.templateId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(templateData),
      })

      const data = await response.json()
      if (response.ok) {
        // TODO: Show success toast
        console.log("Template updated successfully:", data)
      } else {
        // TODO: Show error toast
        console.error("Failed to update template:", data.error)
      }
    } catch (error) {
      console.error("Error updating template:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-6">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="text-muted-foreground">Loading template...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Template Settings</h1>
        <p className="text-muted-foreground">
          Configure your template settings and structure
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic template information and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Template Name</Label>
                <Input
                  id="name"
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
                  value={templateData.description}
                  onChange={(e) =>
                    setTemplateData({ ...templateData, description: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Template Sections</CardTitle>
              <CardDescription>
                Define the default sections for this template
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templateData.defaultSections.map((section, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Input
                      value={section.name}
                      onChange={(e) => {
                        const newSections = [...templateData.defaultSections]
                        newSections[index] = {
                          ...section,
                          name: e.target.value,
                        }
                        setTemplateData({
                          ...templateData,
                          defaultSections: newSections,
                        })
                      }}
                    />
                    <Select
                      value={section.type}
                      onValueChange={(value) => {
                        const newSections = [...templateData.defaultSections]
                        newSections[index] = {
                          ...section,
                          type: value,
                        }
                        setTemplateData({
                          ...templateData,
                          defaultSections: newSections,
                        })
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="image">Image</SelectItem>
                        <SelectItem value="code">Code</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        const newSections = templateData.defaultSections.filter(
                          (_, i) => i !== index
                        )
                        setTemplateData({
                          ...templateData,
                          defaultSections: newSections,
                        })
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    setTemplateData({
                      ...templateData,
                      defaultSections: [
                        ...templateData.defaultSections,
                        {
                          name: "New Section",
                          type: "text",
                          required: false,
                        },
                      ],
                    })
                  }}
                >
                  Add Section
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="style" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Style Settings</CardTitle>
              <CardDescription>
                Configure the default styling for this template
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="font">Font Family</Label>
                <Select
                  value={templateData.style.font}
                  onValueChange={(value) =>
                    setTemplateData({
                      ...templateData,
                      style: { ...templateData.style, font: value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size</Label>
                <Select
                  value={templateData.style.fontSize}
                  onValueChange={(value) =>
                    setTemplateData({
                      ...templateData,
                      style: { ...templateData.style, fontSize: value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="14px">14px</SelectItem>
                    <SelectItem value="16px">16px</SelectItem>
                    <SelectItem value="18px">18px</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lineHeight">Line Height</Label>
                <Select
                  value={templateData.style.lineHeight}
                  onValueChange={(value) =>
                    setTemplateData({
                      ...templateData,
                      style: { ...templateData.style, lineHeight: value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select line height" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.4">1.4</SelectItem>
                    <SelectItem value="1.5">1.5</SelectItem>
                    <SelectItem value="1.6">1.6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
