export interface AboutType {
    banner: string;
    bannerAlt?: string;
    metaTitle: string;
    metaDescription: string;
    ogType?: string;
    ogImage?: string;
    pageTitle: string;

    firstSection: {
        image: string;
        imageAlt?: string;
        title: string;
        highlightText: string;
        description: string;
    };

    secondSection: {
        title: string;
        subTitle: string;
        items: {
            year: string;
            title: string;
            description: string;
            image: string;
            imageAlt?: string;
        }[];
    };

    thirdSection: {
        items: {
            title: string;
            description: string;
            image: string;
            imageAlt?: string;
        }[];
    };

    fourthSection: {
        title: string;
        image: string;
        imageAlt?: string;
        items: {
            title: string;
            description: string;
            image: string;
            imageAlt?: string;
        }[];
    };

    fifthSection: {
        items: {
            number: string;
            value: string;
        }[];
    };
}