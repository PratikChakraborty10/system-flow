import { memo } from "react"
import { Handle, type NodeProps, Position } from "reactflow"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const CustomDefaultNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <Card className="w-[200px] border shadow-sm">
      <CardHeader className="p-3">
        <CardTitle className="text-sm">{data.label}</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <p className="text-xs text-muted-foreground">Click to edit this node</p>
      </CardContent>
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} className="!bg-primary !h-3 !w-3" />
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="!bg-primary !h-3 !w-3"
      />
    </Card>
  )
})

CustomDefaultNode.displayName = "CustomDefaultNode"

