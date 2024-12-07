import { templates } from "@/lib/template-data"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function TemplatePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Templates</h1>
          <p className="text-gray-600">Choose a template to get started</p>
        </div>
        <Link href="/template/settings">
          <Button variant="outline">Template Settings</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Link href={`/template/create/${template.id}`} key={template.id}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={template.image}
                    alt={template.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardTitle>{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Used {template.usageCount} times</span>
                  <span>Rating: {template.rating}/5</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
