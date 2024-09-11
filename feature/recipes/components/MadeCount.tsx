import React from 'react'

interface MadeCountProps {
    count: number;
}

const MadeCount = ({ count }: MadeCountProps) => {
    return (
        <div className="flex justify-center items-center pt-5 w-full ">
            <p className="bg-gray-500 text-white text-center px-6 py-2 w-full"> みんなが作った数 <span className="text-red-500 font-bold">{count}</span>件 </p>
        </div>
    )
}

export default MadeCount