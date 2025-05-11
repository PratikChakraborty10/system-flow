"use client"

import type React from "react"

import type { DragEvent } from "react"

type SystemDesignTemplate = {
  name: string
  icon: React.ComponentType<{ className?: string }>
  nodes: Array<{
    id: string
    type: string
    label: string
    position: { x: number; y: number }
  }>
}

type SystemDesignTemplateProps = {
  templates: SystemDesignTemplate[]
}

export function SystemDesignTemplate({ templates }: SystemDesignTemplateProps) {
  const onDragStart = (event: DragEvent<HTMLDivElement>, template: SystemDesignTemplate) => {
    event.dataTransfer.setData("application/reactflow-template", JSON.stringify(template))
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <div className="flex flex-col gap-2 px-1">
      {templates.map((template) => (
        <div
          key={template.name}
          className="flex cursor-grab items-center gap-2 rounded-md border border-gray-300 bg-gray-50 p-2 transition-colors hover:bg-sidebar-accent"
          draggable
          onDragStart={(event) => onDragStart(event, template)}
        >
          <template.icon className="h-5 w-5" />
          <span className="text-sm">{template.name}</span>
        </div>
      ))}
    </div>
  )
}

