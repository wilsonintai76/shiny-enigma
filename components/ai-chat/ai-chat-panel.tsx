"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  Type,
  Wand2,
  Languages,
  CheckCircle2,
  PenTool,
  X,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

interface AIChatPanelProps {
  isOpen: boolean
  onClose: () => void
}

type EnhancementType = {
  id: string
  name: string
  icon: React.ReactNode
  description: string
}

export function AIChatPanel({ isOpen, onClose }: AIChatPanelProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [inputText, setInputText] = useState("")
  const [messages, setMessages] = useState<Array<{ type: "user" | "ai"; content: string }>>([])

  const enhancementTypes: EnhancementType[] = [
    {
      id: "tone",
      name: "Tone Adjustment",
      icon: <Type className="h-4 w-4" />,
      description: "Adjust the tone to be formal, casual, or professional",
    },
    {
      id: "clarity",
      name: "Clarity Improvement",
      icon: <Wand2 className="h-4 w-4" />,
      description: "Make your writing clearer and more concise",
    },
    {
      id: "style",
      name: "Style Enhancement",
      icon: <PenTool className="h-4 w-4" />,
      description: "Enhance writing style and flow",
    },
    {
      id: "grammar",
      name: "Grammar Check",
      icon: <CheckCircle2 className="h-4 w-4" />,
      description: "Check and correct grammar issues",
    },
    {
      id: "translate",
      name: "Translation",
      icon: <Languages className="h-4 w-4" />,
      description: "Translate your content to other languages",
    },
  ]

  const handleSubmit = () => {
    if (!inputText.trim()) return

    // Add user message
    setMessages(prev => [...prev, { type: "user", content: inputText }])
    
    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "ai", 
        content: `Here's a suggestion for your ${selectedType} request: [AI enhancement suggestion would go here]` 
      }])
    }, 1000)

    setInputText("")
  }

  if (!isOpen) return null

  return (
    <div className="w-96 border-l border-border bg-background flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <h2 className="font-semibold">AI Writing Assistant</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {!selectedType ? (
        <div className="flex-1 p-4 space-y-4">
          <h3 className="font-medium">Select Enhancement Type</h3>
          <div className="space-y-2">
            {enhancementTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent text-left"
              >
                <div className="p-2 rounded-md bg-primary/10 text-primary">
                  {type.icon}
                </div>
                <div>
                  <div className="font-medium">{type.name}</div>
                  <div className="text-sm text-muted-foreground">{type.description}</div>
                </div>
                <ChevronRight className="h-4 w-4 ml-auto" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="p-2 border-b bg-muted/50">
            <button
              onClick={() => setSelectedType(null)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to enhancement types
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="flex-1 min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            <Button
              className="w-full mt-2"
              onClick={handleSubmit}
              disabled={!inputText.trim()}
            >
              Enhance Text
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
