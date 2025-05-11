import { memo } from "react"
import { CircleDot } from "lucide-react"
import { Handle, type NodeProps, Position } from "reactflow"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const CustomInputNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <Card className="w-[200px] border border-blue-300 bg-blue-50 shadow-sm">
      <CardHeader className="flex flex-row items-center gap-2 p-3">
        <CircleDot className="h-4 w-4 text-blue-500" />
        <CardTitle className="text-sm">{data.label}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-xs text-muted-foreground">Click to edit this node</p>
      </CardContent>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="!bg-blue-500 !h-3 !w-3"
      />
    </Card>
  )
})

CustomInputNode.displayName = "CustomInputNode"

