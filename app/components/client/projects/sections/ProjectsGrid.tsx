"use client";

import Image from "next/image";
import ProjectCard from "../../common/ProjectCard";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { projectsData, filterOptions } from "../data";
import { Plus, X } from "lucide-react";
import CustomButton from "../../common/CustomButton";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../../common/RevealOneByOneAnimation";
import { moveUpV2 } from "@/app/components/motionVariants";

// ─── Dropdown ─────────────────────────────────────────────────────────────────
type DropdownProps = {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
};

const Dropdown = ({ label, options, value, onChange }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-[8px] border-b border-paragraph pb-[9px] focus:outline-none text-16 3xl:text-20 section-description"
      >
        <span className={`text-left ${value ? "text-primary" : ""}`}>
          {value || label}
        </span>

        <span className="flex items-center gap-2 shrink-0">
          {/* X deselect button */}
          <AnimatePresence>
            {value && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                }}
                className="text-primary hover:opacity-70 transition-opacity"
              >
                <X size={18} />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Arrow */}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Image
              src="/assets/icons/bottom_arrow_tip.svg"
              alt=""
              width={21}
              height={10}
            />
          </motion.span>
        </span>
      </button>

      {/* Dropdown list */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute top-[calc(100%+8px)] left-0 z-[9999] bg-white border border-[#E5E5E5] shadow-lg w-full min-w-[160px] py-[6px] overflow-hidden"
          >
            {options.map((opt, i) => (
              <motion.button
                key={opt}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.18,
                  delay: i * 0.04,
                  ease: "easeOut",
                }}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full text-left px-[16px] py-[9px] font-nexa font-bold text-16 hover:bg-primary hover:text-paragraph-2 transition-colors duration-250 ${
                  value === opt ? "text-primary" : "text-[#111111]"
                }`}
              >
                {opt}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const ProjectsGrid = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const typeFilter = searchParams.get("type") || "";
  const sectorFilter = searchParams.get("sector") || "";
  const locationFilter = searchParams.get("location") || "";
  const statusFilter = searchParams.get("status") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [draftSearch, setDraftSearch] = useState(searchQuery);
  const [draftType, setDraftType] = useState(typeFilter);
  const [draftSector, setDraftSector] = useState(sectorFilter);
  const [draftLocation, setDraftLocation] = useState(locationFilter);
  const [draftStatus, setDraftStatus] = useState(statusFilter);
  const [showFilters, setShowFilters] = useState(false);
  const [projectsPerPage, setProjectsPerPage] = useState(12);

  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setProjectsPerPage(5); // mobile
      } else if (width < 1024) {
        setProjectsPerPage(10); // tablet
      } else {
        setProjectsPerPage(12); // desktop
      }
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  useEffect(() => {
    setDraftSearch(searchQuery);
    setDraftType(typeFilter);
    setDraftSector(sectorFilter);
    setDraftLocation(locationFilter);
    setDraftStatus(statusFilter);
  }, [searchQuery, typeFilter, sectorFilter, locationFilter, statusFilter]);

  const updateURL = useCallback(
    (params: Record<string, string>) => {
      const current = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([k, v]) => {
        if (v) current.set(k, v);
        else current.delete(k);
      });
      router.push(`${pathname}?${current.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const applyFilters = () => {
    updateURL({
      search: draftSearch,
      type: draftType,
      sector: draftSector,
      location: draftLocation,
      status: draftStatus,
      page: "1",
    });
  };

  const filtered = projectsData.filter((p) => {
    if (
      searchQuery &&
      !p.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    if (typeFilter && p.type !== typeFilter) return false;
    if (sectorFilter && p.sector !== sectorFilter) return false;
    if (locationFilter && p.location !== locationFilter) return false;
    if (statusFilter && p.status !== statusFilter) return false;
    return true;
  });

  const visibleCount = page * projectsPerPage;
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="w-full">
      {/* ─── Filter Bar ───────────────────────────────────────────────── */}
      <div className="xl:border-b border-border">
        <div className="container h-full">
          {/* Mobile Filter Button */}
          <div className="xl:hidden pt-100">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center leading-0 justify-between px-5 gap-2 border border-primary py-3 md:py-4 lg:py-5 text-secondary section-description hover:bg-primary hover:text-white transition-colors duration-300"
            >
              FILTER
              <motion.div
                animate={{ rotate: showFilters ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <Plus className="text-secondary" size={28} />
              </motion.div>
            </button>
          </div>

          {/* Filter panel — animated on mobile, always visible on desktop */}
          <AnimatePresence initial={false}>
            {showFilters && (
              <motion.div
                key="filter-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden xl:!h-auto xl:!opacity-100"
              >
                <div className="flex flex-col xl:flex-row items-stretch">
                  {/* Search */}
                  <div className="flex items-center gap-5 xl:px-4 2xl:px-7 3xl:px-[44px] py-6 xl:py-70 xl:border-r xl:border-l border-border 3xl:max-w-[300px]">
                    <span className="shrink-0">
                      <Image
                        src="/assets/icons/search.svg"
                        alt=""
                        width={32}
                        height={32}
                      />
                    </span>
                    <input
                      type="text"
                      placeholder="Search Projects"
                      value={draftSearch}
                      onChange={(e) => setDraftSearch(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                      className="placeholder:text-paragraph text-17 3xl:placeholder:text-20 placeholder:leading-[1.5] focus:outline-none section-description max-w-[153px]"
                    />
                  </div>

                  {/* Dropdowns */}
                  <div className="flex flex-col xl:flex-row items-start xl:items-center justify-evenly gap-6 xl:gap-8 2xl:gap-10 3xl:gap-[55px] xl:px-8 2xl:px-10 3xl:px-[50px] flex-1">
                    <Dropdown
                      label="Project Type"
                      options={filterOptions.projectTypes}
                      value={draftType}
                      onChange={setDraftType}
                    />
                    <Dropdown
                      label="Sector"
                      options={filterOptions.sectors}
                      value={draftSector}
                      onChange={setDraftSector}
                    />
                    <Dropdown
                      label="Location"
                      options={filterOptions.locations}
                      value={draftLocation}
                      onChange={setDraftLocation}
                    />
                    <Dropdown
                      label="Status"
                      options={filterOptions.statuses}
                      value={draftStatus}
                      onChange={setDraftStatus}
                    />
                  </div>

                  {/* Apply Filter */}
                  <div className="flex items-center pr-8 2xl:pr-10 3xl:pr-[50px] xl:border-r border-border shrink-0 mt-10 xl:mt-0">
                    <button
                      type="button"
                      onClick={applyFilters}
                      className="active:scale-95 transition-all duration-300 relative overflow-hidden w-fit xl:w-auto px-5 xl:px-[30px] 3xl:px-[51px] py-3 md:py-4 lg:py-5 border border-primary text-primary text-20 font-nexa font-bold group cursor-pointer"
                    >
                      <span className="absolute left-0 top-0 h-full w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                      <span className="relative z-10 group-hover:text-paragraph-2 transition-colors duration-300">
                        Apply Filter
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop — always rendered, not in AnimatePresence */}
          <div className="hidden xl:flex flex-row items-stretch">
            <div className="flex items-center gap-5 xl:px-4 2xl:px-7 3xl:px-[44px] py-6 xl:py-70 xl:border-r xl:border-l border-border 3xl:max-w-[300px]">
              <span className="shrink-0">
                <Image
                  src="/assets/icons/search.svg"
                  alt=""
                  width={32}
                  height={32}
                />
              </span>
              <input
                type="text"
                placeholder="Search Projects"
                value={draftSearch}
                onChange={(e) => setDraftSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                className="placeholder:text-paragraph text-17 3xl:placeholder:text-20 placeholder:leading-[1.5] focus:outline-none section-description max-w-[153px]"
              />
            </div>
            <div className="flex flex-row items-center justify-evenly gap-8 2xl:gap-10 3xl:gap-[55px] xl:px-8 2xl:px-10 3xl:px-[50px] flex-1">
              <Dropdown
                label="Project Type"
                options={filterOptions.projectTypes}
                value={draftType}
                onChange={setDraftType}
              />
              <Dropdown
                label="Sector"
                options={filterOptions.sectors}
                value={draftSector}
                onChange={setDraftSector}
              />
              <Dropdown
                label="Location"
                options={filterOptions.locations}
                value={draftLocation}
                onChange={setDraftLocation}
              />
              <Dropdown
                label="Status"
                options={filterOptions.statuses}
                value={draftStatus}
                onChange={setDraftStatus}
              />
            </div>
            <div className="flex items-center pr-8 2xl:pr-10 3xl:pr-[50px] xl:border-r border-border shrink-0">
              <button
                type="button"
                onClick={applyFilters}
                className="active:scale-95 transition-all duration-300 relative overflow-hidden w-fit xl:w-auto px-5 xl:px-[30px] 3xl:px-[51px] py-3 md:py-4 lg:py-5 border border-primary text-primary text-20 font-nexa font-bold group cursor-pointer"
              >
                <span className="absolute left-0 top-0 h-full w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                <span className="relative z-10 group-hover:text-paragraph-2 transition-colors duration-300">
                  Apply Filter
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Grid ─────────────────────────────────────────────────────── */}
      <div className="container pt-100 md:pb-130 2xl:pb-150">
        {visible.length === 0 ? (
          <div className="py-100 text-center section-description">
            No projects match your filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[30px] 2xl:gap-x-[40px] gap-y-[30px] lg:gap-y-[48px] 2xl:gap-y-[65px]">
            {visible.map((project) => (
              <Reveal key={project.id} variants={moveUpV2} >
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}

        {hasMore && (
          <div className="flex items-center justify-center mt-10 2xl:mt-[60px]">
            <CustomButton
              label="View More"
              href=""
              textColor="black"
              arrowDirection="down"
              onClick={() => updateURL({ page: String(page + 1) })}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsGrid;
