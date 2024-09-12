"use client"
import React, { useState } from 'react'

interface ToolTagProps {
    label: string;
    index: number;
}

const ToolTag = ({ label, index }: ToolTagProps) => {

    const [isSelected, setIsSelected] = useState(false);
    const handleClick = () => {
        setIsSelected(!isSelected);
    }

    return (
        <button
            key={index}
            onClick={handleClick}
            className={`${isSelected ? 'bg-accent text-white border border-accent' : 'bg-white border border-accent text-accent opacity-50'}  py-2 px-4 rounded-md transition duration-300 text-sm`}
        >
            {label}
        </button>
    )
}

export default ToolTag