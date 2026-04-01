export interface FoundersMessageType {
    metaTitle: string;
    metaDescription: string;
    firstSection: {
        items: {
            title: string;
            image: string;
            imageAlt: string;
            name: string;
            designation: string;
            message?: string;
        }[]
    },
    secondSection: {
        title: string;
        items: {
            title: string;
            image: string;
            imageAlt: string;
            description: string;
        }[]
    },
    thirdSection: {
        image: string;
        imageAlt: string;
        title: string;
        buttonText: string;
        buttonLink: string;
    }
}