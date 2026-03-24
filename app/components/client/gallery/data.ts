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
    title: "Corporate Social Responsibility (CSR)",
    desc: "We are committed to supporting communities, protecting the environment, and upholding ethical practices as part of our HSE responsibility.",
    items: [
      {
        title: "Community Outreach",
        album: ["/assets/images/hse/csr/csr-1.jpg", "/assets/images/hse/csr/csr-1a.jpg", "/assets/images/hse/csr/csr-1b.jpg", "/assets/images/hse/csr/csr-1d.jpg", "/assets/images/hse/csr/csr-1c.jpg"],
      },
      {
        title: "Workforce Wellbeing",
        album: ["/assets/images/hse/csr/csr-2.jpg", "/assets/images/hse/csr/csr-1e.jpg", "/assets/images/hse/csr/csr-1f.jpg", "/assets/images/hse/csr/csr-1g.jpg"],
      },
      {
        title: "Environmental Initiatives",
        album: ["/assets/images/hse/csr/csr-3.jpg", "/assets/images/hse/csr/csr-1a.jpg", "/assets/images/hse/csr/csr-1b.jpg", "/assets/images/hse/csr/csr-1d.jpg", "/assets/images/hse/csr/csr-1e.jpg"],
      },
      {
        title: "Lorem Ipsum Dollar ",
        album: ["/assets/images/hse/csr/csr-1f.jpg", "/assets/images/hse/csr/csr-1a.jpg", "/assets/images/hse/csr/csr-1b.jpg", "/assets/images/hse/csr/csr-1d.jpg", "/assets/images/hse/csr/csr-1e.jpg"],
      },
      {
        title: "Lorem Ipsum Dollar ",
        album: ["/assets/images/hse/csr/csr-1g.jpg", "/assets/images/hse/csr/csr-1e.jpg", "/assets/images/hse/csr/csr-1f.jpg", "/assets/images/hse/csr/csr-1b.jpg", "/assets/images/hse/csr/csr-1c.jpg"],
      },
    ],
  },
};
