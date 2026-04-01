export interface ContactType {
    banner: string;
    bannerAlt: string;
    metaTitle: string;
    metaDescription: string;
    pageTitle: string;
    firstSection: {
        title: string;
        description: string;
    },
    secondSection: {
        title: string;
        description: string;
        items: [{
            title: string;
            address: string;
            phoneOne: string;
            phoneTwo: string;
            email: string;
            map: string;
        }]
    }
}