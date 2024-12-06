export interface TemplateChapter {
  title: string;
  description: string;
  suggestedContent?: string;
}

export interface Template {
  id: string;
  title: string;
  category: string;
  description: string;
  chapters: TemplateChapter[];
  usageCount: number;
  rating: number;
  image: string;
}

export const templates: Template[] = [
  {
    id: "1",
    title: "Business Strategy Guide",
    category: "Business",
    description: "A comprehensive template for business strategy books with pre-defined chapters and outlines.",
    chapters: [
      {
        title: "Executive Summary",
        description: "Overview of your business strategy",
        suggestedContent: "Start with a compelling overview of your business strategy. Include your mission statement, key objectives, and the unique value proposition."
      },
      {
        title: "Market Analysis",
        description: "Detailed analysis of your target market",
        suggestedContent: "Analyze your target market, including market size, trends, customer segments, and competitive landscape."
      },
      {
        title: "Strategic Framework",
        description: "Core strategic framework and methodology",
        suggestedContent: "Present your strategic framework, including your approach to achieving competitive advantage and key success factors."
      }
    ],
    usageCount: 2450,
    rating: 4.8,
    image: "/templates/business.jpg"
  },
  {
    id: "2",
    title: "Personal Development Journey",
    category: "Self-Help",
    description: "Perfect structure for self-help books with exercises and reflection sections.",
    chapters: [
      {
        title: "Self-Discovery",
        description: "Understanding your current state",
        suggestedContent: "Guide readers through self-assessment exercises to understand their current situation and identify areas for growth."
      },
      {
        title: "Goal Setting",
        description: "Setting clear and achievable goals",
        suggestedContent: "Help readers set SMART goals and create an action plan for personal development."
      },
      {
        title: "Action Steps",
        description: "Practical steps for implementation",
        suggestedContent: "Provide practical exercises and daily habits that readers can implement to achieve their goals."
      }
    ],
    usageCount: 1850,
    rating: 4.6,
    image: "/templates/self-help.jpg"
  },
  {
    id: "3",
    title: "Technical Documentation",
    category: "Technology",
    description: "Ideal for technical books and documentation with code examples and diagrams.",
    chapters: [
      {
        title: "Introduction",
        description: "Overview of the technical concept",
        suggestedContent: "Introduce the technical concept, its importance, and what readers will learn."
      },
      {
        title: "Core Concepts",
        description: "Fundamental technical concepts",
        suggestedContent: "Explain the core technical concepts with clear examples and diagrams."
      },
      {
        title: "Implementation Guide",
        description: "Step-by-step implementation",
        suggestedContent: "Provide detailed implementation steps with code examples and best practices."
      }
    ],
    usageCount: 980,
    rating: 4.7,
    image: "/templates/tech.jpg"
  }
];
