export const bannerData = {
  title: "Certificates",
  image: "/assets/images/certificates/bannerImage.jpg",
};

const dummyCertificateFile = "/assets/documents/certificates/dummy-doc.pdf";
export type CertificateData = {
  transparency: {
    title: string;
    description: string;
    items: {
      id: number;
      title: string;
      description?: string;
      icon: string;
      highlight?: boolean;
    }[];
  };
  downloadCenter: {
    title: string;
    description: string;
    items: {
      id: number;
      title: string;
      file: string;
    }[];
  };
};

export const certificatesData: CertificateData = {
  transparency: {
    title: "Transparency & Accountability",
    description:
      "We operate with complete openness and adhere strictly to all regulatory frameworks.",
    items: [
      {
        id: 1,
        title: "TIN & Tax Compliance",
        description: "Fully compliant with Tanzanian tax regulations.",
        icon: "/assets/icons/tin-tax.svg",
        highlight: true,
      },
      {
        id: 2,
        title: "Contractor Registration Board (CRB)",
        description: "Fully compliant with Tanzanian tax regulations.",
        icon: "/assets/icons/crb.svg",
      },
      {
        id: 3,
        title: "Insurance",
        description: "Fully compliant with Tanzanian tax regulations.",
        icon: "/assets/icons/insurance.svg",

      },
    ],
  },

  downloadCenter: {
    title: "Download Center",
    description: "Access our official certifications and compliance documents.",
    items: [
      {
        id: 1,
        title: "Tax Clearance Certificate",
        file: dummyCertificateFile,
      },
      {
        id: 2,
        title: "Business License",
        file: dummyCertificateFile,
      },
      {
        id: 3,
        title: "Business License",
        file: dummyCertificateFile,
      },
      {
        id: 4,
        title: "Insurance Policy Summary",
        file: dummyCertificateFile,
      },
      {
        id: 5,
        title: "VAT Registration",
        file: dummyCertificateFile,
      },
      {
        id: 6,
        title: "CRB Class I Certificate",
        file: dummyCertificateFile,
      },
    ],
  },
};
