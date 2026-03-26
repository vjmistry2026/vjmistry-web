export type galleryData = {
  bannerData: {
    title: string;
    image: string;
  };
  gallerySection: {
    title: string;
    desc: string;
    items: {
      title: string;
      album: string[];
    }[];
  };
};

export const GalleryData = {
  bannerData: {
    title: "Gallery",
    image: "/assets/images/gallery/banner-img.jpg",
  },

  gallerySection: {
    title: "Moments in the Making",
    desc: "Explore our collection of project images showcasing quality craftsmanship, precision, and attention to detail. Each folder represents a milestone, capturing progress, completed works, and key highlights from our projects.",
    items: [
      {
        title: "On-Site Insights",
        album: ["/assets/images/gallery/g1.jpg", "/assets/images/hse/csr/csr-1a.jpg", "/assets/images/hse/csr/csr-1b.jpg", "/assets/images/hse/csr/csr-1d.jpg", "/assets/images/hse/csr/csr-1c.jpg"],
      },
      {
        title: "Work in Progress",
        album: ["/assets/images/gallery/g2.jpg", "/assets/images/hse/csr/csr-1e.jpg", "/assets/images/hse/csr/csr-1f.jpg", "/assets/images/hse/csr/csr-1g.jpg"],
      },
      {
        title: "Completed Projects",
        album: ["/assets/images/gallery/g3.jpg", "/assets/images/hse/csr/csr-1a.jpg", "/assets/images/hse/csr/csr-1b.jpg", "/assets/images/hse/csr/csr-1d.jpg", "/assets/images/hse/csr/csr-1e.jpg"],
      },
      {
        title: "Events",
        album: ["/assets/images/gallery/g4.jpg", "/assets/images/hse/csr/csr-1a.jpg", "/assets/images/hse/csr/csr-1b.jpg", "/assets/images/hse/csr/csr-1d.jpg", "/assets/images/hse/csr/csr-1e.jpg"],
      },
      {
        title: "Construction & Execution",
        album: ["/assets/images/gallery/g5.jpg", "/assets/images/hse/csr/csr-1e.jpg", "/assets/images/hse/csr/csr-1f.jpg", "/assets/images/hse/csr/csr-1b.jpg", "/assets/images/hse/csr/csr-1c.jpg"],
      },
      {
        title: "Quality & Safety (HSE)",
        album: ["/assets/images/gallery/g6.jpg", "/assets/images/hse/csr/csr-1e.jpg", "/assets/images/hse/csr/csr-1f.jpg", "/assets/images/hse/csr/csr-1b.jpg", "/assets/images/hse/csr/csr-1c.jpg"],
      },
    ],
  },
};
