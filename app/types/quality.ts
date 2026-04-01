interface QualityType {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt?: string;
    pageTitle: string;
    firstSection: {
        title: string;
        description: string;
        image: string;
        imageAlt: string;
    };
    secondSection: {
        title: string;
        subTitle: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };

    thirdSection: {
        title: string;
        subTitle: string;
        items: {
            image: string;
            imageAlt: string;
        }[];
    }
}