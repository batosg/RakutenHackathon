"use client"
import React, { useState } from 'react'

interface ToolTagProps {
    label: string;
    index: number;
    onClick: (label: string) => void;
    isSelected: boolean;
}

const ToolTag = ({ label, index, onClick, isSelected }: ToolTagProps) => {

    const handleClick = () => {
        onClick(label);
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