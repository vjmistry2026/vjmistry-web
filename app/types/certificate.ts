interface CertificateType {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    firstSection: {
        title: string;
        description: string;
    };
    secondSection: {
        title: string;
        description: string;
        items: {
            _id: string;
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };
    thirdSection: {
        title: string;
        description: string;
        items: {
            title: string;
            file: string;
        }[];
    };
}