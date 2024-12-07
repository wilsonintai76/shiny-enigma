import { NextResponse } from "next/server"

interface TemplateData {
  name: string
  category: string
  description: string
  defaultSections: {
    name: string
    type: string
    required: boolean
  }[]
  style: {
    font: string
    fontSize: string
    lineHeight: string
  }
}

export async function GET(
  request: Request,
  { params }: { params: { templateId: string } }
) {
  try {
    // TODO: Replace with actual database query
    const template = {
      id: params.templateId,
      name: "Sample Template",
      category: "article",
      description: "A sample template for testing",
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
      ],
      style: {
        font: "Inter",
        fontSize: "16px",
        lineHeight: "1.5",
      },
    }

    return NextResponse.json(template)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch template" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { templateId: string } }
) {
  try {
    const data: TemplateData = await request.json()

    // TODO: Replace with actual database update
    const updatedTemplate = {
      id: params.templateId,
      ...data,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(updatedTemplate)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update template" },
      { status: 500 }
    )
  }
}
