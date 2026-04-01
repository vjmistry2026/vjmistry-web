export interface ServiceType {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    firstSection: {
        title: string;
        items: {
            title: string;
            image: string;
            imageAlt: string;
            logo: string;
            logoAlt: string;
            description: string;
            homeImage: string;
            homeImageAlt: string;
        }[]
    };
}