import { tipsContent } from "@/constants/tips";
import { GassConlo } from "@/public";
import { Petbottle } from "@/public"
import { Bottle } from "@/public"
import Image from "next/image";


const image1 = <Image className="w-[90vw] mx-auto" src={GassConlo} alt="ガスコンロ" />;
const image2 = <Image className="w-[90vw] mx-auto" src={Petbottle} alt="ペットボトル" />;
const image3 = <Image className="w-[90vw] mx-auto" src={Bottle} alt="水筒" />;

const title = (text: string) => <h1 className="text-lg font-bold mb-4 ">{text}</h1>;
const baseText = (text: string) => <div className="mb-4 text-left text-sm">{text}</div>;
const heading = (text: string) => <h1 className="text-1xl mb-4 relative inline-block text-base">{text}<span className="absolute left-0 bottom-0 w-1/4 h-1 bg-red-500"></span></h1>;
const middleHeading = (text: string) => <div className="mb-4s text-left text-sm font-bold">{text}</div>;

const renderContent = (content: any) => {
    switch (content.type) {
        case "text":
            return content.content && baseText(content.content);
        case "section":
            return (
                <div key={content.heading}>
                    {content.heading && heading(content.heading)}
                    {content.content && content.content.map((subContent: any, index: number) => (
                        <div key={index}>{renderContent(subContent)}</div>
                    ))}
                </div>
            );
        case "subsection":
            return (
                <div key={content.heading}>
                    {content.heading && middleHeading(content.heading)}
                    {content.content && baseText(content.content)}
                </div>
            );
        default:
            return null;
    }
};

const Tips = () => {
    return (
        <div>
            {image3}
            {title(tipsContent[0].title)}
            {tipsContent[0].content.map((content, index) => (
                <div key={index}>{renderContent(content)}</div>
            ))}
        </div>
    );
};

export default Tips;
