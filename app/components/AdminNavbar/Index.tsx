"use client"

import ClientSideLink from '@/app/(admin)/x7Qk2vMzP9wR/client-side-link';
import React, { useState } from 'react'
import {
  BriefcaseIcon,
  NewspaperIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { BookA, GalleryThumbnails, InfoIcon, LucideSword, PhoneIcon, Share2Icon, Workflow, AwardIcon, HomeIcon, SettingsIcon } from 'lucide-react';
// import { useRefetchServices } from '@/app/contexts/refetchServices';
import { MdInterests, MdManageAccounts, MdReviews } from 'react-icons/md';
import { TbBellStar } from 'react-icons/tb';
import { FaDownLong, FaMoneyBill } from 'react-icons/fa6';



const AdminNavbar = () => {

  const [openLink, setOpenLink] = useState<string | null>(null);
  // const {refetchServices} = useRefetchServices();

  //   useEffect(() => {
  //     fetchServices()
  // },[])

  // const [services, setServices] = useState([])
  // const fetchServices = async () => {
  //     const response = await fetch("/api/x7Qk2vMzP9wR/expertise");
  //     const data = await response.json();
  //     setServices(data.data.secondSection.items)
  // }

  const navItems = [
    { name: "Home", href: "/x7Qk2vMzP9wR/home", icon: HomeIcon },
    { name: "About", href: "/x7Qk2vMzP9wR/about", icon: InfoIcon },
    {
      name: "Services", href: "###", icon: Workflow, hasChild: true, children: [
        { name: "Main Page", href: "/x7Qk2vMzP9wR/services" },
      ]
    },
    { name: "Projects", href: "/x7Qk2vMzP9wR/projects", icon: MdInterests },
    { name: "Founder's Message", href: "/x7Qk2vMzP9wR/founders-message", icon: LucideSword },
    { name: "Quality", href: "/x7Qk2vMzP9wR/quality", icon: MdReviews },
    { name: "HSE", href: "/x7Qk2vMzP9wR/hse", icon: TbBellStar },
    { name: "Certificates", href: "/x7Qk2vMzP9wR/certificates", icon: AwardIcon },
    { name: "Gallery", href: "/x7Qk2vMzP9wR/gallery", icon: GalleryThumbnails },
    {
      name: "Contact", href: "##", icon: PhoneIcon, hasChild: true, children: [
        { name: "Main Page", href: "/x7Qk2vMzP9wR/contact" },
        { name: "Enquiries", href: "/x7Qk2vMzP9wR/contact/enquiry" }
      ]
    },
    { name: "Equipments", href: "/x7Qk2vMzP9wR/equipments", icon: FaMoneyBill },
    { name: "News", href: "/x7Qk2vMzP9wR/news", icon: NewspaperIcon },
    // { name: "Manager's Message", href: "/x7Qk2vMzP9wR/managers-message", icon: MdManageAccounts },
    // { name: "Leadership Team", href: "/x7Qk2vMzP9wR/leadership-team", icon: UserGroupIcon },
    // { name: "Learning Program", href: "/x7Qk2vMzP9wR/learning-program", icon: BookA },
    // { name: "Interests", href: "/x7Qk2vMzP9wR/interests", icon: MdInterests },
    // { name: "Footer Enquiries", href: "/x7Qk2vMzP9wR/footer-enquiries", icon: FaDownLong },
    // { name: "Testimonials", href: "/x7Qk2vMzP9wR/testimonials", icon: MdReviews },
    // { name: "Beam Schools", href: "/x7Qk2vMzP9wR/beam-schools", icon: Workflow },
    // { name: "Blogs", href: "/x7Qk2vMzP9wR/blogs", icon: Share2Icon },
    // { name: "School Uniqueness", href: "/x7Qk2vMzP9wR/school-uniqueness", icon: TbBellStar },
    // { name: "School Achievements", href: "/x7Qk2vMzP9wR/school-achievements", icon: BriefcaseIcon },
    // { name: "Scholarship Programs", href: "/x7Qk2vMzP9wR/scholarship-programs", icon: FaMoneyBill },
    // { name: "Alumni", href: "/x7Qk2vMzP9wR/alumni", icon: FaMoneyBill },
    // { name: "Our Team", href: "/x7Qk2vMzP9wR/team", icon: UserGroupIcon },
    // { name: "Group Company", href: "/x7Qk2vMzP9wR/group-company", icon: GroupIcon },
    // { name: "Awards", href: "/x7Qk2vMzP9wR/awards", icon: AwardIcon },
    // { name: "Clients", href: "/x7Qk2vMzP9wR/clients", icon: PresentationChartBarIcon },
    // { name: "Services", href: "#", icon: EnvelopeIcon,hasChild:true,children: [
    //     { name: "Engineering", href: "/x7Qk2vMzP9wR/services/engineering" },
    //     { name: "Fabrication", href: "/x7Qk2vMzP9wR/services/fabrication" },
    //     { name: "Blasting", href: "/x7Qk2vMzP9wR/services/blasting" },
    //     { name: "Steel Erection", href: "/x7Qk2vMzP9wR/services/steel-erection" },
    //   ] },
    // { name: "Industries", href: "/x7Qk2vMzP9wR/industries", icon: BriefcaseIcon },
    // { name: "Expertise", href: "##", icon: GlobeAltIcon , hasChild:true,children: [
    //   { name: "Main Page", href: "/x7Qk2vMzP9wR/expertise" },
    //   ...services.map((service: { _id: string,title:string }) => (
    //     { name: service.title, href: `/x7Qk2vMzP9wR/expertise/${service._id}` }
    //   )),
    // ] },
    // { name: "Projects", href: "/x7Qk2vMzP9wR/projects", icon: Workflow },
    // { name: "Clients", href: "/x7Qk2vMzP9wR/clients", icon: RiShakeHandsLine },


    // { name: "QHSE", href: "/x7Qk2vMzP9wR/qhse", icon: GiHealthNormal },
    // { name: "Sustainability", href: "/x7Qk2vMzP9wR/sustainability", icon: LeafIcon },
    // { name: "AI Technology", href: "/x7Qk2vMzP9wR/ai-technology", icon: FaRobot },
    // { name: "Current Openings", href: "####", icon:BriefcaseIcon,hasChild:true,children: [
    //   { name: "Main Page", href: "/x7Qk2vMzP9wR/current-openings" },
    //   {name:"Enquiries",href:"/x7Qk2vMzP9wR/current-openings/enquiries"}
    // ] },

    // // { name: "Sustainability", href: "/x7Qk2vMzP9wR/sustainability", icon: LeafIcon },
    { name: "Settings", href: "/x7Qk2vMzP9wR/settings", icon: SettingsIcon },
  ];

  return (
    navItems.map((item) => {
      const Icon = item.icon;
      return (
        <ClientSideLink
          key={item.href}
          href={item.href}
          name={item.name}
          icon={<Icon className="h-5 w-5" />}
          isOpen={openLink === item.href}
          setOpenLink={setOpenLink}
          hasChild={item.hasChild}
        >
          {item.children}
        </ClientSideLink>
      );
    })
  )
}

export default AdminNavbar