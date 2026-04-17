
export interface NewsType {
    metaTitle?: string;
    metaDescription?: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    news: NewsItem[];
}

export interface NewsItem {
    metaTitle: string;
    metaDescription: string;
    status: string;
    firstSection: {
        title: string;
        slug: string;
        date: string;
        category: {
            name: string;
            _id: string;
        }
        coverImage: string;
        coverImageAlt: string;
        thumbnail: string;
        thumbnailAlt: string;
    };
    secondSection: {
        items: {
            title: string;
            idToMap: string;
        }[];
    };
    thirdSection: {
        content: string;
    };
}