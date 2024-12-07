export interface ContentElement {
  type: "text" | "image" | "video" | "formula" | "code" | "table" | "citation";
  content: string;
  caption?: string;
  language?: string; // For code blocks
  url?: string; // For videos/images
  metadata?: Record<string, any>; // For additional data like citations
}

export interface TemplateSection {
  id: string;
  title: string;
  description: string;
  elements: ContentElement[];
  suggestedContent?: string;
}

export interface TemplateChapter {
  title: string;
  description: string;
  sections: TemplateSection[];
  suggestedContent?: string;
}

export interface Template {
  id: string;
  title: string;
  category?: string;
  description: string;
  chapters: TemplateChapter[];
  usageCount: number;
  rating: number;
  image: string;
}

export const templates: Template[] = [
  {
    id: "technical-book",
    title: "Technical Documentation",
    category: "Technical",
    description: "A comprehensive template for technical books with support for code, formulas, and diagrams.",
    chapters: [
      {
        title: "Introduction",
        description: "Overview of the technical topic",
        sections: [
          {
            id: "intro-overview",
            title: "Overview",
            description: "Brief introduction to the topic",
            elements: [
              {
                type: "text",
                content: "Start with a high-level overview of the technical concept."
              }
            ],
            suggestedContent: "Begin with a clear explanation of what this technical documentation covers."
          },
          {
            id: "prerequisites",
            title: "Prerequisites",
            description: "Required knowledge and setup",
            elements: [
              {
                type: "text",
                content: "List the required knowledge and tools needed to follow this documentation."
              },
              {
                type: "code",
                content: "# Example setup code\npip install required-package",
                language: "bash"
              }
            ]
          }
        ]
      },
      {
        title: "Core Concepts",
        description: "Fundamental technical concepts",
        sections: [
          {
            id: "concept-theory",
            title: "Theoretical Background",
            description: "Mathematical and theoretical foundations",
            elements: [
              {
                type: "text",
                content: "Explain the theoretical foundations of the technical concept."
              },
              {
                type: "formula",
                content: "E = mc^2",
                caption: "Einstein's mass-energy equivalence"
              }
            ]
          },
          {
            id: "implementation",
            title: "Implementation",
            description: "Code implementation details",
            elements: [
              {
                type: "text",
                content: "Provide a detailed explanation of the implementation."
              },
              {
                type: "code",
                content: "def example_function():\n    return 'Hello, World!'",
                language: "python",
                caption: "Example implementation"
              },
              {
                type: "image",
                content: "/diagrams/architecture.png",
                caption: "System architecture diagram",
                url: "/diagrams/architecture.png"
              }
            ]
          }
        ]
      },
      {
        title: "Advanced Topics",
        description: "In-depth technical discussions",
        sections: [
          {
            id: "advanced-concepts",
            title: "Advanced Concepts",
            description: "Complex technical details",
            elements: [
              {
                type: "text",
                content: "Explore advanced concepts and edge cases."
              },
              {
                type: "code",
                content: "class AdvancedExample:\n    def __init__(self):\n        self.data = []",
                language: "python",
                caption: "Advanced implementation example"
              }
            ]
          },
          {
            id: "performance",
            title: "Performance Considerations",
            description: "Performance analysis and optimization",
            elements: [
              {
                type: "text",
                content: "Discuss performance implications and optimization strategies."
              },
              {
                type: "table",
                content: "| Operation | Time Complexity | Space Complexity |\n|-----------|-----------------|------------------|\n| Insert | O(1) | O(n) |",
                caption: "Performance characteristics"
              }
            ]
          }
        ]
      },
      {
        title: "Examples and Use Cases",
        description: "Practical applications and examples",
        sections: [
          {
            id: "example-basic",
            title: "Basic Examples",
            description: "Simple usage examples",
            elements: [
              {
                type: "text",
                content: "Start with basic examples to demonstrate core functionality."
              },
              {
                type: "code",
                content: "// Basic usage example\nconst result = api.simpleOperation();",
                language: "javascript",
                caption: "Basic usage"
              }
            ]
          },
          {
            id: "example-advanced",
            title: "Advanced Examples",
            description: "Complex usage scenarios",
            elements: [
              {
                type: "text",
                content: "Demonstrate advanced usage patterns and integrations."
              },
              {
                type: "code",
                content: "// Advanced integration example\nclass ComplexSystem {\n  constructor() {\n    this.initialize();\n  }\n}",
                language: "javascript",
                caption: "Advanced integration"
              },
              {
                type: "video",
                content: "https://example.com/demo-video",
                caption: "Demo of advanced features",
                url: "https://example.com/demo-video"
              }
            ]
          }
        ]
      }
    ],
    usageCount: 1200,
    rating: 4.9,
    image: "/templates/technical.jpg"
  },
  {
    id: "research-paper",
    title: "Academic Research Paper",
    category: "Academic",
    description: "Template for academic papers with citation support and LaTeX integration.",
    chapters: [
      {
        title: "Abstract",
        description: "Research summary",
        sections: [
          {
            id: "abstract-main",
            title: "Abstract",
            description: "Brief summary of the research",
            elements: [
              {
                type: "text",
                content: "Summarize your research findings and methodology."
              }
            ]
          }
        ]
      },
      {
        title: "Methodology",
        description: "Research methodology",
        sections: [
          {
            id: "methodology-overview",
            title: "Research Design",
            description: "Detailed methodology",
            elements: [
              {
                type: "table",
                content: "| Variable | Type | Description |\n|----------|------|-------------|\n| x | int | Input variable |",
                caption: "Variables used in the study"
              },
              {
                type: "citation",
                content: "Smith, J. (2023). Research Methods in Computer Science",
                metadata: {
                  doi: "10.1234/example",
                  year: 2023,
                  authors: ["Smith, J."]
                }
              }
            ]
          }
        ]
      }
    ],
    usageCount: 850,
    rating: 4.7,
    image: "/templates/academic.jpg"
  },
  {
    id: "custom-template-1",
    title: "My Custom Template",
    category: "Custom",
    description: "A personalized template for my specific needs",
    chapters: [
      {
        title: "Custom Chapter",
        description: "Your custom chapter description",
        sections: [
          {
            id: "custom-section",
            title: "Custom Section",
            description: "Your custom section description",
            elements: [
              {
                type: "text",
                content: "Start with your custom content here."
              }
            ]
          }
        ]
      }
    ],
    usageCount: 5,
    rating: 4.0,
    image: "/templates/custom.png"
  },
  {
    id: "custom",
    title: "Custom Template",
    category: "documentation",
    description: "",
    chapters: [
      {
        title: "Chapter 1: Introduction",
        description: "",
        sections: [
          {
            id: "",
            title: "Introduction",
            description: "",
            elements: [
              {
                type: "text",
                content: "",
              }
            ]
          },
          {
            id: "",
            title: "Background",
            description: "",
            elements: [
              {
                type: "text",
                content: "",
              }
            ]
          }
        ]
      }
    ],
    usageCount: 0,
    rating: 0,
    image: ""
  }
]
