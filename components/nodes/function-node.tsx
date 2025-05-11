import { memo } from "react"
import { TypeIcon as FunctionIcon } from "lucide-react"
import { Handle, type NodeProps, Position } from "reactflow"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const CustomFunctionNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <Card className="w-[200px] border border-purple-300 bg-purple-50 shadow-sm">
      <CardHeader className="flex flex-row items-center gap-2 p-3">
        <FunctionIcon className="h-4 w-4 text-purple-500" />
        <CardTitle className="text-sm">{data.label}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-xs text-muted-foreground">Click to edit this node</p>
      </CardContent>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="!bg-purple-500 !h-3 !w-3"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="!bg-purple-500 !h-3 !w-3"
      />
    </Card>
  )
})

CustomFunctionNode.displayName = "CustomFunctionNode"

