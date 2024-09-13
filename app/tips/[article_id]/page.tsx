"use client"
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { tipsContent } from "@/constants/tips";
import { Content } from "@/types/tips";
import { Button, Header } from "@/components";
const title = (text: string) => <h1 className="text-lg font-bold mt-4">{text}</h1>;
const baseText = (text: string) => <div className="my-4 text-left text-sm">{text}</div>;
const heading = (text: string) => <h1 className="text-1xl mt-4 relative inline-block text-base font-bold">{text}<span className="absolute left-0 bottom-0 w-1/4 h-1 bg-red-500"></span></h1>;
const middleHeading = (text: string) => <div className="my-4 text-left text-sm font-bold">{text}</div>;

const renderContent = (content: Content) => {
    switch (content.type) {
        case "text":
            return content.content && baseText(content.content as string);
        case "section":
            return (
                <div key={content.heading}>
                    {content?.heading && heading(content.heading)}
                    {content?.content && (content.content as Content[])?.map((subContent: Content, index: number) => (
                        <div key={index}>{renderContent(subContent)}</div>
                    ))}
                </div>
            );
        case "subsection":
            return (
                <div key={content.heading}>
                    {content?.heading && middleHeading(content.heading)}
                    {content?.content && baseText(content.content as string)}
                </div>
            );
        default:
            return null;
    }
};

const Tips = () => {
    const { article_id } = useParams();
    const router = useRouter();
    const tips = tipsContent.find((tips) => tips.articleId === Number(article_id));

    return (
        <>
            <Header />
            <div className="p-4">
                {title(tips?.title ?? '')}
                {tips?.image &&
                    <div className="w-full h-64 relative my-4">
                        <Image src={tips?.image} alt={tips?.title} fill objectFit="cover" />
                    </div>
                }
                {tips?.content?.map((content: Content, index: number) => (
                    <div key={index}>{renderContent(content)}</div>
                ))}
                <Button onClick={() => router.push('/tips')} text="記事一覧に戻る" />
            </div>
        </>
    );
};

export default Tips;
