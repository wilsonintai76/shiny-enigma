import React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, BookText } from "lucide-react"
import type { BookMetadata } from "./book-metadata"
import type { Chapter } from "@/app/dashboard/write/page"

interface BookExportProps {
  metadata: BookMetadata
  chapters: Chapter[]
  onExport: (format: string, options: ExportOptions) => Promise<void>
}

interface ExportOptions {
  includeTableOfContents: boolean
  includeCoverPage: boolean
  includeMetadata: boolean
  format: "pdf" | "epub" | "docx"
}

export function BookExportDialog({ metadata, chapters, onExport }: BookExportProps) {
  const [options, setOptions] = React.useState<ExportOptions>({
    includeTableOfContents: true,
    includeCoverPage: true,
    includeMetadata: true,
    format: "pdf"
  })
  const [isExporting, setIsExporting] = React.useState(false)

  const handleExport = async () => {
    try {
      setIsExporting(true)
      await onExport(options.format, options)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Book</DialogTitle>
          <DialogDescription>
            Choose your preferred format and options for exporting your book.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Export Format</Label>
            <Select 
              value={options.format}
              onValueChange={(value) => 
                setOptions(prev => ({ ...prev, format: value as "pdf" | "epub" | "docx" }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="epub">EPUB eBook</SelectItem>
                <SelectItem value="docx">Word Document (DOCX)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <Label>Export Options</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="toc"
                  checked={options.includeTableOfContents}
                  onCheckedChange={(checked) =>
                    setOptions(prev => ({ ...prev, includeTableOfContents: checked as boolean }))
                  }
                />
                <Label htmlFor="toc">Include Table of Contents</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cover"
                  checked={options.includeCoverPage}
                  onCheckedChange={(checked) =>
                    setOptions(prev => ({ ...prev, includeCoverPage: checked as boolean }))
                  }
                />
                <Label htmlFor="cover">Include Cover Page</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="metadata"
                  checked={options.includeMetadata}
                  onCheckedChange={(checked) =>
                    setOptions(prev => ({ ...prev, includeMetadata: checked as boolean }))
                  }
                />
                <Label htmlFor="metadata">Include Book Metadata</Label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>Exporting...</>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Export
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
