"use client"

import ClientSideLink from '@/app/(admin)/admin/client-side-link';
import React, { useState } from 'react'
import {
  BriefcaseIcon,
    NewspaperIcon,
    UserGroupIcon,
  } from "@heroicons/react/24/outline";
import {BookA, GalleryThumbnails, InfoIcon, LucideSword, PhoneIcon,Share2Icon, Workflow, AwardIcon,HomeIcon,SettingsIcon } from 'lucide-react';
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
  //     const response = await fetch("/api/admin/expertise");
  //     const data = await response.json();
  //     setServices(data.data.secondSection.items)
  // }

    const navItems = [
        { name: "Home", href: "/admin/home", icon: HomeIcon },
        { name: "About", href: "/admin/about", icon: InfoIcon },
        { name: "Founder's Message", href: "/admin/founders-message", icon: LucideSword },
        { name: "Manager's Message", href: "/admin/managers-message", icon: MdManageAccounts },
        { name: "Leadership Team", href: "/admin/leadership-team", icon: UserGroupIcon },
        { name: "Learning Program", href: "/admin/learning-program", icon: BookA },
        { name: "Contact", href: "###", icon: PhoneIcon,hasChild:true,children: [
          { name: "Main Page", href: "/admin/contact" },
          {name:"Enquiries",href:"/admin/contact/enquiries"}
        ] },
        { name: "Interests", href: "/admin/interests", icon: MdInterests },
        { name: "Footer Enquiries", href: "/admin/footer-enquiries", icon: FaDownLong },
        { name: "Testimonials", href: "/admin/testimonials", icon: MdReviews },
        { name: "Beam Schools", href: "/admin/beam-schools", icon: Workflow },
        { name: "Blogs", href: "/admin/blogs", icon: Share2Icon },
        { name: "News", href: "/admin/news", icon: NewspaperIcon },
        { name: "Gallery", href: "/admin/gallery", icon: GalleryThumbnails },
        { name: "Accreditations", href: "/admin/accreditations", icon: AwardIcon },
         { name: "School Uniqueness", href: "/admin/school-uniqueness", icon: TbBellStar },
         { name: "School Achievements", href: "/admin/school-achievements", icon: BriefcaseIcon },
         { name: "Scholarship Programs", href: "/admin/scholarship-programs", icon: FaMoneyBill },
         { name: "Alumni", href: "/admin/alumni", icon: FaMoneyBill },
        // { name: "Our Team", href: "/admin/team", icon: UserGroupIcon },
        // { name: "Group Company", href: "/admin/group-company", icon: GroupIcon },
        // { name: "Awards", href: "/admin/awards", icon: AwardIcon },
        // { name: "Clients", href: "/admin/clients", icon: PresentationChartBarIcon },
        // { name: "Services", href: "#", icon: EnvelopeIcon,hasChild:true,children: [
        //     { name: "Engineering", href: "/admin/services/engineering" },
        //     { name: "Fabrication", href: "/admin/services/fabrication" },
        //     { name: "Blasting", href: "/admin/services/blasting" },
        //     { name: "Steel Erection", href: "/admin/services/steel-erection" },
        //   ] },
        // { name: "Industries", href: "/admin/industries", icon: BriefcaseIcon },
        // { name: "Expertise", href: "##", icon: GlobeAltIcon , hasChild:true,children: [
        //   { name: "Main Page", href: "/admin/expertise" },
        //   ...services.map((service: { _id: string,title:string }) => (
        //     { name: service.title, href: `/admin/expertise/${service._id}` }
        //   )),
        // ] },
        // { name: "Projects", href: "/admin/projects", icon: Workflow },
        // { name: "Clients", href: "/admin/clients", icon: RiShakeHandsLine },
        
        
        // { name: "QHSE", href: "/admin/qhse", icon: GiHealthNormal },
        // { name: "Sustainability", href: "/admin/sustainability", icon: LeafIcon },
        // { name: "AI Technology", href: "/admin/ai-technology", icon: FaRobot },
        // { name: "Current Openings", href: "####", icon:BriefcaseIcon,hasChild:true,children: [
        //   { name: "Main Page", href: "/admin/current-openings" },
        //   {name:"Enquiries",href:"/admin/current-openings/enquiries"}
        // ] },
        
        // // { name: "Sustainability", href: "/admin/sustainability", icon: LeafIcon },
        { name: "Settings", href: "/admin/settings", icon: SettingsIcon},
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