export interface EquipmentType {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
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
    };
    equipments: {
        title: string;
        description: string;
        image: string;
        imageAlt: string;
        category: {
            name: string
        };
    }[];
}