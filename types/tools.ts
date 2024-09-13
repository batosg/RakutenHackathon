export interface ToolGroup {
    group_name: string;
    tools: Tool[];
}

export interface Tool {
    category: string;
    created_at: string;
    description: string;
    name: string;
    tool_id: string;
    updated_at: string;
}