"use client"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { templates } from "@/lib/template-data"
import { Pencil, Trash2, Plus } from "lucide-react"
import Link from "next/link"

export default function TemplateSettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Template Settings</h1>
        <p className="text-gray-600">Manage your template preferences</p>
      </div>

      <Tabs defaultValue="custom" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="custom">Custom Templates</TabsTrigger>
          <TabsTrigger value="import">Import/Export</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure default template settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-template">Default Template</Label>
                <Input
                  id="default-template"
                  placeholder="Select default template"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auto-save">Auto-save Interval (minutes)</Label>
                <Input id="auto-save" type="number" defaultValue={5} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="custom">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Custom Templates</CardTitle>
                    <CardDescription>
                      Create and manage your custom templates
                    </CardDescription>
                  </div>
                  <Link href="/template/create/custom">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Template
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates.filter(t => t.category === "Custom").map((template) => (
                    <Card key={template.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{template.title}</CardTitle>
                            <CardDescription>{template.description}</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardFooter>
                        <div className="flex justify-between w-full text-sm text-gray-600">
                          <span>Used {template.usageCount} times</span>
                          <span>Rating: {template.rating}/5</span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                  {templates.filter(t => t.category === "Custom").length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No custom templates yet.</p>
                      <p className="text-sm">Create your first template to get started.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="import">
          <Card>
            <CardHeader>
              <CardTitle>Import/Export Templates</CardTitle>
              <CardDescription>
                Import templates or export your custom templates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Button variant="outline" className="mr-4">
                  Import Template
                </Button>
                <Button>Export Templates</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
