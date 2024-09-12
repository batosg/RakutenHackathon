"use client"
import React from 'react'

interface ButtonProps {
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
    return (
        <button className="bg-accent text-white text-center px-10 py-2 w-full rounded-lg hover:opacity-30" onClick={onClick}> {text} </button>
    )
}

export default Button