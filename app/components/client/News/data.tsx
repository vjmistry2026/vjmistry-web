import { NewsType } from "@/app/types/news";

export const bannerData = {
  title: "News",
  image: "/assets/images/news/banner-img.jpg",
};

export const newsCategories = ["Blog", "News", "Events"] as const;

export type CategoryType = (typeof newsCategories)[number];

export type NewsItem = {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: CategoryType;
  img: string;
  slug: string;
};

export const newsList: NewsItem[] = [
  {
    id: "commitment-high-quality-construction",
    title: "Commitment to High-Quality Construction Standards",
    date: "2025-10-18",
    readTime: "12 mins read",
    category: "Blog",
    img: "/assets/images/projects/11.jpg",
    slug: "commitment-high-quality-construction-standards",
  },
  {
    id: "disciplined-execution-project-success",
    title: "Disciplined Execution Drives Project Success",
    date: "2025-10-29",
    readTime: "12 mins read",
    category: "Blog",
    img: "/assets/images/projects/3.jpg",
    slug: "disciplined-execution-project-success",
  },
  {
    id: "vj-mistry-expands-project-portfolio",
    title: "VJ Mistry Expands Its Project Portfolio",
    date: "2025-11-11",
    readTime: "12 mins read",
    category: "News",
    img: "/assets/images/projects/12.jpg",
    slug: "vj-mistry-expands-project-portfolio",
  },
  {
    id: "delivering-precision-high-complexity",
    title: "Delivering Precision Across High-Complexity Projects",
    date: "2025-11-22",
    readTime: "12 mins read",
    category: "Blog",
    img: "/assets/images/projects/8.jpg",
    slug: "delivering-precision-high-complexity-projects",
  },
  {
    id: "support-large-scale-infrastructure",
    title: "Prepared to Support Large-Scale Infrastructure Demands",
    date: "2025-12-03",
    readTime: "12 mins read",
    category: "Blog",
    img: "/assets/images/services/images/5.jpg",
    slug: "support-large-scale-infrastructure-demands",
  },
  {
    id: "consistent-on-time-delivery",
    title: "Consistent On-Time Project Delivery Achieved",
    date: "2025-12-14",
    readTime: "12 mins read",
    category: "Blog",
    img: "/assets/images/projects/4.jpg",
    slug: "consistent-on-time-project-delivery",
  },
  {
    id: "meeting-regulatory-requirements",
    title: "Meeting and Exceeding Regulatory Requirements",
    date: "2025-12-26",
    readTime: "12 mins read",
    category: "News",
    img: "/assets/images/projects/2.jpg",
    slug: "meeting-exceeding-regulatory-requirements",
  },
  {
    id: "upgrading-construction-capabilities",
    title: "Upgrading Construction Capabilities with Modern Equipment",
    date: "2026-01-09",
    readTime: "12 mins read",
    category: "News",
    img: "/assets/images/services/images/2.jpg",
    slug: "upgrading-construction-capabilities",
  },
  {
    id: "leadership-engineering-precision",
    title: "Leadership Driving Engineering Precision",
    date: "2026-01-20",
    readTime: "12 mins read",
    category: "Events",
    img: "/assets/images/home/expertise/expertise1.jpg",
    slug: "leadership-driving-engineering-precision",
  },
  {
    id: "vj-mistry-successfully-completes-major-infrastructure-milestone",
    title: "VJ Mistry Successfully Completes Major Infrastructure Milestone",
    date: "2026-02-02",
    readTime: "12 mins read",
    category: "Blog",
    img: "/assets/images/home/hero/hero2.jpg",
    slug: "vj-mistry-successfully-completes-major-infrastructure-milestone",
  },
  {
    id: "vj-mistry-awarded-complex-industrial-contract",
    title: "VJ Mistry Awarded Complex Industrial Contract",
    date: "2026-02-02",
    readTime: "12 mins read",
    category: "News",
    img: "/assets/images/projects/11.jpg",
    slug: "vj-mistry-awarded-complex-industrial-contract",
  },
  {
    id: "vj-mistry-sets-new-safety-performance-benchmarks",
    title: "VJ Mistry Sets New Safety Performance Benchmarks",
    date: "2026-02-02",
    readTime: "12 mins read",
    category: "News",
    img: "/assets/images/services/images/3.jpg",
    slug: "vj-mistry-sets-new-safety-performance-benchmarks",
  },
  {
    id: "building-long-term-partnerships-through-trust-and-reliability",
    title: "Building Long-Term Partnerships Through Trust and Reliability",
    date: "2026-02-02",
    readTime: "12 mins read",
    category: "Events",
    img: "/assets/images/projects/7.jpg",
    slug: "building-long-term-partnerships-through-trust-and-reliability",
  },
  {
    id: "east-africa-build-expo-2026",
    title: "VJ Mistry to Participate in East Africa Build Expo 2026",
    date: "2026-01-28",
    readTime: "12 mins read",
    category: "Events",
    img: "/assets/images/projects/7.jpg",
    slug: "east-africa-build-expo-2026",
  }
];

export const sortNewsByNewest = (items: NewsType['news']) =>
  [...items].sort(
    (firstArticle, secondArticle) =>
      new Date(secondArticle.firstSection.date).getTime() - new Date(firstArticle.firstSection.date).getTime(),
  );

export const splitNewsByLatest = (items: NewsType['news']) => {
  const newsListByNewest = sortNewsByNewest(items);

  return {
    latestNewsList: newsListByNewest.slice(0, 4),
    remainingNewsList: newsListByNewest.slice(4),
  };
};
