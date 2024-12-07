import React from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  Plus,
  MoreVertical,
  FileText,
  Image as ImageIcon,
  Video,
} from "lucide-react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

interface DocumentItem {
  id: string
  type: "file" | "folder" | "image" | "video" | "formula" | "code"
  name: string
  children?: DocumentItem[]
  content?: string
}

interface DocumentExplorerProps {
  items: DocumentItem[]
  onItemSelect: (item: DocumentItem) => void
  onItemsChange: (items: DocumentItem[]) => void
}

export function DocumentExplorer({ items, onItemSelect, onItemsChange }: DocumentExplorerProps) {
  const [expandedFolders, setExpandedFolders] = React.useState<string[]>([])

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev =>
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    )
  }

  const getItemIcon = (type: DocumentItem["type"]) => {
    switch (type) {
      case "folder":
        return <Folder className="h-4 w-4 text-muted-foreground" />
      case "image":
        return <ImageIcon className="h-4 w-4 text-blue-500" />
      case "video":
        return <Video className="h-4 w-4 text-purple-500" />
      case "formula":
        return <File className="h-4 w-4 text-green-500" />
      case "code":
        return <FileText className="h-4 w-4 text-orange-500" />
      default:
        return <File className="h-4 w-4 text-muted-foreground" />
    }
  }

  const addItem = (parentId: string | null, type: DocumentItem["type"]) => {
    const newItem: DocumentItem = {
      id: Math.random().toString(36).substring(7),
      type,
      name: `New ${type}`,
      children: type === "folder" ? [] : undefined
    }

    if (!parentId) {
      onItemsChange([...items, newItem])
      return
    }

    const updateItems = (items: DocumentItem[]): DocumentItem[] =>
      items.map(item => {
        if (item.id === parentId) {
          return {
            ...item,
            children: [...(item.children || []), newItem]
          }
        }
        if (item.children) {
          return {
            ...item,
            children: updateItems(item.children)
          }
        }
        return item
      })

    onItemsChange(updateItems(items))
  }

  const renderItem = (item: DocumentItem, level: number = 0) => {
    const isFolder = item.type === "folder"
    const isExpanded = expandedFolders.includes(item.id)

    return (
      <div key={item.id}>
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              className={cn(
                "flex items-center gap-2 py-1 px-2 hover:bg-accent rounded-sm cursor-pointer",
                "group relative"
              )}
              style={{ paddingLeft: `${level * 12 + 8}px` }}
              onClick={() => {
                if (isFolder) {
                  toggleFolder(item.id)
                } else {
                  onItemSelect(item)
                }
              }}
            >
              {isFolder && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </Button>
              )}
              {getItemIcon(item.type)}
              <span className="text-sm">{item.name}</span>
              <div className="ml-auto opacity-0 group-hover:opacity-100 flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            {isFolder && (
              <>
                <ContextMenuItem onClick={() => addItem(item.id, "file")}>
                  Add File
                </ContextMenuItem>
                <ContextMenuItem onClick={() => addItem(item.id, "folder")}>
                  Add Folder
                </ContextMenuItem>
                <ContextMenuItem onClick={() => addItem(item.id, "image")}>
                  Add Image
                </ContextMenuItem>
                <ContextMenuItem onClick={() => addItem(item.id, "video")}>
                  Add Video
                </ContextMenuItem>
                <ContextMenuItem onClick={() => addItem(item.id, "formula")}>
                  Add Formula
                </ContextMenuItem>
                <ContextMenuItem onClick={() => addItem(item.id, "code")}>
                  Add Code Block
                </ContextMenuItem>
              </>
            )}
            <ContextMenuItem className="text-red-600">
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        {isFolder && isExpanded && item.children && (
          <div>
            {item.children.map(child => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="h-full border-r bg-muted/10">
      <div className="flex items-center justify-between p-2 border-b">
        <h2 className="text-sm font-semibold">Document Explorer</h2>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => addItem(null, "folder")}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-2.5rem)]">
        <div className="p-2">
          {items.map(item => renderItem(item))}
        </div>
      </ScrollArea>
    </div>
  )
}
