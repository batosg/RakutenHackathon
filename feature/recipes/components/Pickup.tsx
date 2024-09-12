import React from 'react'
import Image from 'next/image';

interface PickupProps {
    image: string;
    title: string;
}

const Pickup = ({ image, title }: PickupProps) => {
    const gradientStyle = {
        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
    };

    return (
        <div className="rounded-xl">
            <h2 className="ml-4 text-lg font-bold mb-4">今日のPick upレシピ</h2>
            <div className="w-full aspect-square relative">
                <Image
                    src={image}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                />
                <div
                    className="absolute bottom-0 p-4 w-full flex items-end justify-end"
                    style={gradientStyle}
                >
                    <h3 className="text-xl font-bold line-clamp-2 text-white box-border py-4">{title}</h3>
                </div>
            </div>
        </div>
    )
}

export default Pickup