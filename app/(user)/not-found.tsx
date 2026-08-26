"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { moveUp } from "../components/motionVariants";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-100 lg:py-150">
        <div className="container">
          <div className="max-w-200 mx-auto text-center">
            {/* 404 Number */}
            <motion.div
              variants={moveUp(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mb-8 lg:mb-12"
            >
              <h1 className="text-[150px] lg:text-[200px] 3xl:text-[250px] font-condensed leading-[100%] text-primary">
                404
              </h1>
            </motion.div>

            {/* Error Message */}
            <motion.h2
              variants={moveUp(0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="section-heading text-secondary mb-6 lg:mb-8"
            >
              Page Not Found
            </motion.h2>

            <motion.p
              variants={moveUp(0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="section-description text-paragraph max-w-125 mx-auto mb-10 lg:mb-14"
            >
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={moveUp(0.4)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <Link
                href="/"
                className="group relative inline-flex items-center gap-3 bg-primary text-white px-10 py-5 overflow-hidden transition-all duration-300 hover:bg-secondary"
              >
                <span className="relative z-10 text-16 lg:text-17 font-nexa font-bold">
                  Back to Home
                </span>
                <svg
                  className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
