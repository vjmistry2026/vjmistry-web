export const bannerData = {
    title: "Projects",
    image: "/assets/images/projects/banner.jpg",
};


export type Project = {
    id: number;
    title: string;
    image: string;
    type: string;
    sector: string;
    location: string;
    status: "Completed" | "Ongoing" | "Upcoming";
};

export const projectsData: Project[] = [
    {
        id: 1,
        title: "Action Auto Garage",
        image: "/assets/images/projects/1.jpg",
        type: "Civil Works",
        sector: "Residential",
        location: "Dubai",
        status: "Completed",
    },
    {
        id: 2,
        title: "Azam Project",
        image: "/assets/images/projects/2.jpg",
        type: "Civil Works",
        sector: "Residential",
        location: "Dubai",
        status: "Completed",
    },
    {
        id: 3,
        title: "Bank M Tanzania",
        image: "/assets/images/projects/3.jpg",
        type: "Civil Works",
        sector: "Residential",
        location: "Dubai",
        status: "Completed",
    },
    {
        id: 4,
        title: "Daniel Yona",
        image: "/assets/images/projects/4.jpg",
        type: "Civil Works",
        sector: "Residential",
        location: "Dubai",
        status: "Completed",
    },
    {
        id: 5,
        title: "DCEA",
        image: "/assets/images/projects/5.jpg",
        type: "Civil Works",
        sector: "Residential",
        location: "Dubai",
        status: "Completed",
    },
    {
        id: 6,
        title: "DZ Card",
        image: "/assets/images/projects/6.jpg",
        type: "Civil Works",
        sector: "Residential",
        location: "Dubai",
        status: "Completed",
    },
    {
        id: 7,
        title: "EACOP",
        image: "/assets/images/projects/7.jpg",
        type: "Civil Works",
        sector: "Residential",
        location: "Dubai",
        status: "Completed",
    },
    {
        id: 8,
        title: "Exim Bank",
        image: "/assets/images/projects/8.jpg",
        type: "Civil Works",
        sector: "Residential",
        location: "Dubai",
        status: "Completed",
    },
    {
        id: 9,
        title: "Forodhani",
        image: "/assets/images/projects/9.jpg",
        type: "Civil Works",
        sector: "Residential",
        location: "Dubai",
        status: "Completed",
    },
    {
        id: 10,
        title: "Hans Lemm",
        image: "/assets/images/projects/10.jpg",
        type: "Civil Works",
        sector: "Residential",
        location: "Dubai",
        status: "Completed",
    },
    {
        id: 11,
        title: "Hester",
        image: "/assets/images/projects/11.jpg",
        type: "Civil Works",
        sector: "Residential",
        location: "Dubai",
        status: "Completed",
    },
    {
        id: 12,
        title: "Imports International",
        image: "/assets/images/projects/12.jpg",
        type: "Civil Works",
        sector: "Residential",
        location: "Dubai",
        status: "Completed",
    },
    {
        id: 13,
        title: "Jubilee Insurance",
        image: "/assets/images/projects/11.jpg",
        type: "Civil Works",
        sector: "Commercial",
        location: "Nairobi",
        status: "Ongoing",
    },
    {
        id: 14,
        title: "Kariakoo Mall",
        image: "/assets/images/projects/12.jpg",
        type: "Civil Works",
        sector: "Commercial",
        location: "Nairobi",
        status: "Ongoing",
    }
];

export const filterOptions = {
    projectTypes: ["Civil Works", "Interior", "Fit-Out"],
    sectors: ["Residential", "Commercial", "Hospitality", "Infrastructure"],
    locations: ["Dubai", "Nairobi", "London"],
    statuses: ["Completed", "Ongoing", "Upcoming"],
};