// types/project.ts

export interface ProjectType {
    _id?: string;

    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;

    projects: {
        _id?: string;
status:string;
        metaTitle: string;
        metaDescription: string;
        banner: string;
        bannerAlt: string;
        thumbnail: string;
        thumbnailAlt: string;
        title: string;
        slug: string;

        firstSection: {
            yearOfCompletion: string;
            expertise: string;
            location: {
                name: string;
            } // ObjectId → string after serialization
            client: string;
            status: string;
            projectType: {
                name: string;
            } // ObjectId → string
            sector: {
                name: string;
            } // ObjectId → string | null
        };

        secondSection: {
            title: string;
            description: string;
            image: string;
            imageAlt: string;
            items: {
                title: string;
                _id?: string;
            }[];
        };

        thirdSection: {
            items: {
                image: string;
                imageAlt: string;
                video: string;
                _id?: string;
            }[];
        };
    }[];
}