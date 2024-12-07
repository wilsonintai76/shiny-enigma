"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Send, Copy, CheckCheck, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant"
  content: string
  status?: "generating" | "error" | "complete"
}

interface AIChatProps {
  onSuggestionApply?: (suggestion: string) => void
}

const mockResponses = [
  "Here's a suggested chapter outline for your book:\n\n1. Introduction\n2. Main Characters\n3. Setting the Scene\n4. Rising Action\n5. Climax\n6. Resolution",
  "Consider adding more descriptive details to your scene. For example:\n\nThe old house stood silently against the darkening sky, its weathered windows reflecting the last rays of sunset like tired eyes.",
  "You could develop your character's motivation by exploring their past. What events shaped their current beliefs and goals?",
  "Here's a possible plot twist:\n\nReveal that the mysterious letter wasn't actually from the protagonist's long-lost sister, but from someone who wants them to believe she's still alive."
]

export function AIChat({ onSuggestionApply }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      role: "user",
      content: input,
      status: "complete"
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000))
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
      
      const aiMessage: Message = {
        role: "assistant",
        content: randomResponse,
        status: "complete"
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
      toast({
        description: "Copied to clipboard",
      })
    } catch (err) {
      toast({
        description: "Failed to copy text",
        variant: "destructive",
      })
    }
  }

  const handleApply = (suggestion: string) => {
    onSuggestionApply?.(suggestion)
    toast({
      description: "Applied suggestion to editor",
    })
  }

  return (
    <div className="flex h-[500px] flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex w-full gap-2 rounded-lg p-3",
              message.role === "assistant" ? "bg-muted" : "bg-accent"
            )}
          >
            <div className="flex-1 space-y-2">
              <div className="prose prose-sm dark:prose-invert">
                {message.content.split("\n").map((line, i) => (
                  <p key={i} className="leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
              {message.role === "assistant" && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(message.content, index)}
                  >
                    {copiedIndex === index ? (
                      <CheckCheck className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy</span>
                  </Button>
                  {onSuggestionApply && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleApply(message.content)}
                    >
                      Apply
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask for writing suggestions..."
              className="min-h-[60px] max-h-[150px] overflow-y-auto resize-none pr-12"
              rows={2}
            />
            <Button 
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 bottom-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
