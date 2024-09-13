"use client"
import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

interface CollapseProps {
    title: string;
    children: React.ReactNode;
    isInitiallyOpen?: boolean;
}

const Collapse: React.FC<CollapseProps> = ({ title, children, isInitiallyOpen = false }) => {
    const [isOpen, setIsOpen] = useState(isInitiallyOpen);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="mb-4">
            <div
                className="flex justify-between items-center px-4 py-2 bg-gray-50 cursor-pointer"
                onClick={toggleCollapse}
            >
                <h3 className="font-semibold text-sm">{title}</h3>
                <BiChevronDown
                    size={24}
                    className={`transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
                />
            </div>
            {isOpen && (
                <div className="mt-2 px-4">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Collapse;
