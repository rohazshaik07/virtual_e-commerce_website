"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, File, Folder } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface FileNode {
  name: string
  type: "file" | "folder"
  path: string
  children?: FileNode[]
  content?: string
  explanation?: string[]
}

interface FolderTreeProps {
  data: FileNode
}

export default function FolderTree({ data }: FolderTreeProps) {
  return (
    <div className="font-mono text-sm">
      <TreeNode node={data} level={0} />
    </div>
  )
}

interface TreeNodeProps {
  node: FileNode
  level: number
}

function TreeNode({ node, level }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(level === 0)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const toggleOpen = () => {
    if (node.type === "folder") {
      setIsOpen(!isOpen)
    } else if (node.type === "file") {
      setIsDialogOpen(true)
    }
  }

  const paddingLeft = `${level * 20}px`

  return (
    <>
      <div
        className={`flex items-center py-1 hover:bg-muted/50 rounded cursor-pointer`}
        style={{ paddingLeft }}
        onClick={toggleOpen}
      >
        {node.type === "folder" ? (
          <>
            {isOpen ? (
              <ChevronDown className="h-4 w-4 mr-1 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 mr-1 text-muted-foreground" />
            )}
            <Folder className="h-4 w-4 mr-2 text-blue-400" />
          </>
        ) : (
          <>
            <span className="w-4 mr-1" />
            <File className="h-4 w-4 mr-2 text-gray-400" />
          </>
        )}
        <span>{node.name}</span>
      </div>

      {isOpen &&
        node.children &&
        node.children.map((child, index) => <TreeNode key={index} node={child} level={level + 1} />)}

      {node.type === "file" && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>{node.path}</DialogTitle>
              <DialogDescription>File content and explanation</DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-md overflow-auto">
                  <pre className="text-xs">{node.content || "No content available"}</pre>
                </div>
                <div className="p-4 space-y-4">
                  <h3 className="text-lg font-bold">Explanation</h3>
                  {node.explanation ? (
                    node.explanation.map((line, i) => (
                      <div key={i} className="mb-2">
                        <p className="text-sm">{line}</p>
                      </div>
                    ))
                  ) : (
                    <p>No explanation available</p>
                  )}
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
