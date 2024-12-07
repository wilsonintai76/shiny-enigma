"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Key } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function AISettings() {
  const { toast } = useToast()
  const [language, setLanguage] = React.useState("")
  const [useCustomLanguage, setUseCustomLanguage] = React.useState(false)
  const [isTestingConnection, setIsTestingConnection] = React.useState(false)
  
  // AI Provider Settings
  const [selectedProvider, setSelectedProvider] = React.useState<string>("openai")
  const [apiKey, setApiKey] = React.useState<string>("")
  const [modelName, setModelName] = React.useState<string>("")
  const [baseUrl, setBaseUrl] = React.useState<string>("")
  const [useOllama, setUseOllama] = React.useState(false)

  const handleTestConnection = async () => {
    setIsTestingConnection(true)
    try {
      // Simulate API test
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Connection Successful",
        description: "Successfully connected to the AI provider.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Failed to connect to the AI provider. Please check your settings.",
      })
    } finally {
      setIsTestingConnection(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Language Settings</h3>
          <Badge variant="secondary">Beta</Badge>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="custom-language"
              checked={useCustomLanguage}
              onCheckedChange={(checked) => setUseCustomLanguage(checked as boolean)}
            />
            <Label htmlFor="custom-language">Use custom language</Label>
          </div>
          {useCustomLanguage && (
            <Input
              placeholder="Enter custom language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">AI Provider Settings</h3>
          <Badge variant="secondary">Beta</Badge>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>AI Provider</Label>
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger>
                <SelectValue placeholder="Select AI provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="anthropic">Anthropic</SelectItem>
                <SelectItem value="google">Google AI</SelectItem>
                <SelectItem value="custom">Custom Provider</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>API Key</Label>
            <Input
              type="password"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          {selectedProvider === "custom" && (
            <>
              <div className="space-y-2">
                <Label>Model Name</Label>
                <Input
                  placeholder="Enter model name (e.g., gpt-4-1106-preview)"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Base URL (Optional)</Label>
                <Input
                  placeholder="Enter base URL for custom endpoint"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="use-ollama"
              checked={useOllama}
              onCheckedChange={(checked) => setUseOllama(checked as boolean)}
            />
            <Label htmlFor="use-ollama">Enable Ollama integration</Label>
          </div>

          <Button 
            onClick={handleTestConnection} 
            disabled={!apiKey || isTestingConnection}
            className="w-full"
          >
            {isTestingConnection ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing Connection...
              </>
            ) : (
              <>
                <Key className="mr-2 h-4 w-4" />
                Test Connection
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
