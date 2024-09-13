export type ContentType = "text" | "section" | "subsection";

export interface BaseContent {
    type: ContentType;
    content: string | (SubsectionContent | TextContent)[];
}

export interface TextContent extends BaseContent {
    type: "text";
}

export interface SectionContent extends BaseContent {
    type: "section";
    heading: string;
    content: (SubsectionContent | TextContent)[];
}

export interface SubsectionContent extends BaseContent {
    type: "subsection";
    heading: string;
}

export type Content = TextContent | SectionContent | SubsectionContent;

export interface TipsContent {
    articleId: number;
    postDate: Date;
    image: string;
    title: string;
    content: Content[];
    rating: number;
    editDate: Date;
}