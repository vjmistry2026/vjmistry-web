export interface GalleryType {
    metaTitle: string;
    metaDescription: string;
    pageTitle: string;
    banner: string;
    bannerAlt: string;

    firstSection: {
        title: string;
        description: string;
    };

    items: {
        item: string;
        thumbnail: string;
        thumbnailAlt: string;

        images: {
            image: string;
            imageAlt: string;
        }[];

        status:string;
    }[];
}