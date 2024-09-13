import React from 'react';
import { Tool } from "@/types/tools";

interface ToolGroupProps {
    toolGroup: {
        group_name: string;
        tools: Tool[];
    };
    selectedTools: string[];
    onToolToggle: (toolId: string, toolName: string) => void;
}

const ToolGroup: React.FC<ToolGroupProps> = ({
    toolGroup,
    selectedTools,
    onToolToggle,
}) => {
    return (
        <div className="border-gray-200 pb-2">
            <h3 className="font-semibold text-xs mb-2">{toolGroup.group_name}</h3>
            <div className="flex flex-wrap gap-2">
                {toolGroup.tools.map((tool) => (
                    <label
                        key={tool.tool_id}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm cursor-pointer transition-colors ${selectedTools.includes(tool.name || '')
                            ? 'bg-accent text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={selectedTools.includes(tool.name || '')}
                            onChange={() => onToolToggle(tool.tool_id || '', tool.name || '')}
                        />
                        {tool.name}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default ToolGroup;
