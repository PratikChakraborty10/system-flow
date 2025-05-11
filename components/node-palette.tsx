"use client"

import type { DragEvent } from "react"
import {
  ArrowLeftRight,
  Box,
  CircleDot,
  Database,
  FileText,
  TypeIcon as FunctionIcon,
  MessageSquare,
} from "lucide-react"

const nodeTypes = [
  { type: "input", label: "Input", icon: CircleDot, color: "bg-blue-100 border-blue-300" },
  { type: "output", label: "Output", icon: ArrowLeftRight, color: "bg-green-100 border-green-300" },
  { type: "default", label: "Default", icon: Box, color: "bg-gray-100 border-gray-300" },
  { type: "function", label: "Function", icon: FunctionIcon, color: "bg-purple-100 border-purple-300" },
  { type: "data", label: "Data", icon: Database, color: "bg-yellow-100 border-yellow-300" },
  { type: "text", label: "Text", icon: FileText, color: "bg-pink-100 border-pink-300" },
  { type: "message", label: "Message", icon: MessageSquare, color: "bg-indigo-100 border-indigo-300" },
]

export function NodePalette() {
  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <div className="grid grid-cols-2 gap-2 px-1">
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          className={`flex cursor-grab flex-col items-center rounded-md border p-2 ${node.color} transition-colors hover:bg-sidebar-accent`}
          draggable
          onDragStart={(event) => onDragStart(event, node.type)}
        >
          <node.icon className="mb-1 h-5 w-5" />
          <span className="text-xs">{node.label}</span>
        </div>
      ))}
    </div>
  )
}

