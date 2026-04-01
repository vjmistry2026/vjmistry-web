export interface HSeType {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    firstSection: {
        title: string;
        description: string;
        image: string;
        imageAlt: string;
    };
    secondSection: {
        title: string;
        description: string;
        items: {
            number: string;
            value: string;
        }[];
    };
    thirdSection: {
        title: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };
    fourthSection: {
        image: string;
        imageAlt: string;
        title: string;
        description: string;
    };
    fifthSection: {
        title: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };
    sixthSection: {
        title: string;
        description: string;
        items: {
            thumbnail: string;
            thumbnailAlt: string;
            title: string;
            images: {
                image: string;
                imageAlt: string;
            }[];
        }[];
    },
    seventhSection: {
        title: string;
    }
}