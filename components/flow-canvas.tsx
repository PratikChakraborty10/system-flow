"use client"

import type React from "react"

import { useCallback, useRef, useState } from "react"
import ReactFlow, {
  Background,
  BackgroundVariant,
  type Connection,
  Controls,
  type Edge,
  MiniMap,
  type Node,
  type NodeTypes,
  type OnConnect,
  type OnDragOver,
  type OnNodesChange,
  type OnEdgesChange,
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Panel,
} from "reactflow"
import "reactflow/dist/style.css"

import { CustomDataNode } from "./nodes/data-node"
import { CustomDefaultNode } from "./nodes/default-node"
import { CustomFunctionNode } from "./nodes/function-node"
import { CustomInputNode } from "./nodes/input-node"
import { CustomMessageNode } from "./nodes/message-node"
import { CustomOutputNode } from "./nodes/output-node"
import { CustomTextNode } from "./nodes/text-node"
import { Button } from "@/components/ui/button"

// Define custom node types
const nodeTypes: NodeTypes = {
  input: CustomInputNode,
  output: CustomOutputNode,
  default: CustomDefaultNode,
  function: CustomFunctionNode,
  data: CustomDataNode,
  text: CustomTextNode,
  message: CustomMessageNode,
}

// Initial nodes and edges
const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
  },
  {
    id: "2",
    type: "default",
    data: { label: "Default Node" },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
]

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
]

// Create a separate component for the flow content
function Flow() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [nodeLabelInput, setNodeLabelInput] = useState<string>("")

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  )

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  )

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  )

  const onDragOver: OnDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      if (!reactFlowBounds || !reactFlowInstance) return

      // Check for template drop
      const templateData = event.dataTransfer.getData("application/reactflow-template")
      if (templateData) {
        try {
          const template = JSON.parse(templateData)

          // Calculate the position offset based on where the template was dropped
          const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          })

          // Create new nodes with unique IDs and adjusted positions
          const newNodes = template.nodes.map((node: any) => {
            const offsetX = position.x - 250 // Center offset
            const offsetY = position.y - 150 // Center offset
            return {
              id: `${node.id}-${Date.now()}`,
              type: node.type,
              position: {
                x: node.position.x + offsetX,
                y: node.position.y + offsetY,
              },
              data: { label: node.label },
            }
          })

          // Create edges between the nodes based on a simple pattern
          // This is a simplified approach - in a real app, you'd have predefined edges
          const newEdges: Edge[] = []
          for (let i = 0; i < newNodes.length - 1; i++) {
            if (i % 2 === 0 && i + 1 < newNodes.length) {
              newEdges.push({
                id: `e-${newNodes[i].id}-${newNodes[i + 1].id}`,
                source: newNodes[i].id,
                target: newNodes[i + 1].id,
              })
            }
          }

          setNodes((nds) => [...nds, ...newNodes])
          setEdges((eds) => [...eds, ...newEdges])
          return
        } catch (error) {
          console.error("Error parsing template data:", error)
        }
      }

      // Handle single node drop
      const type = event.dataTransfer.getData("application/reactflow")
      if (!type) return

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const newNode: Node = {
        id: `node-${Date.now()}`,
        type,
        position,
        data: { label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node` },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance],
  )

  // Handle node selection for editing
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
    setNodeLabelInput(node.data.label)
  }, [])

  // Update node label
  const updateNodeLabel = useCallback(() => {
    if (!selectedNode || !nodeLabelInput.trim()) return

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: nodeLabelInput,
            },
          }
        }
        return node
      }),
    )
    setSelectedNode(null)
  }, [selectedNode, nodeLabelInput])

  // Clear the canvas
  const clearCanvas = useCallback(() => {
    setNodes([])
    setEdges([])
  }, [])

  return (
    <div className="h-screen w-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        onInit={setReactFlowInstance}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />

        {/* Node editing panel */}
        {selectedNode && (
          <Panel position="top-center" className="bg-white p-4 rounded-md shadow-md">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Edit Node</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nodeLabelInput}
                  onChange={(e) => setNodeLabelInput(e.target.value)}
                  className="border rounded px-2 py-1 text-sm"
                  autoFocus
                />
                <Button size="sm" onClick={updateNodeLabel}>
                  Update
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSelectedNode(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Panel>
        )}

        {/* Controls panel */}
        <Panel position="top-right" className="flex gap-2">
          <Button size="sm" variant="outline" onClick={clearCanvas}>
            Clear Canvas
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  )
}

// Wrap the Flow component with ReactFlowProvider
export function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  )
}

