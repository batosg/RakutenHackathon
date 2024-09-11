import React from 'react'
import Image from 'next/image'

interface RecipeProfileProps {
    name: string;
    isFollowed: boolean;
    onClick: () => void;
    image: string;
}
const RecipeProfile = ({ name, isFollowed, onClick, image }: RecipeProfileProps) => {
    return (
        <div className="flex">
            <Image src={image} width={50} height={50} alt="プロフィール画像" className="rounded-full mr-4" />
            <div className="flex justify-between items-center w-full ">
                <h3 className="text-left hover:opacity-30">{name}</h3>
                <h3 className="text-white px-2 py-1 text-center w-1/2 hover:opacity-30 rounded-lg"
                    style={{
                        backgroundColor: isFollowed ? 'green' : 'red'
                    }}
                    onClick={onClick}>{isFollowed ? 'フォローする' : 'フォロー解除'}</h3>
            </div>
        </div>
    )
}

export default RecipeProfile