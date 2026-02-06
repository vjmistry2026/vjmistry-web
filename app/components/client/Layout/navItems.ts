export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "About Us",
    children: [
      { label: "Company Profile", href: "#" },
      { label: "Leadership", href: "#" },
      { label: "Our Values", href: "#" },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Engineering", href: "#" },
      { label: "Construction", href: "#" },
      { label: "Project Management", href: "#" },
    ],
  },
  {
    label: "Projects",
    href: "#",
  },
  {
    label: "How We Work",
    children: [
      { label: "Process", href: "#" },
      { label: "Safety", href: "#" },
      { label: "Quality", href: "#" },
    ],
  },
  {
    label: "Media Center",
    children: [
      { label: "News", href: "#" },
      { label: "Events", href: "#" },
      { label: "Gallery", href: "#" },
    ],
  },
  {
    label: "Contact Us",
    href: "#",
  },
];



// Footer
export const quickLinks = [
  { label: "About Us", href: "#" },
  { label: "Services", href: "#" },
  { label: "Projects", href: "#" },
];

export const resources = [
  { label: "News", href: "#" },
  { label: "Gallery", href: "#" },
  { label: "Download Brochure", href: "#" },
  { label: "Download Company Profile", href: "#" },
];

export const socialMedia = [
  { label: "Facebook", icon: "/assets/images/footer/social/fb.svg", href: "#" },
  { label: "Instagram", icon: "/assets/images/footer/social/insta.svg", href: "#" },
  { label: "LinkedIn", icon: "/assets/images/footer/social/linkedin.svg", href: "#" },
];

export const contactLocations = {
  headOffice: {
    label: "Head Office",
    address: "Bukoba, Tanzania Sokoine Road, Tanzania, P.O. Box 1007, Bukoba",
    phone: "+255 657 007 300 | +255 715 755 766",
    email: "info@vjmistry.com",
  },
  branch: {
    label: "Branch",
    address: "Dar es Salaam, Ohio Street, Tanzania, P.O. Box 2345, Dar es Salaam",
    phone: "+255 700 111 222 | +255 700 333 444",
    email: "branch@vjmistry.com",
  },
};
