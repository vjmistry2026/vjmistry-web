interface HomeType {
    metaTitle: string;
    metaDescription: string;
    bannerSection: {
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[]
    }
    firstSection: {
        image: string;
        imageAlt: string;
        title: string;
        highlightText: string;
        description: string;
        buttonText: string;
    },
    secondSection: {
        items: {
            _id: string;
            number: string;
            value: string;
            image: string;
            imageAlt: string;
        }[];
    };
    thirdSection: {
        title: string;
        description: string;
    },
    fourthSection: {
        title: string;
        items: {
            image: string;
            imageAlt: string;
            logo: string;
            logoAlt: string;
            title: string;
            description: string;
        }[];
    };
    fifthSection: {
        title: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
            logo: string;
            logoAlt: string;
            title: string;
            description: string;
        }[];
    };
    sixthSection: {
        image: string;
        imageAlt: string;
        title: string;
        description: string;
    },
    seventhSection: {
        title: string;
        description: string;
        items: {
            logo: string;
            logoAlt: string;
        }[]
    },
    eighthSection: {
        image: string;
        imageAlt: string;
        title: string;
        description: string;
        buttonText: string;
    },
}