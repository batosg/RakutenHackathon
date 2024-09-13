import Image from 'next/image';
import React from 'react'
import { useRouter } from 'next/navigation';

interface TipsItemProps {
    title: string;
    content: string;
    image: string;
    postDate: Date;
    articleId: number;
}

const TipsItem = ({ title, content, image, postDate, articleId }: TipsItemProps) => {

    const router = useRouter();

    const titleText = (title: string) => {
        if (title.length > 20) {
            return title.slice(0, 20) + "...";
        }
        return title;
    }

    const contentText = (content: string) => {
        if (content.length > 30) {
            return content.slice(0, 30) + "...";
        }
        return content;
    }

    const handleClick = () => {
        router.push(`/tips/${articleId}`);
    }

    return (
        <div className="bg-white p-4 rounded-md shadow-md flex-shrink-0 mr-4 max-w-xs">
            <div className="relative w-full mb-2" style={{ paddingBottom: '75%' }} onClick={handleClick}>
                <Image
                    src={image}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                />
            </div>

            <div className="flex flex-col w-full">
                <h1 className="text-lg font-bold line-clamp-2 h-14 overflow-hidden">{titleText(title)}</h1>
                <p className="text-sm h-20 overflow-hidden line-clamp-4 mb-2">{contentText(content)}</p>
                <p className="text-sm text-gray-500">{postDate.toLocaleDateString()}</p>
            </div>
        </div>




    )
}

export default TipsItem