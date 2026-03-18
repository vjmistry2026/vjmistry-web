export type CategoryType = "Blog" | "News" | "Insights";

export type ContentSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
  image?: string;
  imageAfterParagraph?: number;
};

export type NewsDetail = {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: CategoryType;
  img: string;
  slug: string;
  content: ContentSection[];
};

export const newsDetails: NewsDetail[] = [
  {
    id: "vj-mistry-infra-milestone",
    title: "VJ Mistry Successfully Completes Major Infrastructure Milestone",
    date: "2026-02-02",
    readTime: "12 mins read",
    category: "Blog",
    img: "/assets/images/news/details/main.jpg",
    slug: "vj-mistry-successfully-completes-major-infrastructure-milestone",
    content: [
      {
        title: "Scope & Engineering Excellence",
        paragraphs: [
          `The milestone encompassed comprehensive construction and engineering works, including advanced structural systems, optimized material usage, and robust project coordination. Leveraging modern construction methodologies and experienced engineering teams, VJ Mistry ensured durability, functionality, and long-term performance across all project components.`,
          `The recently completed infrastructure project represents a significant step forward in supporting large-scale industrial and urban development. Executed within defined timelines and specifications, the project demonstrates VJ Mistry's capability to deliver complex infrastructure solutions while maintaining operational efficiency and precision.`,
        ],
        image: "/assets/images/news/details/img-1.jpg",
        imageAfterParagraph: 0,
      },
      {
        title: "Safety, Quality, and Compliance",
        paragraphs: [
          `Safety and quality remained central throughout the project lifecycle. Strict adherence to international standards, rigorous quality control procedures, and continuous safety monitoring ensured a zero-compromise approach. Regular inspections and audits reinforced compliance while maintaining productivity on site.`,
        ],
      },
      {
        title: "Overcoming Project Challenges",
        paragraphs: [
          `Like any large-scale infrastructure development, the project presented logistical and technical challenges. Through proactive planning, effective risk management, and agile decision-making, the team successfully navigated constraints related to site conditions, timelines, and coordination, delivering results without disruption.`,
        ],
        image: "/assets/images/news/details/img-2.jpg",
        imageAfterParagraph: 0,
      },
      {
        title: "Client Collaboration & Execution",
        paragraphs: [
          `Strong collaboration with stakeholders and clients played a critical role in the project's success. Transparent communication, coordinated planning, and aligned objectives enabled seamless execution, fostering trust and long-term partnerships.`,
        ],
        list: [
          "Clear and transparent communication",
          "Aligned goals and timelines",
          "Regular progress coordination",
          "Quick and effective decision-making",
        ],
      },
      {
        title: "Conclusion",
        paragraphs: [
          `The successful completion of this major infrastructure milestone underscores VJ Mistry's legacy of excellence. It reflects not only engineering capability but also a culture of responsibility, innovation, and continuous improvement that will continue to define the company's journey.`,
        ],
      },
    ],
  },
];
