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
