
export type qualityData = {
  bannerData: {
    title: string;
    image: string;
  };
  mainData: {
    title: string;
    desc: string;
    img: string;
  };
  qualityShield: {
    title: string;
    desc: string;
    steps: {
      title: string;
      desc: string;
      highlight?: boolean;
      img?: string;
    }[];
  };
  certifications: {
    title: string;
    desc: string;
    items: string[];
  };
};

export const qualityData = {
  bannerData: {
    title: "Quality",
    image: "/assets/images/quality/banner-img.jpg",
  },
  mainData: {
    title: "Quality That Builds Trust",
    desc: `Quality is at the core of everything we do—from structural construction and civil engineering to finely crafted furniture works. We follow strict quality control processes, use certified materials, and apply skilled workmanship at every stage to ensure durability, precision, and long-term performance. Our commitment to excellence ensures.`,
    img: "/assets/images/quality/main.jpg",
  },
  qualityShield: {
    title: "The VJM Quality Shield",
    desc: `We support a wide range of industries by delivering customized engineering solutions that meet sector-specific challenges and standards.`,
    steps: [
      {
        title: "Pre-Construction Audit",
        desc: "Rigorous planning and material vetting",
        img: "/assets/images/quality/step-2.jpg",
      },
      {
        title: "On-Site Supervision",
        desc: "Rigorous planning and material vetting",
        highlight: true,
        img: "/assets/images/quality/step-2.jpg",
      },
      {
        title: "Material Testing",
        desc: "Sourcing top-notch materials that withstand the test of time",
        img: "/assets/images/quality/step-2.jpg",
      },
      {
        title: "Final Handover",
        desc: "Post-construction inspection to ensure zero-defect delivery",
        img: "/assets/images/quality/step-2.jpg",
      },
    ],
  },
  certifications: {
    title:"Certifications",
    desc:"Our certifications stand as a testament to our commitment to international standards, rigorous processes, and consistent excellence.",
    items: ["/assets/images/quality/certifications/c1.jpg", "/assets/images/quality/certifications/c2.jpg", "/assets/images/quality/certifications/c3.jpg", "/assets/images/quality/certifications/c4.jpg",]
  }
};
