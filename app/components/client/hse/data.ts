export type HSEData = {
  bannerData: {
    title: string;
    image: string;
  };
  hero: {
    title: string;
    desc: string;
    img: string;
  };

  commitment: {
    title: string;
    desc: string;
    stats: {
      value: string;
      label: string;
    }[];
  };

  zeroHarm: {
    title: string;
    items: {
      title: string;
      desc: string;
      icon?: string;
      highlight?: boolean;
    }[];
  };

  sustainability: {
    title: string;
    desc: string;
    img: string;
  };

  training: {
    title: string;
    desc: string;
    items: {
      title: string;
      img: string;
      desc?: string;
    }[];
  };

  csr: {
    title: string;
    desc: string;
    items: {
      title: string;
      album: string[];
    }[];
  };
};

export const HSEData = {
  bannerData: {
    title: "HSE",
    image: "/assets/images/hse/banner-image.jpg",
  },
  hero: {
    title: "Health, Safety & Environment",
    desc: `Health, Safety, and Environmental (HSE) management is at our core. We prioritize safety, sustainability, and compliance across all operations, ensuring a safe working environment and long-term environmental responsibility.`,
    img: "/assets/images/hse/main.jpg",
  },

  commitment: {
    title: "Our Commitment to Health",
    desc: `Our HSE policies are the foundation of every project we undertake. We believe that a safe working environment is not just a regulatory requirement but a moral imperative. From the boardroom to the construction site, safety culture is embedded in our DNA.`,
    stats: [
      { value: "100%", label: "Compliance" },
      { value: "24/7", label: "Monitoring" },
      { value: "ISO", label: "Certification" },
    ],
  },

  zeroHarm: {
    title: 'The "Zero Harm" Goal',
    desc: "Our goal is simple: Zero accidents. We achieve this through a comprehensive approach involving every team member.",
    items: [
      {
        title: "Daily Safety Briefings",
        desc: "Adapting to the rapidly changing construction landscape.",
        icon: "/assets/images/hse/icons/icon-1.svg",
        highlight: true,
      },
      {
        title: "High Visibility Gear (PPE)",
        desc: "Ensuring all workers are equipped with proper safety gear.",
        icon: "/assets/images/hse/icons/icon-2.svg",
      },
      {
        title: "Continuous Risk Assessment",
        desc: "Ongoing evaluation to minimize hazards and risks.",
        icon: "/assets/images/hse/icons/icon-3.svg",
      },
    ],
  },

  sustainability: {
    title: "Sustainability & Green Building",
    desc: `We recognize our responsibility to the Tanzanian environment. By maximizing resource utilization and reducing waste, we ensure that our modern landmarks don't come at the cost of our natural world.`,
    img: "/assets/images/hse/quote-bnr.jpg",
  },

  training: {
    title: "Safety Training Spotlight",
    desc: "A safe site is an educated site. We invest heavily in regular staff training programs and emergency response drills.",
    items: [
      {
        title: "Regular Staff Training",
        img: "/assets/images/hse/safety-training/sl1.jpg",
        desc: "Ongoing educational workshops and certification programs for all skill levels.",
      },
      {
        title: "Emergency Response Drills",
        img: "/assets/images/hse/safety-training/sl2.jpg",
        desc: "Simulated crisis scenarios to ensure rapid and effective reaction times.",
      },
      {
        title: "Regular Staff Training",
        img: "/assets/images/hse/safety-training/sl1.jpg",
        desc: "Ongoing educational workshops and certification programs for all skill levels.",
      },
      {
        title: "Emergency Response Drills",
        img: "/assets/images/hse/safety-training/sl2.jpg",
        desc: "Simulated crisis scenarios to ensure rapid and effective reaction times.",
      },
      {
        title: "Regular Staff Training",
        img: "/assets/images/hse/safety-training/sl1.jpg",
        desc: "Ongoing educational workshops and certification programs for all skill levels.",
      },
      {
        title: "Emergency Response Drills",
        img: "/assets/images/hse/safety-training/sl2.jpg",
        desc: "Simulated crisis scenarios to ensure rapid and effective reaction times.",
      },
      {
        title: "Regular Staff Training",
        img: "/assets/images/hse/safety-training/sl1.jpg",
        desc: "Ongoing educational workshops and certification programs for all skill levels.",
      },
      {
        title: "Emergency Response Drills",
        img: "/assets/images/hse/safety-training/sl2.jpg",
        desc: "Simulated crisis scenarios to ensure rapid and effective reaction times.",
      },
      {
        title: "Regular Staff Training",
        img: "/assets/images/hse/safety-training/sl1.jpg",
        desc: "Ongoing educational workshops and certification programs for all skill levels.",
      },
      {
        title: "Emergency Response Drills",
        img: "/assets/images/hse/safety-training/sl2.jpg",
        desc: "Simulated crisis scenarios to ensure rapid and effective reaction times.",
      },
    ],
  },

  csr: {
    title: "Corporate Social Responsibility (CSR)",
    desc: "We are committed to supporting communities, protecting the environment, and upholding ethical practices as part of our HSE responsibility.",
    items: [
      {
        title: "Community Outreach",
        album: [
          "/assets/images/hse/csr/csr-1.jpg",
          "/assets/images/hse/csr/csr-1a.jpg",
          "/assets/images/hse/csr/csr-1b.jpg",
          "/assets/images/hse/csr/csr-1d.jpg",
          "/assets/images/hse/csr/csr-1c.jpg",
        ],
      },
      {
        title: "Workforce Wellbeing",
        album: [
          "/assets/images/hse/csr/csr-2.jpg",
          "/assets/images/hse/csr/csr-1e.jpg",
          "/assets/images/hse/csr/csr-1f.jpg",
          "/assets/images/hse/csr/csr-1g.jpg",
        ],
      },
      {
        title: "Environmental Initiatives",
        album: [
          "/assets/images/hse/csr/csr-3.jpg",
          "/assets/images/hse/csr/csr-1a.jpg",
          "/assets/images/hse/csr/csr-1b.jpg",
          "/assets/images/hse/csr/csr-1d.jpg",
          "/assets/images/hse/csr/csr-1e.jpg",
        ],
      },
      {
        title: "Lorem Ipsum Dollar ",
        album: [
          "/assets/images/hse/csr/csr-1f.jpg",
          "/assets/images/hse/csr/csr-1a.jpg",
          "/assets/images/hse/csr/csr-1b.jpg",
          "/assets/images/hse/csr/csr-1d.jpg",
          "/assets/images/hse/csr/csr-1e.jpg",
        ],
      },
      {
        title: "Lorem Ipsum Dollar ",
        album: [
          "/assets/images/hse/csr/csr-1g.jpg",
          "/assets/images/hse/csr/csr-1e.jpg",
          "/assets/images/hse/csr/csr-1f.jpg",
          "/assets/images/hse/csr/csr-1b.jpg",
          "/assets/images/hse/csr/csr-1c.jpg",
        ],
      },
    ],
  },
};
